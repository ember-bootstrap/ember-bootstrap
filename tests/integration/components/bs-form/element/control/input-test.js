import { module, test } from 'qunit';
import { testNotBS3 } from '../../../../../helpers/bootstrap';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../../../helpers/setup-no-deprecations';

module('Integration | Component | bs form/element/control/input', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<BsForm::Element::Control::Input />`);

    assert.dom('input[type=text]').exists({ count: 1 });
  });

  test('it sets value', async function (assert) {
    await render(hbs`<BsForm::Element::Control::Input @value="FOO" />`);

    assert.dom('input[type=text]').hasValue('FOO');
  });

  test('it falls back to text if type is not supported by browser', async function (assert) {
    // This also asserts that IE 11 issue of throwing if setting an unsupported type
    // is set via DOM (e.g. document.createElement('input').type = "foo") is handled
    // well.
    await render(hbs`<BsForm::Element::Control::Input @type="foo" />`);

    // qunit-dom does not provide a method to assert that a property equals a value
    assert.equal(find('input').type, 'text');
  });

  testNotBS3('support size classes', async function (assert) {
    await render(hbs`<BsForm::Element::Control::Input @size="lg" />`);
    assert.dom('input').hasClass('form-control-lg', 'input has large class');

    await render(hbs`<BsForm::Element::Control::Input @size="sm" />`);
    assert.dom('input').hasClass('form-control-sm', 'input has small class');
  });
});
