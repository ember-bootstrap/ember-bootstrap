import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | bs-form-horiz-offset-class', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{bs-form-horiz-offset-class 'col-md-1'}}`);
    assert.dom(this.element).hasText('offset-md-1');

    await render(hbs`{{bs-form-horiz-offset-class 'col-md-3'}}`);
    assert.dom(this.element).hasText('offset-md-3');
  });
});
