import { module } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';
import { test, testBS4 } from '../helpers/bootstrap';

module('FastBoot | carousel', function (hooks) {
  setup(hooks);

  test('it renders', async function (assert) {
    await visit('/fastboot/carousel');

    assert.dom('.carousel.slide').exists();
    assert.dom('.carousel .carousel-control-next').exists();
    assert.dom('.carousel .carousel-control-prev').exists();
    assert.dom('.carousel .carousel-inner .carousel-item').exists({ count: 3 });
  });
});
