import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { testBS4, testBS5 } from '../../../helpers/bootstrap';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';

module('Integration | Component | bs-form/group', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  testBS4('component has form-group bootstrap class', async function (assert) {
    await render(hbs`<BsForm::Group data-test-form-group />`);
    assert.dom('[data-test-form-group]').hasClass('form-group', 'component has form-group class');
  });

  testBS5('component has no form-group bootstrap class', async function (assert) {
    await render(hbs`<BsForm::Group data-test-form-group />`);
    assert.dom('[data-test-form-group]').hasNoClass('form-group', 'component has no form-group class');
  });

  test('component has row class for horizontal layouts', async function (assert) {
    await render(hbs`<BsForm::Group @formLayout="horizontal" />`);
    assert.dom('.row').exists('component has row class');
  });

  test('does not set size class for BS4', async function (assert) {
    await render(hbs`<BsForm::Group @size="lg" data-test-form-group />`);
    assert.dom('[data-test-form-group]').hasNoClass('form-group-lg', 'form-group has not large class');

    await render(hbs`<BsForm::Group @size="sm" data-test-form-group />`);
    assert.dom('[data-test-form-group]').hasNoClass('form-group-sm', 'form-group has not small class');
  });
});
