/* eslint-env node */
'use strict';

const rsvp = require('rsvp');
const fs = require('fs-extra');
const path = require('path');
const writeFile = rsvp.denodeify(fs.writeFile);
const chalk = require('chalk');
const BuildConfigEditor = require('ember-cli-build-config-editor');
const SilentError = require('silent-error'); // From ember-cli

const bs3Version = '^3.3.7';
const bs4Version = 'next';

const validPreprocessors = [
  'none',
  'less',
  'sass'
];

module.exports = {
  name: 'ember-bootstrap',

  description: 'Configure ember-bootstrap',

  availableOptions: [
    { name: 'bootstrap-version', type: Number, default: 3, aliases: ['bootstrap', 'bv'] },
    { name: 'preprocessor', type: String, aliases: ['pp'] }
  ],

  works: 'insideProject',

  normalizeEntityName() {
  },

  beforeInstall(option) {
    let bootstrapVersion = option.bootstrapVersion;
    let preprocessor = option.preprocessor;

    if (bootstrapVersion !== 3 && bootstrapVersion !== 4) {
      throw new SilentError('Bootstrap version must be 3 or 4');
    }

    if (preprocessor && !validPreprocessors.includes(preprocessor)) {
      throw new SilentError(`Valid preprocessors are: ${validPreprocessors.join(', ')}`);
    }

    if (!preprocessor) {
      let dependencies = this.project.dependencies();
      if ('ember-cli-sass' in dependencies) {
        preprocessor = option.preprocessor = 'sass';
      } else if ('ember-cli-less' in dependencies) {
        preprocessor = option.preprocessor = 'less';
      } else {
        preprocessor = 'none';
      }
    }

    if (bootstrapVersion === 4 && preprocessor === 'less') {
      throw new SilentError('You cannot use LESS with Bootstrap 4');
    }

    this.ui.writeLine(chalk.green(`Installing for Bootstrap ${bootstrapVersion} using preprocessor ${preprocessor}`));
  },

  afterInstall(option) {
    return this.adjustBootstrapDependencies(option)
      .then(() => this.adjustPreprocessorDependencies(option))
      .then(() => this.addPreprocessorStyleImport(option))
      .then(() => this.addBuildConfiguration(option));
  },

  removePackageFromBowerJSON(dependency) {
    this.ui.writeLine(chalk.green(`  uninstall bower package ${chalk.white(dependency)}`));
    return new rsvp.Promise(function(resolve, reject) {
      try {
        let bowerJSONPath = 'bower.json';
        let bowerJSON = fs.readJsonSync(bowerJSONPath);

        delete bowerJSON.dependencies[dependency];

        fs.writeJsonSync(bowerJSONPath, bowerJSON);

        resolve();
      } catch(error) {
        reject(error);
      }
    });
  },

  adjustBootstrapDependencies(option) {
    let bootstrapVersion = option.bootstrapVersion;
    let preprocessor = option.preprocessor;
    let dependencies = this.project.dependencies();
    let bowerDependencies = this.project.bowerDependencies();
    let promises = [];

    if ('bootstrap' in bowerDependencies) {
      promises.push(this.removePackageFromBowerJSON('bootstrap'));
    }
    if ('bootstrap-sass' in bowerDependencies) {
      promises.push(this.removePackageFromBowerJSON('bootstrap-sass'));
    }

    if (bootstrapVersion === 4) {
      if ('bootstrap-sass' in dependencies) {
        promises.push(this.removePackageFromProject('bootstrap-sass'));
      }
      promises.push(this.addPackageToProject('bootstrap', bs4Version));
    } else if (preprocessor === 'sass') {
      if ('bootstrap' in dependencies) {
        promises.push(this.removePackageFromProject('bootstrap'));
      }
      promises.push(this.addPackageToProject('bootstrap-sass', bs3Version));
    } else {
      if ('bootstrap-sass' in dependencies) {
        promises.push(this.removePackageFromProject('bootstrap-sass'));
      }
      promises.push(this.addPackageToProject('bootstrap', bs3Version));
    }

    return rsvp.all(promises);
  },

  adjustPreprocessorDependencies(option) {
    let preprocessor = option.preprocessor;
    let dependencies = this.project.dependencies();
    let promises = [];

    if (preprocessor !== 'less' && 'ember-cli-less' in dependencies) {
      promises.push(this.removePackageFromProject('ember-cli-less'));
    }

    if (preprocessor !== 'sass' && 'ember-cli-sass' in dependencies) {
      promises.push(this.removePackageFromProject('ember-cli-sass'));
    }

    if (preprocessor === 'less' && !('ember-cli-less' in dependencies)) {
      promises.push(this.addAddonToProject('ember-cli-less'));
    }

    if (preprocessor === 'sass' && !('ember-cli-sass' in dependencies)) {
      promises.push(this.addAddonToProject('ember-cli-sass'));
    }

    return rsvp.all(promises);
  },

  addPreprocessorStyleImport(option) {
    let preprocessor = option.preprocessor;
    let importStatement = '\n@import "ember-bootstrap/bootstrap";\n';

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
      return writeFile(file, importStatement);
    }
  },

  addBuildConfiguration(option) {
    let file = 'ember-cli-build.js';
    let bootstrapVersion = option.bootstrapVersion;
    let preprocessor = option.preprocessor;
    let settings = {
      bootstrapVersion
    };

    settings.importBootstrapFont = (bootstrapVersion === 3);

    settings.importBootstrapCSS = (preprocessor === 'none');

    if (fs.existsSync(file)) {
      this.ui.writeLine(chalk.green(`Added ember-bootstrap configuration to ${file}`));
      let source = fs.readFileSync(file, 'utf-8');
      let build = new BuildConfigEditor(source);
      let newBuild = build.edit('ember-bootstrap', settings);
      fs.writeFileSync(file, newBuild.code());
    } else {
      this.ui.writeLine(chalk.red(`Could not find ${file} to modify.`));
    }
  }
};
