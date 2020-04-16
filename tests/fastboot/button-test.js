import { module, test } from 'qunit';
import { setup, visit /* mockServer */ } from 'ember-cli-fastboot-testing/test-support';
import setupFastBootRootElement from '../helpers/setup-fastboot';
import { defaultButtonClass } from '../helpers/bootstrap-test';

module('FastBoot | button', function (hooks) {
  setup(hooks);
  setupFastBootRootElement(hooks);

  test('it renders', async function (assert) {
    await visit('/fastboot/button');

    assert.dom('.btn').exists();
    assert.dom('.btn').hasClass(defaultButtonClass());
    assert.dom('.btn').hasText('Button');
  });
});
