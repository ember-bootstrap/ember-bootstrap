import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | button-group', function (hooks) {
  setup(hooks);

  test('it renders', async function (assert) {
    await visit('/fastboot/button-group');

    assert.dom('.btn-group').exists();
    assert.dom('.btn-group .btn').exists({ count: 3 });
  });
});
