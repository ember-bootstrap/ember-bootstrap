import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | dropdown', function (hooks) {
  setup(hooks);

  test('it renders', async function (assert) {
    await visit('/fastboot/dropdown');

    assert.dom('.dropdown').exists();
    assert.dom('.dropdown .dropdown-toggle').exists();
    assert.dom('.dropdown .dropdown-toggle').hasText('Dropdown');
  });
});
