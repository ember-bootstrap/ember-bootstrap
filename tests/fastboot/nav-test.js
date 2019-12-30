import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';
import setupFastBootRootElement from '../helpers/setup-fastboot';

module('FastBoot | nav', function(hooks) {
  setup(hooks);
  setupFastBootRootElement(hooks);

  test('it renders', async function(assert) {
    await visit('/fastboot/navs');

    assert.dom('.nav').exists();
    assert.dom('.nav li').exists({ count: 3 });
    assert.dom('.nav li a').exists({ count: 3 });
  });

});
