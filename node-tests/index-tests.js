'use strict';

const addonIndex = require('../index');
const expect = require('chai').expect;

describe('index', function () {
  describe('excludeComponent', function () {
    [
      'components/bs-accordion.js',
      'templates/components/bs-accordion.hbs',
      'components/bs-accordion/item.js',
      'templates/components/bs-accordion/item.hbs',
    ].forEach(function (name) {
      describe(`works for ${name}`, function () {
        it('should return `true` if the file is in the `exclude` list', function () {
          let result = addonIndex.excludeComponent(name, [], ['bs-accordion']);

          expect(result).to.be.true;
        });

        it('should return `false` if the file is not in the `exclude` list', function () {
          let result = addonIndex.excludeComponent(name, [], ['bs-button']);

          expect(result).to.be.false;
        });

        it('should return `false` if the file is in the `include` list', function () {
          let result = addonIndex.excludeComponent(name, ['bs-accordion'], []);

          expect(result).to.be.false;
        });

        it('should return `true` if the file is not in the `include` list', function () {
          let result = addonIndex.excludeComponent(name, ['bs-form'], []);

          expect(result).to.be.true;
        });

        it('should return `true` if the file is in both the `include` list and `exclude` list', function () {
          let result = addonIndex.excludeComponent(
            name,
            ['bs-accordion'],
            ['bs-accordion'],
          );

          expect(result).to.be.true;
        });

        it('should return `false` if both lists are empty', function () {
          let result = addonIndex.excludeComponent(name, [], []);

          expect(result).to.be.false;
        });
      });
    });
  });

  describe('filterComponents', function () {
    it('throws an error if the `whitelist` option is used', function () {
      addonIndex.bootstrapOptions = { whitelist: ['bs-button'] };

      expect(addonIndex.filterComponents.bind(addonIndex)).to.throw(
        "Ember Bootstrap's `whitelist` option been renamed to `include`. Please update your ember-cli-build.js accordingly.",
      );
    });

    it('throws an error if the `blacklist` option is used', function () {
      addonIndex.bootstrapOptions = { blacklist: ['bs-button'] };

      expect(addonIndex.filterComponents.bind(addonIndex)).to.throw(
        "Ember Bootstrap's `blacklist` option has been renamed to `exclude`. Please update your ember-cli-build.js accordingly.",
      );
    });
  });

  describe('generateIncludeList', function () {
    it('include list is correct for simple component', function () {
      let result = addonIndex.generateIncludeList(['bs-button']);

      expect(result).to.deep.equal(['bs-button']);
    });

    it('include list is correct for component with dependencies', function () {
      let result = addonIndex.generateIncludeList(['bs-button-group']);

      expect(result).to.deep.equal(['bs-button-group', 'bs-button']);
    });
  });
});
