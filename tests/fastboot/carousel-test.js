import { module } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';
import { testBS3, testBS4 } from '../helpers/bootstrap';

module('FastBoot | carousel', function (hooks) {
  setup(hooks);

  testBS4('it renders', async function (assert) {
    await visit('/fastboot/carousel');

    assert.dom('.carousel.slide').exists();
    assert.dom('.carousel .carousel-control-next').exists();
    assert.dom('.carousel .carousel-control-prev').exists();
    assert.dom('.carousel .carousel-inner .carousel-item').exists({ count: 3 });
  });

  testBS3('it renders', async function (assert) {
    await visit('/fastboot/carousel');

    assert.dom('.carousel.slide').exists();
    assert.dom('.carousel .right').exists();
    assert.dom('.carousel .left').exists();
    assert.dom('.carousel .carousel-inner .item').exists({ count: 3 });
  });
});
