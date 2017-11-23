import { findAll } from 'ember-native-dom-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs form/element/feedback icon', function(hooks) {
  setupRenderingTest(hooks);

  test('is empty by default', async function(assert) {

    await render(hbs`{{bs-form/element/feedback-icon show=false}}`);

    assert.equal(findAll('.form-control-feedback').length, 0);
  });

  test('shows icon', async function(assert) {

    await render(hbs`{{bs-form/element/feedback-icon show=true iconName="foo"}}`);

    assert.equal(findAll('.form-control-feedback.foo').length, 1);
  });
});