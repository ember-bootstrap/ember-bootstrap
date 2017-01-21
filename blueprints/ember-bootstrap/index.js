/* eslint-env node */
'use strict';

const rsvp = require('rsvp');
const fs = require('fs');
const path = require('path');
const writeFile = rsvp.denodeify(fs.writeFile);
const chalk = require('chalk');

const bs3Version = '^3.3.7';

module.exports = {
  normalizeEntityName() {
  },

  afterInstall() {
    return this.addDependencies()
      .then(() => this.addPreprocessorImport());
  },

  addDependencies() {
    let dependencies = this.project.dependencies();

    let promises = [
    ];

    if ('ember-cli-sass' in dependencies) {
      promises.push(this.addPackageToProject('bootstrap-sass', bs3Version));
    } else {
      promises.push(this.addBowerPackageToProject('bootstrap', bs3Version));
    }

    return rsvp.all(promises);
  },

  addPreprocessorImport() {
    let dependencies = this.project.dependencies();
    let type;
    let importStatement = '\n@import "ember-bootstrap/bootstrap";\n';

    if ('ember-cli-sass' in dependencies) {
      type = 'scss';
    } else if ('ember-cli-less' in dependencies) {
      type = 'less';
    }

    if (type) {
      let stylePath = path.join('app', 'styles');
      let file = path.join(stylePath, `app.${type}`);

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
    }
  }
};