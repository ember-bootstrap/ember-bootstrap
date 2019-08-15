import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';
import setupFastBootRootElement from '../helpers/setup-fastboot';

module('FastBoot | modal', function(hooks) {
  setup(hooks);
  setupFastBootRootElement(hooks);

  test('it renders', async function(assert) {
    await visit('/components/modal');

    assert.dom('.modal.show').exists();
    assert.dom('.modal-backdrop.show').exists();
    assert.dom('.modal .modal-header .modal-title').hasText('Simple Modal');
    assert.dom('.modal .modal-body').hasText('Hi there');
  });

});
