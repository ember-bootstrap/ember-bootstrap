import { findAll, find } from 'ember-native-dom-helpers';
import { module, test } from 'qunit';
import { testBS4 } from "../../../../../helpers/bootstrap-test";
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs form/element/control/input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`{{bs-form/element/control/input}}`);

    assert.equal(findAll('input[type=text]').length, 1);
  });

  testBS4('support size classes', async function(assert) {
    await render(hbs`{{bs-form/element/control/input size="lg"}}`);
    assert.equal(find('input').classList.contains('form-control-lg'), true, 'input has large class');

    await render(hbs`{{bs-form/element/control/input size="sm"}}`);
    assert.equal(find('input').classList.contains('form-control-sm'), true, 'input has small class');
  });
});
