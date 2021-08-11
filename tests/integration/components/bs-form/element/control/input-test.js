import { module, test } from 'qunit';
import { testNotBS3 } from '../../../../../helpers/bootstrap';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
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

  testNotBS3('support size classes', async function (assert) {
    await render(hbs`<BsForm::Element::Control::Input @size="lg" />`);
    assert.dom('input').hasClass('form-control-lg', 'input has large class');

    await render(hbs`<BsForm::Element::Control::Input @size="sm" />`);
    assert.dom('input').hasClass('form-control-sm', 'input has small class');
  });
});
