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
    { name: 'bootstrap-version', type: Number, default: 3, aliases: ['bv'] },
    { name: 'target-preprocessor', type: String, aliases: ['tp'] }
  ],

  works: 'insideProject',

  normalizeEntityName() {
  },

  beforeInstall(option) {
    let { bootstrapVersion, targetPreprocessor } = option;
    if (bootstrapVersion !== 3 && bootstrapVersion !== 4) {
      throw new SilentError('Bootstrap version must be 3 or 4');
    }

    if (targetPreprocessor && !validPreprocessors.includes(targetPreprocessor)) {
      throw new SilentError(`Valid preprocessors are: ${validPreprocessors.join(', ')}`);
    }

    if (!targetPreprocessor) {
      let dependencies = this.project.dependencies();
      if ('ember-cli-sass' in dependencies) {
        targetPreprocessor = option.targetPreprocessor = 'sass';
      } else if ('ember-cli-less' in dependencies) {
        targetPreprocessor = option.targetPreprocessor = 'less';
      } else {
        targetPreprocessor = 'none';
      }
    }

    if (bootstrapVersion === 4 && targetPreprocessor === 'less') {
      throw new SilentError('You cannot use LESS with Bootstrap 4');
    }

    this.ui.writeLine(chalk.green(`Installing for Bootstrap ${bootstrapVersion} using preprocessor ${targetPreprocessor}`));
  },

  afterInstall(option) {
    return this.adjustBootstrapDependencies(option)
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
    let { bootstrapVersion, targetPreprocessor } = option;
    let dependencies = this.project.dependencies();
    let bowerDependencies = this.project.bowerDependencies();
    let promises = [];

    if (bootstrapVersion === 4) {
      if ('bootstrap' in bowerDependencies) {
        promises.push(this.removePackageFromBowerJSON('bootstrap'));
      }
      if ('bootstrap-sass' in dependencies) {
        promises.push(this.removePackageFromProject('bootstrap-sass'));
      }
      if ('bootstrap-sass' in bowerDependencies) {
        promises.push(this.removePackageFromBowerJSON('bootstrap-sass'));
      }
      promises.push(this.addPackageToProject('bootstrap', bs4Version));
    } else if (targetPreprocessor === 'sass') {
      if ('bootstrap' in dependencies) {
        promises.push(this.removePackageFromProject('bootstrap'));
      }
      if ('bootstrap' in bowerDependencies) {
        promises.push(this.removePackageFromBowerJSON('bootstrap'));
      }
      promises.push(this.addPackageToProject('bootstrap-sass', bs3Version));
    } else {
      if ('bootstrap' in dependencies) {
        promises.push(this.removePackageFromProject('bootstrap'));
      }
      if ('bootstrap-sass' in dependencies) {
        promises.push(this.removePackageFromProject('bootstrap-sass'));
      }
      promises.push(this.addBowerPackageToProject('bootstrap', bs3Version));
    }

    return rsvp.all(promises);
  },

  addPreprocessorStyleImport(option) {
    let { targetPreprocessor } = option;
    let importStatement = '\n@import "ember-bootstrap/bootstrap";\n';

    if (targetPreprocessor === 'none') {
      return;
    }

    let extension = targetPreprocessor === 'sass' ? 'scss' : 'less';

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
    let { bootstrapVersion, targetPreprocessor } = option;
    let settings = {
      bootstrapVersion
    };

    if (bootstrapVersion === 4) {
      settings.importBootstrapFont = false;
    }

    settings.importBootstrapCSS = (targetPreprocessor === 'none');

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
