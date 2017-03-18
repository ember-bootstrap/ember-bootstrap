'use strict';

const CoreObject = require('core-object');
const path = require('path');
const chalk = require('chalk');
const npmVersion = require('../utils/npm-version');
const npmInstalledVersion = require('../utils/npm-installed-version');
const bowerVersion = require('../utils/bower-version');

const npmPackages = [
  'ember-cli',
  'bootstrap',
  'bootstrap-sass',
  'ember-cli-sass',
  'ember-cli-less'
];

const bowerPackages = [
  'bootstrap'
];

module.exports = CoreObject.extend({

  run(options) {

    this.ui.writeLine(chalk.bold('Bower packages:'));
    bowerPackages.forEach((pkg) => {
      let version = bowerVersion(pkg);
      this.printVersion(pkg, version);
    });

    this.ui.writeLine(chalk.bold('Npm packages:'));
    npmPackages.forEach((pkg) => {
      let version = npmVersion(pkg);
      let installedVersion = version ? npmInstalledVersion(pkg) : undefined;
      this.printVersion(pkg, version, installedVersion);
    });
  },

  printVersion(module, version, installedVersion) {
    if (version && installedVersion) {
      this.ui.writeLine(`${module}: ${version} -> ${installedVersion || 'n/a'}`);
    } else if (version) {
      this.ui.writeLine(`${module}: ${version}`);
    } else {
      this.ui.writeLine(`${module}: n/a`);
    }
  },

});
