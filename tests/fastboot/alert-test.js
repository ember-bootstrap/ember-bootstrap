import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | alert', function (hooks) {
  setup(hooks);

  test('it renders', async function (assert) {
    await visit('/fastboot/alert');

    assert.dom('.alert').exists();
    assert.dom('.alert').hasClass('alert-success');
    assert.dom('.alert').includesText('Well done! You successfully read this important alert message.');
  });
});
