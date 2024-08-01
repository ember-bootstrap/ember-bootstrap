import { hbs } from 'ember-cli-htmlbars';
import { module, skip } from 'qunit';
import {
  click,
  getContext,
  render,
  settled,
  triggerEvent,
  waitFor,
} from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { delay, test, visuallyHiddenClass } from '../../helpers/bootstrap';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import sinon from 'sinon';
import { getConfig, macroCondition } from '@embroider/macros';

const TRANSITION_DURATION = 50;

const INDICATOR_ELEMENT = macroCondition(getConfig('ember-bootstrap').isBS5)
  ? 'button'
  : 'li';

const DIRECTION_NEXT = macroCondition(getConfig('ember-bootstrap').isBS5)
  ? 'start'
  : 'left';

const DIRECTION_PREVIOUS = macroCondition(getConfig('ember-bootstrap').isBS5)
  ? 'end'
  : 'right';

function clickIndicator(index) {
  return click(`.carousel-indicators ${INDICATOR_ELEMENT}:nth-child(${index})`);
}

function clickToNextSlide() {
  let rootEl = getContext().element;
  let control = rootEl.querySelector('.carousel-control.right');
  if (control !== null) {
    return click('.carousel-control.right');
  }
  control = rootEl.querySelector('.carousel-control-next');
  if (control !== null) {
    return click('.carousel-control-next');
  }
  return null;
}

function clickToPrevSlide() {
  let rootEl = getContext().element;
  let control = rootEl.querySelector('.carousel-control.left');
  if (control !== null) {
    return click('.carousel-control.left');
  }
  control = rootEl.querySelector('.carousel-control-prev');
  if (control !== null) {
    return click('.carousel-control-prev');
  }
  return null;
}

function getActivatedSlide(index) {
  let rootEl = getContext().element;
  return rootEl.querySelector(`.carousel-inner div:nth-child(${index}).active`);
}

function waitTransitionTime(interval = 450) {
  return delay(TRANSITION_DURATION + interval);
}

