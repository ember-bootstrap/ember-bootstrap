import hbs from 'htmlbars-inline-precompile';
import { Promise } from 'rsvp';
import { click, find, findAll, triggerEvent } from 'ember-native-dom-helpers';
import { module } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { test, testBS3, testBS4 } from '../../helpers/bootstrap-test';

const TRANSITION_DURATION = 50;

function clickIndicator(index) {
  return click(`.carousel-indicators li:nth-child(${index})`);
}

function clickToNextSlide() {
  let control = find('.carousel-control.right');
  if (control !== null) {
    return click('.carousel-control.right');
  }
  control = find('.carousel-control-next');
  if (control !== null) {
    return click('.carousel-control-next');
  }
  return null;
}

function clickToPrevSlide() {
  let control = find('.carousel-control.left');
  if (control !== null) {
    return click('.carousel-control.left');
  }
  control = find('.carousel-control-prev');
  if (control !== null) {
    return click('.carousel-control-prev');
  }
  return null;
}

function getActivatedSlide(index) {
  return find(`.carousel-inner div:nth-child(${index}).active`);
}

function waitTransitionTime(interval = 450) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, TRANSITION_DURATION + interval);
  });
}

module('Integration | Component | bs-carousel', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('interval', 300);
    this.set('transitionDuration', TRANSITION_DURATION);
    this.stopCarousel = () => {
      this.set('interval', 0);
    }
  });

  // Markup

  test('carousel has correct markup', async function(assert) {
    await render(hbs`{{bs-carousel interval=0}}`);

    assert.dom(':first-child').hasClass('carousel', 'has carousel class');
    assert.dom(':first-child').hasClass('slide', 'has slide class');
    assert.dom('.carousel-inner').exists({ count: 1 }, 'has carousel-inner');
  });

  testBS3('carousel has correct controls markup', async function(assert) {
    await render(hbs`{{#bs-carousel interval=0 as |car|}}{{/bs-carousel}}`);

    let left = find('.left');
    let right = find('.right');
    assert.dom(left).hasClass('carousel-control', 'has left control class names');
    assert.dom(right).hasClass('carousel-control', 'has right control class names');
    assert.ok(left.querySelector('.sr-only'), 'left control has sr-only');
    assert.ok(right.querySelector('.sr-only'), 'right control has sr-only');
  });

  testBS4('carousel has correct controls markup', async function(assert) {
    await render(hbs`{{#bs-carousel interval=0 as |car|}}{{/bs-carousel}}`);

    let prev = findAll('.carousel-control-prev');
    let next = findAll('.carousel-control-next');
    assert.equal(prev.length, 1, 'has left control class names');
    assert.equal(next.length, 1, 'has right control class names');
    assert.ok(prev[0].querySelector('.sr-only'), 'left control has sr-only');
    assert.ok(next[0].querySelector('.sr-only'), 'right control has sr-only');
  });

  testBS3('carousel has correct indicators and slides markup', async function(assert) {
    await render(hbs`{{#bs-carousel interval=0 as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);

    assert.dom('.carousel-indicators li').exists({ count: 2 }, 'has right number of indicators');
    assert.dom('.carousel-inner .item').exists({ count: 2 }, 'has right number of slides');
  });

  testBS4('carousel has correct indicators and slides markup', async function(assert) {
    await render(hbs`{{#bs-carousel interval=0 as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);

    assert.dom('.carousel-indicators li').exists({ count: 2 }, 'has right number of indicators');
    assert.dom('.carousel-inner .carousel-item').exists({ count: 2 }, 'has right number of slides');
  });

  // Parameters

  test('carousel autoPlay=false must not start sliding', async function(assert) {
    await render(hbs`{{#bs-carousel autoPlay=false interval=300 transitionDuration=transitionDuration as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
    await waitTransitionTime();
    assert.ok(getActivatedSlide(1), 'autoPlay has correct behavior');
  });

  test('carousel autoPlay=true must start sliding', async function(assert) {
    render(hbs`{{#bs-carousel autoPlay=true interval=interval transitionDuration=transitionDuration as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
    await waitTransitionTime();
    assert.ok(getActivatedSlide(2), 'autoPlay has correct behavior');
    this.stopCarousel();
  });

  test('carousel wrap=false must not cross lower bound', async function(assert) {
    await render(hbs`{{#bs-carousel wrap=false transitionDuration=transitionDuration as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
    clickToPrevSlide();
    await waitTransitionTime();
    assert.ok(getActivatedSlide(1), 'wrap has correct behavior');
  });

  test('carousel wrap=false must not cross upper bound', async function(assert) {
    await render(
      hbs`{{#bs-carousel wrap=false index=1 transitionDuration=transitionDuration as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`
    );
    clickToNextSlide();
    await waitTransitionTime();
    assert.ok(getActivatedSlide(2), 'wrap has correct behavior');
  });

  test('carousel wrap=true must cross lower bound', async function(assert) {
    await render(hbs`{{#bs-carousel interval=0 wrap=true transitionDuration=transitionDuration as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
    await clickToPrevSlide();
    assert.ok(getActivatedSlide(2), 'wrap has correct behavior');
  });

  test('carousel wrap=true must cross upper bound', async function(assert) {
    await render(
      hbs`{{#bs-carousel interval=0 wrap=true index=1 transitionDuration=transitionDuration as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`
    );
    await clickToNextSlide();
    assert.ok(getActivatedSlide(1), 'wrap has correct behavior');
  });

  test('carousel index=N specifies starting slide', async function(assert) {
    await render(hbs`{{#bs-carousel index=1 as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
    assert.ok(getActivatedSlide(2), 'index has correct behavior');
  });

  test('carousel interval=0 must not trigger automatic sliding', async function(assert) {
    await render(hbs`{{#bs-carousel autoPlay=true interval=0 transitionDuration=transitionDuration as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
    await waitTransitionTime();
    assert.ok(getActivatedSlide(1), 'interval has correct behavior');
  });

  test('carousel ltr=false does right-to-left automatic sliding', async function(assert) {
    render(
      hbs`{{#bs-carousel autoPlay=true interval=interval transitionDuration=transitionDuration ltr=false as |car|}}{{car.slide}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`
    );
    await waitTransitionTime();
    assert.ok(getActivatedSlide(3), 'ltr has correct behavior');
    this.stopCarousel();
  });

  test('carousel ltr=true does left-to-right automatic sliding', async function(assert) {
    render(
      hbs`{{#bs-carousel autoPlay=true interval=interval transitionDuration=transitionDuration ltr=true as |car|}}{{car.slide}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`
    );
    await waitTransitionTime();
    assert.ok(getActivatedSlide(2), 'ltr has correct behavior');
    this.stopCarousel();
  });

  test('carousel pauseOnMouseEnter=false must not pause automatic sliding', async function(assert) {
    render(
      hbs`{{#bs-carousel autoPlay=true interval=interval transitionDuration=transitionDuration pauseOnMouseEnter=false as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`
    );
    await waitTransitionTime(10);
    triggerEvent('.carousel', 'mouseenter');
    await waitTransitionTime();
    assert.ok(getActivatedSlide(2), 'pauseOnMouseEnter has correct behavior');
    this.stopCarousel();
  });

  test('carousel pauseOnMouseEnter=true must pause automatic sliding', async function(assert) {
    render(
      hbs`{{#bs-carousel autoPlay=true interval=interval transitionDuration=transitionDuration pauseOnMouseEnter=true as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`
    );
    await waitTransitionTime(10);
    triggerEvent('.carousel', 'mouseenter');
    await waitTransitionTime();
    assert.ok(getActivatedSlide(1), 'pauseOnMouseEnter has correct behavior');
    this.stopCarousel();
  });

  // User clicks

  test('carousel has functional right control', async function(assert) {
    await render(hbs`{{#bs-carousel interval=0 transitionDuration=transitionDuration as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
    await clickToNextSlide();
    assert.ok(getActivatedSlide(2), 'right control changes slide');
  });

  test('carousel has functional left control', async function(assert) {
    await render(hbs`{{#bs-carousel interval=0 transitionDuration=transitionDuration index=1 as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
    await clickToPrevSlide();
    assert.ok(getActivatedSlide(1), 'left control changes slide');
  });

  test('carousel has functional indicators', async function(assert) {
    await render(hbs`{{#bs-carousel interval=0 transitionDuration=transitionDuration as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
    await clickIndicator(2);
    assert.dom('.carousel-indicators > li:nth-child(2).active').exists('indicators changes indicator index');
    assert.ok(getActivatedSlide(2), 'indicators changes slide index');
  });
});
