import { module, test } from 'qunit';
import { setup, visit, /* mockServer */ } from 'ember-cli-fastboot-testing/test-support';
import setupFastBootRootElement from '../helpers/setup-fastboot';

module('FastBoot | alert', function(hooks) {
  setup(hooks);
  setupFastBootRootElement(hooks);

  test('it renders', async function(assert) {
    await visit('/fastboot/alert');

    assert.dom('.alert').exists();
    assert.dom('.alert').hasClass('alert-success');
    assert.dom('.alert').includesText('Well done! You successfully read this important alert message.')
  });

});
