import { module, test } from 'qunit';
import { testBS4 } from "../../../../../helpers/bootstrap-test";
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs form/element/control/input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{bs-form/element/control/input}}`);

    assert.dom('input[type=text]').exists({ count: 1 });
  });

  test('it falls back to text if type is not supported by browser', async function(assert) {
    // This also asserts that IE 11 issue of throwing if setting an unsupported type
    // is set via DOM (e.g. document.createElement('input').type = "foo") is handled
    // well.
    await render(hbs`{{bs-form/element/control/input type="foo"}}`);

    // qunit-dom does not provide a method to assert that a property equals a value
    assert.equal(find('input').type, 'text');
  });

  testBS4('support size classes', async function(assert) {
    await render(hbs`{{bs-form/element/control/input size="lg"}}`);
    assert.dom('input').hasClass('form-control-lg', 'input has large class');

    await render(hbs`{{bs-form/element/control/input size="sm"}}`);
    assert.dom('input').hasClass('form-control-sm', 'input has small class');
  });
});
