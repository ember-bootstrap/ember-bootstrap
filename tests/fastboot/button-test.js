import { module, test } from 'qunit';
import { setup, visit, /* mockServer */ } from 'ember-cli-fastboot-testing/test-support';
import setupFastBootRootElement from '../helpers/setup-fastboot';

module('FastBoot | button', function(hooks) {
  setup(hooks);
  setupFastBootRootElement(hooks);

  test('it renders', async function(assert) {
    await visit('/components/button');

    assert.dom('.btn').exists();
    assert.dom('.btn').hasClass('btn-secondary');
    assert.dom('.btn').hasText('Button');
  });

});
