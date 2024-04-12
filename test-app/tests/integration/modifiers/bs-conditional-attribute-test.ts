import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Modifier | bs-conditional-attribute', function (hooks) {
  setupRenderingTest(hooks);

  test('it adds the attribute when condition argument is `true`', async function (assert) {
    await render(
      hbs`<button type='button' {{bs-conditional-attribute 'disabled' true 'true'}} />`,
    );
    assert.dom('button').hasAttribute('disabled');

    await render(
      hbs`<button type='button' {{bs-conditional-attribute 'disabled' true ''}} />`,
    );
    assert.dom('button').hasAttribute('disabled');
  });

  test('it does not add the attribute when condition argument is `false`', async function (assert) {
    await render(
      hbs`<button type='button' {{bs-conditional-attribute 'disabled' false 'true'}} />`,
    );
    assert.dom('button').doesNotHaveAttribute('disabled');
    assert.dom('button').isNotDisabled('disabled');
  });
});
