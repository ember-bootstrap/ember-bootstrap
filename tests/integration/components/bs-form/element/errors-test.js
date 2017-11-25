import { A } from '@ember/array';
import { find, findAll } from 'ember-native-dom-helpers';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { formFeedbackClass, test } from '../../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs form/element/errors', function(hooks) {
  setupRenderingTest(hooks);

  test('is empty by default', async function(assert) {

    this.set('messages', ['foo', 'bar']);

    await render(hbs`{{bs-form/element/errors show=false messages=messages}}`);

    assert.equal(findAll(`.${formFeedbackClass()}`).length, 0);
  });

  test('shows first message', async function(assert) {

    this.set('messages', A(['foo', 'bar']));

    await render(hbs`{{bs-form/element/errors show=true messages=messages}}`);

    assert.equal(findAll(`.${formFeedbackClass()}`).length, 1);
    assert.equal(find(`.${formFeedbackClass()}`).textContent.trim(), 'foo');
  });
});
