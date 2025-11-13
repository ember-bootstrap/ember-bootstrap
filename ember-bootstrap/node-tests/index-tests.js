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

    it('emits a deprecation warning if the `include` option is used', function () {
      let warnings = [];
      addonIndex.warn = (message) => warnings.push(message);
      addonIndex.bootstrapOptions = { include: ['bs-button'] };

      // When include list is non-empty but exclude is empty, it will call Funnel
      // The warning is emitted before the Funnel call, so we can catch it
      // We need to avoid calling Funnel by using an empty exclude and empty include
      // Actually, let's capture the warning before the error happens
      // The warn method is called before Funnel, so we should see the warning
      // But Funnel will fail. Let's just check that the method attempted to warn.
      try {
        addonIndex.filterComponents({});
      } catch (e) {
        // Expected to fail due to invalid Broccoli node
        // But the warning should have been called
      }

      expect(warnings.length).to.equal(1);
      expect(warnings[0]).to.include(
        "Ember Bootstrap's `include` option is deprecated",
      );
      expect(warnings[0]).to.include('v7.0.0');
      expect(warnings[0]).to.include('Embroider');
      expect(warnings[0]).to.include('staticInvocables');
    });

    it('emits a deprecation warning if the `exclude` option is used', function () {
      let warnings = [];
      addonIndex.warn = (message) => warnings.push(message);
      addonIndex.bootstrapOptions = { exclude: ['bs-accordion'] };

      try {
        addonIndex.filterComponents({});
      } catch (e) {
        // Expected to fail due to invalid Broccoli node
        // But the warning should have been called
      }

      expect(warnings.length).to.equal(1);
      expect(warnings[0]).to.include(
        "Ember Bootstrap's `exclude` option is deprecated",
      );
      expect(warnings[0]).to.include('v7.0.0');
      expect(warnings[0]).to.include('Embroider');
      expect(warnings[0]).to.include('staticInvocables');
    });

    it('emits deprecation warnings for both `include` and `exclude` options', function () {
      let warnings = [];
      addonIndex.warn = (message) => warnings.push(message);
      addonIndex.bootstrapOptions = {
        include: ['bs-button'],
        exclude: ['bs-accordion'],
      };

      try {
        addonIndex.filterComponents({});
      } catch (e) {
        // Expected to fail due to invalid Broccoli node
        // But the warnings should have been called
      }

      expect(warnings.length).to.equal(2);
      expect(warnings[0]).to.include('`include` option is deprecated');
      expect(warnings[1]).to.include('`exclude` option is deprecated');
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