module('Integration | Component | bs-carousel', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  hooks.beforeEach(function () {
    this.set('interval', 300);
    this.set('transitionDuration', TRANSITION_DURATION);
    this.stopCarousel = () => {
      this.set('interval', 0);
    };
  });

  // Markup

  test('carousel has correct markup', async function (assert) {
    await render(hbs`<BsCarousel @interval={{0}} />`);

    assert.dom('.carousel').exists('has carousel class');
    assert.dom('.carousel').hasClass('slide', 'has slide class');
    assert.dom('.carousel-inner').exists({ count: 1 }, 'has carousel-inner');
  });

  test('carousel has correct controls markup', async function (assert) {
    await render(hbs`<BsCarousel @interval={{0}} />`);

    let prev = this.element.querySelectorAll('.carousel-control-prev');
    let next = this.element.querySelectorAll('.carousel-control-next');
    assert.equal(prev.length, 1, 'has left control class names');
    assert.equal(next.length, 1, 'has right control class names');
    assert.ok(
      prev[0].querySelector(`.${visuallyHiddenClass()}`),
      'left control has sr-only',
    );
    assert.ok(
      next[0].querySelector(`.${visuallyHiddenClass()}`),
      'right control has sr-only',
    );
  });

  test('carousel has correct indicators and slides markup', async function (assert) {
    await render(
      hbs`<BsCarousel @interval={{0}} as |car|>{{car.slide}}{{car.slide}}</BsCarousel>`,
    );

    assert
      .dom(`.carousel-indicators ${INDICATOR_ELEMENT}`)
      .exists({ count: 2 }, 'has right number of indicators');
    assert
      .dom('.carousel-inner .carousel-item')
      .exists({ count: 2 }, 'has right number of slides');
  });

  // Parameters

  test('carousel transition="fade" has correct markup', async function (assert) {
    await render(hbs`<BsCarousel @interval={{0}} @transition='fade' />`);
    assert
      .dom('.carousel')
      .hasClass('carousel-fade', 'has carousel-fade class');
  });

  test('carousel autoPlay=false must not start sliding', async function (assert) {
    await render(
      hbs`<BsCarousel
  @autoPlay={{false}}
  @interval={{300}}
  @transitionDuration={{this.transitionDuration}}
  as |car|
>{{car.slide}}{{car.slide}}</BsCarousel>`,
    );
    await waitTransitionTime();
    assert.ok(getActivatedSlide(1), 'autoPlay has correct behavior');
    assert.notOk(getActivatedSlide(2), 'autoPlay has correct behavior');
  });

  test('carousel autoPlay=true must start sliding', async function (assert) {
    render(
      hbs`<BsCarousel
  @autoPlay={{true}}
  @interval={{this.interval}}
  @transitionDuration={{this.transitionDuration}}
  as |car|
>{{car.slide}}{{car.slide}}</BsCarousel>`,
    );
    await waitTransitionTime();
    assert.notOk(getActivatedSlide(1), 'autoPlay has correct behavior');
    assert.ok(getActivatedSlide(2), 'autoPlay has correct behavior');
    this.stopCarousel();
  });

  test('carousel calls onSlideChanged when slide changes', async function (assert) {
    let action = sinon.spy();
    this.set('action', action);
    await render(
      hbs`<BsCarousel
  @onSlideChanged={{this.action}}
  @wrap={{false}}
  @transitionDuration={{this.transitionDuration}}
  as |car|
>{{car.slide}}{{car.slide}}</BsCarousel>`,
    );
    clickToNextSlide();
    assert.ok(action.notCalled, 'onSlideChanged action has not been called.');
    await waitTransitionTime();
    assert.ok(action.calledWith(1), 'onSlideChanged action has been called.');
  });

  test('carousel wrap=false must not cross lower bound', async function (assert) {
    await render(
      hbs`<BsCarousel
  @wrap={{false}}
  @transitionDuration={{this.transitionDuration}}
  as |car|
>{{car.slide}}{{car.slide}}</BsCarousel>`,
    );
    clickToPrevSlide();
    await waitTransitionTime();
    assert.ok(getActivatedSlide(1), 'wrap has correct behavior');
    assert.notOk(getActivatedSlide(2), 'wrap has correct behavior');
  });

  test('carousel wrap=false must not cross upper bound', async function (assert) {
    await render(
      hbs`<BsCarousel
  @wrap={{false}}
  @index={{1}}
  @transitionDuration={{this.transitionDuration}}
  as |car|
>{{car.slide}}{{car.slide}}</BsCarousel>`,
    );
    clickToNextSlide();
    await waitTransitionTime();
    assert.ok(getActivatedSlide(2), 'wrap has correct behavior');
    assert.notOk(getActivatedSlide(1), 'wrap has correct behavior');
  });

  test('carousel wrap=true must cross lower bound', async function (assert) {
    await render(
      hbs`<BsCarousel
  @interval={{0}}
  @wrap={{true}}
  @transitionDuration={{this.transitionDuration}}
  as |car|
>{{car.slide}}{{car.slide}}</BsCarousel>`,
    );
    await clickToPrevSlide();
    assert.notOk(getActivatedSlide(1), 'wrap has correct behavior');
    assert.ok(getActivatedSlide(2), 'wrap has correct behavior');
  });

  test('carousel wrap=true must cross upper bound', async function (assert) {
    await render(
      hbs`<BsCarousel
  @interval={{0}}
  @wrap={{true}}
  @index={{1}}
  @transitionDuration={{this.transitionDuration}}
  as |car|
>{{car.slide}}{{car.slide}}</BsCarousel>`,
    );
    await clickToNextSlide();
    assert.ok(getActivatedSlide(1), 'wrap has correct behavior');
    assert.notOk(getActivatedSlide(2), 'wrap has correct behavior');
  });

  test('carousel index=N specifies starting slide', async function (assert) {
    await render(
      hbs`<BsCarousel @index={{1}} as |car|>{{car.slide}}{{car.slide}}</BsCarousel>`,
    );
    assert.notOk(getActivatedSlide(1), 'index has correct behavior');
    assert.ok(getActivatedSlide(2), 'index has correct behavior');
  });

  test('carousel interval=0 must not trigger automatic sliding', async function (assert) {
    await render(
      hbs`<BsCarousel
  @autoPlay={{true}}
  @interval={{0}}
  @transitionDuration={{this.transitionDuration}}
  as |car|
>{{car.slide}}{{car.slide}}</BsCarousel>`,
    );
    await waitTransitionTime();
    assert.ok(getActivatedSlide(1), 'interval has correct behavior');
    assert.notOk(getActivatedSlide(2), 'interval has correct behavior');
  });

  test('carousel ltr=false does right-to-left automatic sliding', async function (assert) {
    render(
      hbs`<BsCarousel
  @autoPlay={{true}}
  @interval={{this.interval}}
  @transitionDuration={{this.transitionDuration}}
  @ltr={{false}}
  as |car|
>{{car.slide}}{{car.slide}}{{car.slide}}</BsCarousel>`,
    );
    await waitTransitionTime();
    assert.notOk(getActivatedSlide(1), 'ltr has correct behavior');
    assert.notOk(getActivatedSlide(2), 'ltr has correct behavior');
    assert.ok(getActivatedSlide(3), 'ltr has correct behavior');
    this.stopCarousel();
  });

  test('carousel ltr=true does left-to-right automatic sliding', async function (assert) {
    render(
      hbs`<BsCarousel
  @autoPlay={{true}}
  @interval={{this.interval}}
  @transitionDuration={{this.transitionDuration}}
  @ltr={{true}}
  as |car|
>{{car.slide}}{{car.slide}}{{car.slide}}</BsCarousel>`,
    );
    await waitTransitionTime();
    assert.ok(getActivatedSlide(2), 'ltr has correct behavior');
    this.stopCarousel();
  });

  test('carousel pauseOnMouseEnter=false must not pause automatic sliding', async function (assert) {
    render(
      hbs`<BsCarousel
  @autoPlay={{true}}
  @interval={{this.interval}}
  @transitionDuration={{this.transitionDuration}}
  @pauseOnMouseEnter={{false}}
  as |car|
>{{car.slide}}{{car.slide}}</BsCarousel>`,
    );
    await waitTransitionTime(10);
    triggerEvent('.carousel', 'mouseenter');
    await waitTransitionTime();
    assert.notOk(
      getActivatedSlide(1),
      'pauseOnMouseEnter has correct behavior',
    );
    assert.ok(getActivatedSlide(2), 'pauseOnMouseEnter has correct behavior');
    this.stopCarousel();
  });

  test('carousel pauseOnMouseEnter=true must pause automatic sliding', async function (assert) {
    render(
      hbs`<BsCarousel
  @autoPlay={{true}}
  @interval={{this.interval}}
  @transitionDuration={{this.transitionDuration}}
  @pauseOnMouseEnter={{true}}
  as |car|
>{{car.slide}}{{car.slide}}</BsCarousel>`,
    );
    await waitTransitionTime(10);
    triggerEvent('.carousel', 'mouseenter');
    await waitTransitionTime();
    assert.ok(getActivatedSlide(1), 'pauseOnMouseEnter has correct behavior');
    assert.notOk(
      getActivatedSlide(2),
      'pauseOnMouseEnter has correct behavior',
    );
    this.stopCarousel();
  });

  // User clicks

  test('carousel has functional right control', async function (assert) {
    await render(
      hbs`<BsCarousel
  @interval={{0}}
  @transitionDuration={{this.transitionDuration}}
  as |car|
>{{car.slide}}{{car.slide}}</BsCarousel>`,
    );
    clickToNextSlide();
    await waitFor(`.carousel-item-${DIRECTION_NEXT}`);
    assert
      .dom('.carousel-inner div:nth-child(1)')
      .hasClass(
        `carousel-item-${DIRECTION_NEXT}`,
        'transition to next slide sets correct direction class to source slide',
      );
    assert
      .dom('.carousel-inner div:nth-child(2)')
      .hasClass(
        `carousel-item-${DIRECTION_NEXT}`,
        'transition to next slide sets correct direction class to target slide',
      )
      .hasClass(
        'carousel-item-next',
        'transition to next slide sets correct order class to target slide',
      );
    await settled();
    assert.notOk(getActivatedSlide(1), 'right control changes slide');
    assert.ok(getActivatedSlide(2), 'right control changes slide');
  });

  test('carousel has functional left control', async function (assert) {
    await render(
      hbs`<BsCarousel
  @interval={{0}}
  @transitionDuration={{this.transitionDuration}}
  @index={{1}}
  as |car|
>{{car.slide}}{{car.slide}}</BsCarousel>`,
    );
    clickToPrevSlide();
    await waitFor(`.carousel-item-${DIRECTION_PREVIOUS}`);
    assert
      .dom('.carousel-inner div:nth-child(2)')
      .hasClass(
        `carousel-item-${DIRECTION_PREVIOUS}`,
        'transition to previous slide sets correct direction class to source slide',
      );
    assert
      .dom('.carousel-inner div:nth-child(1)')
      .hasClass(
        `carousel-item-${DIRECTION_PREVIOUS}`,
        'transition to previous slide sets correct direction class to target slide',
      )
      .hasClass(
        'carousel-item-prev',
        'transition to previous slide sets correct order class to target slide',
      );
    await settled();
    assert.ok(getActivatedSlide(1), 'left control changes slide');
    assert.notOk(getActivatedSlide(2), 'autoPlay has correct behavior');
  });

  test('carousel has functional indicators', async function (assert) {
    await render(
      hbs`<BsCarousel
  @interval={{0}}
  @transitionDuration={{this.transitionDuration}}
  as |car|
>{{car.slide}}{{car.slide}}</BsCarousel>`,
    );
    await clickIndicator(2);
    assert
      .dom(`.carousel-indicators > ${INDICATOR_ELEMENT}:nth-child(2).active`)
      .exists('indicators changes indicator index');
    assert.notOk(getActivatedSlide(1), 'indicators changes slide index');
    assert.ok(getActivatedSlide(2), 'indicators changes slide index');
  });

  test('carousel can move right then back to the left', async function (assert) {
    await render(
      hbs`<BsCarousel
  @interval={{0}}
  @transitionDuration={{this.transitionDuration}}
  as |car|
>{{car.slide}}{{car.slide}}</BsCarousel>`,
    );
    await clickToNextSlide();
    await clickToPrevSlide();
    assert.ok(
      getActivatedSlide(1),
      'carousel can move right then back to the left',
    );
    assert.notOk(
      getActivatedSlide(2),
      'carousel can move right then back to the left',
    );
  });

  // Default carousel markup has a11y issues (buttons w/o content)
  // Quote from https://getbootstrap.com/docs/4.0/components/carousel/:
  // carousels are generally not compliant with accessibility standards.
  skip('it passes accessibility checks', async function (assert) {
    await render(
      hbs`<BsCarousel @interval={{0}} as |car|>{{car.slide}}{{car.slide}}</BsCarousel>`,
    );

    await a11yAudit();
    assert.ok(true, 'A11y audit passed');
  });
});
