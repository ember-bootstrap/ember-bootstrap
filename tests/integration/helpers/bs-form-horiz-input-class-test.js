import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | bs-form-horiz-input-class', function (hooks) {
  setupRenderingTest(hooks);

  test('it computes matching class', async function (assert) {
    await render(hbs`{{bs-form-horiz-input-class "col-md-1"}}`);
    assert.dom(this.element).hasText('col-md-11');

    await render(hbs`{{bs-form-horiz-input-class "col-md-3"}}`);
    assert.dom(this.element).hasText('col-md-9');
  });
});
