'use strict';

const CoreObject = require('core-object');
const chalk = require('chalk');
const npmVersion = require('../utils/npm-version');
const npmInstalledVersion = require('../utils/npm-installed-version');
const bowerVersion = require('../utils/bower-version');
const buildConfiguration = require('../utils/build-configuration');

const npmPackages = [
  'ember-bootstrap',
  'ember-cli',
  'bootstrap',
  'bootstrap-sass',
  'ember-cli-sass',
  'ember-cli-less'
];

const bowerPackages = [
  'bootstrap',
  'bootstrap-sass'
];

module.exports = CoreObject.extend({

  run(projectRoot) {

    this.ui.writeLine(chalk.bold('Npm packages:'));
    npmPackages.forEach((pkg) => {
      let version = npmVersion(projectRoot, pkg);
      let installedVersion = version ? npmInstalledVersion(pkg) : undefined;
      this.printVersion(pkg, version, installedVersion);
    });

    this.ui.writeLine(chalk.bold('Bower packages:'));
    bowerPackages.forEach((pkg) => {
      let version = bowerVersion(projectRoot, pkg);
      this.printVersion(pkg, version);
    });

    this.ui.writeLine(chalk.bold('ember-bootstrap configuration:'));
    let configuration = buildConfiguration(projectRoot);
    this.printConfiguration(configuration);
  },

  printVersion(module, version, installedVersion) {
    if (version && installedVersion) {
      this.ui.writeLine(`${module}: ${version} -> ${installedVersion}`);
    } else if (version) {
      this.ui.writeLine(`${module}: ${version}`);
    } else {
      this.ui.writeLine(`${module}: n/a`);
    }
  },

  printConfiguration(configuration) {
    if (configuration && Object.keys(configuration).length > 0) {
      Object.keys(configuration).forEach((key) => this.ui.writeLine(`${key}: ${configuration[key]}`));
    } else {
      this.ui.writeLine('n/a');
    }
  }
});
