import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | form', function (hooks) {
  setup(hooks);

  test('it renders', async function (assert) {
    await visit('/fastboot/forms');

    assert.dom('form').exists();
    assert.dom('form .form-group').exists();
    assert.dom('form .form-group label').exists();
    assert.dom('form .form-group input').hasAttribute('type', 'email');
  });
});
