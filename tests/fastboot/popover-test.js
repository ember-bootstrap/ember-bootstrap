import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | popover', function (hooks) {
  setup(hooks);

  test('it renders', async function (assert) {
    await visit('/fastboot/popover');

    assert.dom('.btn').exists();
    assert.dom('.popover').doesNotExist();
  });
});
