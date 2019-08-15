import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';
import setupFastBootRootElement from '../helpers/setup-fastboot';

module('FastBoot | dropdown', function(hooks) {
  setup(hooks);
  setupFastBootRootElement(hooks);

  test('it renders', async function(assert) {
    await visit('/components/dropdown');

    assert.dom('.dropdown').exists();
    assert.dom('.dropdown .dropdown-toggle').exists();
    assert.dom('.dropdown .dropdown-toggle').hasText('Dropdown');
  });

});
