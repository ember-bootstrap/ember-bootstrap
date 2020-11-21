import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | progress', function (hooks) {
  setup(hooks);

  test('it renders', async function (assert) {
    await visit('/fastboot/progress');

    assert.dom('.progress').exists();
    assert.dom('.progress .progress-bar').exists();
  });
});
