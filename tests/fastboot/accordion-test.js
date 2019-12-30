import { module } from 'qunit';
import { setup, visit, /* mockServer */ } from 'ember-cli-fastboot-testing/test-support';
import setupFastBootRootElement from '../helpers/setup-fastboot';
import { testBS3, testBS4 } from '../helpers/bootstrap-test';

module('FastBoot | accordion', function(hooks) {
  setup(hooks);
  setupFastBootRootElement(hooks);

  testBS4('it renders', async function(assert) {
    await visit('/fastboot/accordion');

    assert.dom('.accordion').exists();
    assert.dom('.accordion .card').exists({ count: 3 });
    assert.dom('.accordion .card .card-header').hasText('First item');
  });

  testBS3('it renders', async function(assert) {
    await visit('/fastboot/accordion');

    assert.dom('.panel-group').exists();
    assert.dom('.panel-group .panel').exists({ count: 3 });
    assert.dom('.panel-group .panel .panel-heading').hasText('First item');
  });

});
