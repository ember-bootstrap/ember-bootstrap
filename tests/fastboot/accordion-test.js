import { module } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';
import { test, testBS4 } from '../helpers/bootstrap';

module('FastBoot | accordion', function (hooks) {
  setup(hooks);

  test('it renders', async function (assert) {
    await visit('/fastboot/accordion');

    assert.dom('.accordion').exists();
    assert.dom('.accordion .card').exists({ count: 3 });
    assert.dom('.accordion .card .card-header').hasText('First item');
  });
});
