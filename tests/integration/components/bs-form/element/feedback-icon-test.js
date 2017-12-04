import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs form/element/feedback icon', function(hooks) {
  setupRenderingTest(hooks);

  test('is empty by default', async function(assert) {

    await render(hbs`{{bs-form/element/feedback-icon show=false}}`);

    assert.dom('.form-control-feedback').doesNotExist();
  });

  test('shows icon', async function(assert) {

    await render(hbs`{{bs-form/element/feedback-icon show=true iconName="foo"}}`);

    assert.dom('.form-control-feedback.foo').exists({ count: 1 });
  });
});