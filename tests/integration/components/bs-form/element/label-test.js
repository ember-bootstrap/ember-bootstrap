import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { testBS3, testBS4 } from '../../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../../helpers/setup-no-deprecations';

module('Integration | Component | bs form/element/label', function(hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{bs-form/element/label}}`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      {{#bs-form/element/label}}
        template block text
      {{/bs-form/element/label}}
    `);

    assert.dom('*').hasText('template block text');
  });

  testBS3('component has control-label class', async function(assert) {
    await render(hbs`{{bs-form/element/label}}`);
    assert.dom('label').hasClass('control-label', 'component has control-label class');
  });

  testBS4('component has col-form-label class when using horizontal forms', async function(assert) {
    await render(hbs`{{bs-form/element/label formLayout="horizontal"}}`);
    assert.dom('label').hasClass('col-form-label', 'component has col-form-label class');
  });

  testBS4('component has form-check-label class when using control type checkbox', async function(assert) {
    await render(hbs`{{bs-form/element/label controlType="checkbox"}}`);
    assert.dom('label').hasClass('form-check-label', 'component has form-check-label class');
  });

  testBS4('support size classes when using horizontal forms', async function(assert) {
    await render(hbs`{{bs-form/element/label size="lg" formLayout="horizontal"}}`);
    assert.dom('label').hasClass('col-form-label-lg', 'label has large class');

    await render(hbs`{{bs-form/element/label size="sm" formLayout="horizontal"}}`);
    assert.dom('label').hasClass('col-form-label-sm', 'label has small class');

    await render(hbs`{{bs-form/element/label size="lg"}}`);
    assert.dom('label').hasNoClass('col-form-label-lg', 'label does not have large class');

    await render(hbs`{{bs-form/element/label size="sm"}}`);
    assert.dom('label').hasNoClass('col-form-label-sm', 'label does not have small class');
  });
});
