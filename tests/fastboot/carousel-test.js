import { module, test } from 'qunit';
import { setup, visit, /* mockServer */ } from 'ember-cli-fastboot-testing/test-support';
import setupFastBootRootElement from '../helpers/setup-fastboot';

module('FastBoot | carousel', function(hooks) {
  setup(hooks);
  setupFastBootRootElement(hooks);

  test('it renders', async function(assert) {
    await visit('/components/carousel');

    assert.dom('.carousel.slide').exists();
    assert.dom('.carousel .carousel-control-next').exists();
    assert.dom('.carousel .carousel-control-prev').exists();
    assert.dom('.carousel .carousel-inner .carousel-item').exists({ count: 3 });
  });

});
