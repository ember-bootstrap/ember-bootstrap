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
        it('should return `true` if the file is in the blacklist', function () {
          let result = addonIndex.excludeComponent(name, [], ['bs-accordion']);

          expect(result).to.be.true;
        });

        it('should return `false` if the file is not in the blacklist', function () {
          let result = addonIndex.excludeComponent(name, [], ['bs-button']);

          expect(result).to.be.false;
        });

        it('should return `false` if the file is in the whitelist', function () {
          let result = addonIndex.excludeComponent(name, ['bs-accordion'], []);

          expect(result).to.be.false;
        });

        it('should return `true` if the file is not in the whitelist', function () {
          let result = addonIndex.excludeComponent(name, ['bs-form'], []);

          expect(result).to.be.true;
        });

        it('should return `true` if the file is in both the whitelist and blacklist', function () {
          let result = addonIndex.excludeComponent(name, ['bs-accordion'], ['bs-accordion']);

          expect(result).to.be.true;
        });

        it('should return `false` if both lists are empty', function () {
          let result = addonIndex.excludeComponent(name, [], []);

          expect(result).to.be.false;
        });
      });
    });
  });

  describe('whitelist', function () {
    it('whitelist is correct for simple component', function () {
      let result = addonIndex.generateWhitelist(['bs-button']);

      expect(result).to.deep.equal(['bs-button']);
    });

    it('whitelist is correct for component with dependencies', function () {
      let result = addonIndex.generateWhitelist(['bs-button-group']);

      expect(result).to.deep.equal(['bs-button-group', 'bs-button']);
    });
  });
});
