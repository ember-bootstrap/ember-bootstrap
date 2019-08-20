import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';
import setupFastBootRootElement from '../helpers/setup-fastboot';
import { visibilityClass } from '../helpers/bootstrap-test';

module('FastBoot | modal', function(hooks) {
  setup(hooks);
  setupFastBootRootElement(hooks);

  test('it renders', async function(assert) {
    await visit('/components/modal');

    assert.dom('.modal').exists();
    assert.dom('.modal').hasClass(visibilityClass());
    assert.dom('.modal-backdrop').hasClass(visibilityClass());
    assert.dom('.modal .modal-header .modal-title').hasText('Simple Modal');
    assert.dom('.modal .modal-body').hasText('Hi there');
  });

});
