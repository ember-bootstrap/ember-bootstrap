import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { testBS4 } from '../../../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../../../helpers/setup-no-deprecations';

module('Integration | Component | bs form/element/control/checkbox', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<BsForm::Element::Control::Checkbox />`);

    assert.dom('input[type=checkbox]').exists({ count: 1 });
  });

  testBS4('component has form-check-input class', async function (assert) {
    await render(hbs`<BsForm::Element::Control::Checkbox />`);
    assert.dom('input[type=checkbox]').hasClass('form-check-input', 'component has form-check-input class');
  });
});
