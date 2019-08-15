import { module, test } from 'qunit';
import { setup, visit, /* mockServer */ } from 'ember-cli-fastboot-testing/test-support';
import setupFastBootRootElement from '../helpers/setup-fastboot';

module('FastBoot | accordion', function(hooks) {
  setup(hooks);
  setupFastBootRootElement(hooks);

  test('it renders', async function(assert) {
    await visit('/components/accordion');

    assert.dom('.accordion').exists();
    assert.dom('.accordion .card').exists({ count: 3 });
    assert.dom('.accordion .card .card-header').hasText('First item');
  });

});
