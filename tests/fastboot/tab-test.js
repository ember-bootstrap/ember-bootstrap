import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | tab', function (hooks) {
  setup(hooks);

  test('it renders', async function (assert) {
    await visit('/fastboot/tabs');

    assert.dom('ul.nav.nav-tabs').exists();
    assert.dom('ul.nav li').exists({ count: 2 });
    assert.dom('ul.nav li.active').exists({ count: 1 });
    assert.dom('.tab-pane').exists({ count: 2 });
    assert.dom('.tab-pane.active').exists({ count: 1 });
  });
});
