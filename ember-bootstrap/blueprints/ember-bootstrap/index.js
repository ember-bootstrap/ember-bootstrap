/* eslint-env node */
'use strict';

const fs = require('node:fs');
const fsPromises = require('node:fs/promises');
const path = require('path');
const chalk = require('chalk');
const BuildConfigEditor = require('ember-cli-build-config-editor');
const SilentError = require('silent-error');

const bs4Version = '^4.6.0';
const bs5Version = '^5.0.0';
const defaultBsVersion = 5;

const validPreprocessors = ['none', 'less', 'sass'];

module.exports = {
  name: 'ember-bootstrap',

  description: 'Configure ember-bootstrap',

  availableOptions: [
    { name: 'bootstrap-version', type: Number, aliases: ['bootstrap', 'bv'] },
    { name: 'preprocessor', type: String, aliases: ['pp'] },
  ],

  works: 'insideProject',

  normalizeEntityName() {},

  existingConfiguration: null,

  beforeInstall(option) {
    let bootstrapVersion =
      parseInt(option.bootstrapVersion, 10) ||
      this.retrieveBootstrapVersion() ||
      defaultBsVersion;
    let preprocessor = option.preprocessor;

    if (![4, 5].includes(bootstrapVersion)) {
      throw new SilentError('Bootstrap version must be 4 or 5');
    }

    if (preprocessor && validPreprocessors.indexOf(preprocessor) === -1) {
      throw new SilentError(
        `Valid preprocessors are: ${validPreprocessors.join(', ')}`,
      );
    }

    if (!preprocessor) {
      let dependencies = this.project.dependencies();
      if ('ember-cli-sass' in dependencies) {
        preprocessor = 'sass';
      } else if ('ember-cli-less' in dependencies) {
        preprocessor = 'less';
      } else {
        preprocessor = 'none';
      }
    }

    if (preprocessor === 'less') {
      throw new SilentError(
        `You cannot use LESS with Bootstrap ${bootstrapVersion}`,
      );
    }

    this.ui.writeLine(
      chalk.green(
        `Installing for Bootstrap ${bootstrapVersion} using preprocessor ${preprocessor}`,
      ),
    );

    this.bootstrapVersion = bootstrapVersion;
    this.preprocessor = preprocessor;
  },

  afterInstall() {
    return this.adjustBootstrapDependencies()
      .then(() => this.adjustPreprocessorDependencies())
      .then(() => this.addPreprocessorStyleImport())
      .then(() => this.addBuildConfiguration());
  },

  adjustBootstrapDependencies() {
    let bootstrapVersion = this.bootstrapVersion;
    let dependencies = this.project.dependencies();
    let promises = [];

    if ('bootstrap-sass' in dependencies) {
      promises.push(this.removePackageFromProject('bootstrap-sass'));
    }
    promises.push(
      this.addPackageToProject(
        'bootstrap',
        bootstrapVersion === 5 ? bs5Version : bs4Version,
      ),
    );

    return Promise.all(promises);
  },

  adjustPreprocessorDependencies() {
    let preprocessor = this.preprocessor;
    let dependencies = this.project.dependencies();
    let promises = [];

    if (preprocessor !== 'sass' && 'ember-cli-sass' in dependencies) {
      promises.push(this.removePackageFromProject('ember-cli-sass'));
    }

    if (preprocessor === 'sass' && !('ember-cli-sass' in dependencies)) {
      promises.push(this.addAddonToProject('ember-cli-sass'));
    }

    return Promise.all(promises);
  },

  addPreprocessorStyleImport() {
    let preprocessor = this.preprocessor;
    let importStatement =
      '\n@import "node_modules/bootstrap/scss/bootstrap";\n';

    if (preprocessor === 'none') {
      return;
    }

    let extension = preprocessor === 'sass' ? 'scss' : 'less';
    let stylePath = path.join('app', 'styles');

    let file = path.join(stylePath, `app.${extension}`);

    if (!fs.existsSync(stylePath)) {
      fs.mkdirSync(stylePath);
    }
    if (fs.existsSync(file)) {
      this.ui.writeLine(chalk.green(`Added import statement to ${file}`));
      return this.insertIntoFile(file, importStatement, {});
    } else {
      this.ui.writeLine(chalk.green(`Created ${file}`));
      return fsPromises.writeFile(file, importStatement);
    }
  },

  addBuildConfiguration() {
    let file = 'ember-cli-build.js';
    let bootstrapVersion = this.bootstrapVersion;
    let preprocessor = this.preprocessor;
    let config = this.retrieveExistingConfiguration();
    let settings = {
      bootstrapVersion,
    };

    if (preprocessor !== 'none') {
      settings.importBootstrapCSS = false;
    } else if (
      Object.prototype.hasOwnProperty.call(config, 'importBootstrapCSS')
    ) {
      settings.importBootstrapCSS = config.importBootstrapCSS;
    } else {
      settings.importBootstrapCSS = true;
    }

    if (!fs.existsSync(file)) {
      this.ui.writeLine(chalk.red(`Could not find ${file} to modify.`));
      return;
    }

    let source = fs.readFileSync(file, 'utf-8');
    let build = new BuildConfigEditor(source);

    try {
      let newBuild = build.edit(this.name, settings);
      fs.writeFileSync(file, newBuild.code());
      this.ui.writeLine(
        chalk.green(`Added ember-bootstrap configuration to ${file}`),
      );
    } catch (error) {
      let settingsString = JSON.stringify(settings);
      this.ui.writeLine(
        chalk.red(
          `Configuration file could not be edited. Manually update your ember-cli-build.js to include '${this.name}': ${settingsString}`,
        ),
      );
    }
  },

  retrieveExistingConfiguration() {
    if (this.existingConfiguration) {
      return this.existingConfiguration;
    }

    let file = 'ember-cli-build.js';

    let source = fs.readFileSync(file);
    let build = new BuildConfigEditor(source);
    this.existingConfiguration = build.retrieve(this.name) || {};
    return this.existingConfiguration;
  },

  retrieveBootstrapVersion() {
    let config = this.retrieveExistingConfiguration();

    return config.bootstrapVersion && parseInt(config.bootstrapVersion, 10);
  },
};
