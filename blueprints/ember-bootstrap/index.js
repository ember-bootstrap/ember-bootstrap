const rsvp = require('rsvp');
const fs = require('fs');
const path = require('path');
const writeFile = rsvp.denodeify(fs.writeFile);

module.exports = {
  normalizeEntityName() {
  },

  afterInstall() {
    return this.addBowerDependencies()
      .then(() => this.addPreprocessorImport());
  },

  addBowerDependencies() {
    return this.addBowerPackageToProject('bootstrap', '~3.3.7');
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
        this.ui.writeLine(`Added import statement to ${file}`);
        return this.insertIntoFile(file, importStatement, {});
      } else {
        this.ui.writeLine(`Created ${file}`);
        return writeFile(file, importStatement);
      }
    }
  }
};