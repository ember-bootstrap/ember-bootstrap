import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | collapse', function (hooks) {
  setup(hooks);

  test('it renders', async function (assert) {
    await visit('/fastboot/collapse');

    assert.dom('.collapse').exists();
    assert.dom('.collapse').hasText('This is collapsible content');
  });
});
