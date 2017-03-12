/* eslint-env node, mocha */
'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerate = blueprintHelpers.emberGenerate;
const modifyPackages = blueprintHelpers.modifyPackages;

const chai = require('ember-cli-blueprint-test-helpers/chai');
const file = chai.file;
const chaiThings = require('chai-things');
const expect = chai.expect;
const Promise = require('rsvp');

const fs = require('fs');
const path = require('path');

const scenarios = require('./dependencyScenarios');

chai.use(chaiThings);

function createStyleFixture(name) {
  let stylePath = path.join('app', 'styles');
  if (!fs.existsSync(stylePath)) {
    fs.mkdirSync(stylePath);
  }
  fs.writeFileSync(path.join(stylePath, name), 'body { color: red; }');
}

/*
 * Note: these tests fail, until https://github.com/ember-cli/ember-cli-internal-test-helpers/issues/22 is resolved
 */
describe('Acceptance: ember generate ember-bootstrap', function() {
  setupTestHooks(this);

  describe('import styles', function() {
    setupTestHooks(this);

    describe('based on existing preprocessor', function() {

      it('skips style import when no preprocessor present', function() {
        let args = ['ember-bootstrap'];

        return emberNew()
          .then(() => emberGenerate(args, (file) => {
            expect(file('app/styles/app.scss')).to.not.exist;
            expect(file('app/styles/app.less')).to.not.exist;
          }));
      });

      it('creates app.scss if not existing and ember-cli-sass is present', function() {
        let args = ['ember-bootstrap'];

        return emberNew()
          .then(() => modifyPackages([
            { name: 'ember-cli-sass' }
          ]))
          .then(() => emberGenerate(args))
          .then(() => {
            expect(file('app/styles/app.scss'))
              .to.contain('@import "ember-bootstrap/bootstrap";');
            expect(file('app/styles/app.less')).to.not.exist;
          });
      });

      it('adds @import to existing app.scss if ember-cli-sass is present', function() {
        let args = ['ember-bootstrap'];

        return emberNew()
          .then(() => modifyPackages([
            { name: 'ember-cli-sass' }
          ]))
          .then(() => createStyleFixture('app.scss'))
          .then(() => emberGenerate(args, (file) => {
            expect(file('app/styles/app.scss')).to.contain('@import "ember-bootstrap/bootstrap";');
            expect(file('app/styles/app.less')).to.not.exist;
          }));
      });

      it('creates app.less if not existing and ember-cli-less is present', function() {
        let args = ['ember-bootstrap'];

        return emberNew()
          .then(() => modifyPackages([
            { name: 'ember-cli-less' }
          ]))
          .then(() => emberGenerate(args))
          .then(() => {
            expect(file('app/styles/app.less'))
              .to.contain('@import "ember-bootstrap/bootstrap";');
            expect(file('app/styles/app.scss')).to.not.exist;
          });
      });

      it('adds @import to existing app.less if ember-cli-less is present', function() {
        let args = ['ember-bootstrap'];

        return emberNew()
          .then(() => modifyPackages([
            { name: 'ember-cli-less' }
          ]))
          .then(() => createStyleFixture('app.less'))
          .then(() => emberGenerate(args))
          .then(() => {
            expect(file('app/styles/app.less'))
              .to.contain('body { color: red; }')
              .to.contain('@import "ember-bootstrap/bootstrap";');
            expect(file('app/styles/app.scss')).to.not.exist;
          });
      });

    });

    describe('based on generator option', function() {

      it('skips style import when --preprocessor=none', function() {
        let args = ['ember-bootstrap', '--preprocessor=none'];

        return emberNew()
          .then(() => emberGenerate(args, (file) => {
            expect(file('app/styles/app.scss')).to.not.exist;
            expect(file('app/styles/app.less')).to.not.exist;
          }));
      });

      it('creates app.scss if not existing and --preprocessor=sass', function() {
        let args = ['ember-bootstrap', '--preprocessor=sass'];

        return emberNew()
          .then(() => emberGenerate(args))
          .then(() => {
            expect(file('app/styles/app.scss'))
              .to.contain('@import "ember-bootstrap/bootstrap";');
            expect(file('app/styles/app.less')).to.not.exist;
          });
      });

      it('adds @import to existing app.scss if --preprocessor=sass', function() {
        let args = ['ember-bootstrap', '--preprocessor=sass'];

        return emberNew()
          .then(() => createStyleFixture('app.scss'))
          .then(() => emberGenerate(args, (file) => {
            expect(file('app/styles/app.scss')).to.contain('@import "ember-bootstrap/bootstrap";');
            expect(file('app/styles/app.less')).to.not.exist;
          }));
      });

      it('creates app.less if not existing and --preprocessor=less', function() {
        let args = ['ember-bootstrap', '--preprocessor=less'];

        return emberNew()
          .then(() => emberGenerate(args))
          .then(() => {
            expect(file('app/styles/app.less'))
              .to.contain('@import "ember-bootstrap/bootstrap";');
            expect(file('app/styles/app.scss')).to.not.exist;
          });
      });

      it('adds @import to existing app.less if --preprocessor=less', function() {
        let args = ['ember-bootstrap', '--preprocessor=less'];

        return emberNew()
          .then(() => createStyleFixture('app.less'))
          .then(() => emberGenerate(args))
          .then(() => {
            expect(file('app/styles/app.less'))
              .to.contain('body { color: red; }')
              .to.contain('@import "ember-bootstrap/bootstrap";');
            expect(file('app/styles/app.scss')).to.not.exist;
          });
      });

    });

  });

  describe('install dependencies', function() {

    const Blueprint = require('ember-cli/lib/models/blueprint');
    const origTaskFor = Blueprint.prototype.taskFor;
    let installed = {
      npm: [],
      bower: [],
      addon: []
    };
    let uninstalled = {
      npm: [],
      bower: []
    };

    before(function() {
      Blueprint.prototype.taskFor = function(taskName) {
        let match = taskName.match(/^(npm|bower|addon)-install$/);
        if (match) {
          let type = match[1];
          return {
            run: function(options) {
              let packages = options.packages || [];
              installed[type] = installed[type].concat(packages);
              return Promise.resolve();
            }
          };
        }

        if (taskName === 'npm-uninstall') {
          return {
            run: function(options) {
              let packages = options.packages || [];
              uninstalled.npm = uninstalled.npm.concat(packages);
              return Promise.resolve();
            }
          };
        }

        return origTaskFor.apply(this, arguments);
      };
    });

    after(function() {
      Blueprint.prototype.taskFor = origTaskFor;
    });

    beforeEach(function() {
      installed = {
        npm: [],
        bower: [],
        addon: []
      };
      uninstalled = {
        npm: [],
        bower: []
      };
    });

    function checkPackage(type, pkg, version) {
      let installedPackages = installed[type];
      let uninstalledPackages = uninstalled[type === 'addon' ? 'npm' : type];
      if (version === null) {
        if (type === 'bower') {
          return; // not yet implemented
        }
        expect(uninstalledPackages).to.include.some.that.equal(pkg);
        if (type === 'addon') {
          expect(installedPackages).to.not.include.some.that.equal(pkg);
        } else {
          expect(installedPackages).to.not.include.some.that.match(new RegExp(`${pkg}@.*`));
        }
      } else {
        if (type === 'addon') {
          expect(installedPackages).to.include.some.that.equal(pkg);
        } else {
          expect(installedPackages).to.include.some.that.match(new RegExp(`${pkg}@${version}`));
        }
      }
    }

    scenarios.forEach(function(scenario) {
      let args = [];
      let options = scenario.options || {};
      let preprocessor = options.preprocessor;
      let bootstrapVersion = options.bootstrapVersion;
      let installed = scenario.installed || {};
      let npmInstalled = installed.npm || [];

      if (preprocessor) {
        args.push(`--preprocessor=${preprocessor}`);
      }
      if (bootstrapVersion) {
        args.push(`--bootstrapVersion=${bootstrapVersion}`);
      }

      let preInstalledText = npmInstalled.length > 0 ? `, preInstalled: ${npmInstalled.join(', ')}` : '';

      it(`installs dependencies for ember g ember-bootstrap ${args.join(' ')}${preInstalledText}`, function() {
        args = ['ember-bootstrap'].concat(args);

        return emberNew()
          .then(() => modifyPackages(npmInstalled.map((pkg) => ({ name: pkg, dev: true }))))
          .then(() => emberGenerate(args))
          .then(() => {
            for (let pkg in scenario.dependencies.bower) {
              checkPackage('bower', pkg, scenario.dependencies.bower[pkg]);
            }

            for (let pkg in scenario.dependencies.npm) {
              checkPackage('npm', pkg, scenario.dependencies.npm[pkg]);
            }

            for (let pkg in scenario.dependencies.addon) {
              checkPackage('addon', pkg, scenario.dependencies.addon[pkg]);
            }

          });
      })
    });
  });
});