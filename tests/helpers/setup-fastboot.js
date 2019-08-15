import QUnit from 'qunit';

export default function setupFastbootRootElement({ beforeEach, afterEach }) {

  beforeEach(function() {
    Object.defineProperty(QUnit.assert.dom, 'rootElement', {
      get: function() {
        return document.querySelector('#ember-testing [data-test-fastboot-container]');
      },
      enumerable: true,
      configurable: true,
    });
  });

  afterEach(function() {
    Object.defineProperty(QUnit.assert.dom, 'rootElement', {
      get: function() {
        return document.querySelector('#ember-testing');
      },
      enumerable: true,
      configurable: true,
    });
  });
}

