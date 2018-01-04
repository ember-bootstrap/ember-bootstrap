import { A } from '@ember/array';
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

    assert.dom(`.${formFeedbackClass()}`).doesNotExist();
  });

  test('shows first message', async function(assert) {

    this.set('messages', A(['foo', 'bar']));

    await render(hbs`{{bs-form/element/errors show=true messages=messages}}`);

    assert.dom(`.${formFeedbackClass()}`).exists({ count: 1 });
    assert.dom(`.${formFeedbackClass()}`).hasText('foo');
  });

  test('shows multiple errors', async function(assert) {
    this.set('messages', A(['foo', 'bar']));
    await render(hbs`{{bs-form/element/errors messages=messages show=true showMultipleErrors=true}}`);
    assert.dom(`.${formFeedbackClass()}`).exists({ count: 2 });
    assert.dom(`.${formFeedbackClass()}:first-child`).hasText('foo');
    assert.dom(`.${formFeedbackClass()}:last-child`).hasText('bar');
  });
});
