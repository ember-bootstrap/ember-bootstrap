/* eslint-env node, mocha */
'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerate = blueprintHelpers.emberGenerate;
const modifyPackages = blueprintHelpers.modifyPackages;

const chai = require('ember-cli-blueprint-test-helpers/chai');
const file = chai.file;
const expect = chai.expect;

const fs = require('fs');
const path = require('path');

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

    describe('based on existing preprocessor', function() {

      it('skips blueprint when no preprocessor present', function() {
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

      it('skips blueprint when --preprocessor=none', function() {
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

  });


});
