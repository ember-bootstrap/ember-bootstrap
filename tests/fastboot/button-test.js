import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';
import { defaultButtonClass } from '../helpers/bootstrap';

module('FastBoot | button', function (hooks) {
  setup(hooks);

  test('it renders', async function (assert) {
    await visit('/fastboot/button');

    assert.dom('.btn').exists();
    assert.dom('.btn').hasClass(defaultButtonClass());
    assert.dom('.btn').hasText('Button');
  });
});
