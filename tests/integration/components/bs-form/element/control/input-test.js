import { module, test } from 'qunit';
import { testBS4 } from "../../../../../helpers/bootstrap-test";
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs form/element/control/input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`{{bs-form/element/control/input}}`);

    assert.dom('input[type=text]').exists({ count: 1 });
  });

  testBS4('support size classes', async function(assert) {
    await render(hbs`{{bs-form/element/control/input size="lg"}}`);
    assert.dom('input').hasClass('form-control-lg', 'input has large class');

    await render(hbs`{{bs-form/element/control/input size="sm"}}`);
    assert.dom('input').hasClass('form-control-sm', 'input has small class');
  });

  testBS4('support plaintext', async function(assert) {
    await render(hbs`{{bs-form/element/control/input type="email-plain"}}`);
    assert.dom('input').hasClass('form-control', 'input has form-control class');
    assert.dom('input').hasClass('form-control-plaintext', 'input has plaintext class');
  });
});
