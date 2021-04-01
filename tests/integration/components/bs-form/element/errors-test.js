import { A } from '@ember/array';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { formFeedbackClass, test } from '../../../../helpers/bootstrap';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../../helpers/setup-no-deprecations';

module('Integration | Component | bs form/element/errors', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('is empty by default', async function (assert) {
    this.set('messages', ['foo', 'bar']);

    await render(hbs`<BsForm::Element::Errors @show={{false}} @messages={{this.messages}} />`);

    assert.dom(`.${formFeedbackClass()}`).doesNotExist();
  });

  test('shows first message', async function (assert) {
    this.set('messages', A(['foo', 'bar']));

    await render(hbs`<BsForm::Element::Errors @show={{true}} @messages={{this.messages}} />`);

    assert.dom(`.${formFeedbackClass()}`).exists({ count: 1 });
    assert.dom(`.${formFeedbackClass()}`).hasText('foo');
  });

  test('shows multiple errors', async function (assert) {
    this.set('messages', A(['foo', 'bar']));
    await render(
      hbs`<BsForm::Element::Errors @messages={{this.messages}} @show={{true}} @showMultipleErrors={{true}} />`
    );
    assert.dom(`.${formFeedbackClass()}`).exists({ count: 2 });
    assert.dom(`.${formFeedbackClass()}:first-child`).hasText('foo');
    assert.dom(`.${formFeedbackClass()}:last-child`).hasText('bar');
  });
});
