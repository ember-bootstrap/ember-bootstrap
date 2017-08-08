import hbs from 'htmlbars-inline-precompile';
import { Promise } from 'rsvp';
import { click, find, findAll, triggerEvent } from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import { test, testBS3, testBS4 } from '../../helpers/bootstrap-test';

moduleForComponent('bs-carousel', 'Integration | Component | bs-carousel', {
  integration: true
});

const TRANSITION_DURATION = 600;

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

function waitTransitionTime(surplus = 50) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, TRANSITION_DURATION + surplus);
  });
}

// Markup

test('carousel has correct markup', function(assert) {
  this.render(hbs`{{bs-carousel}}`);

  assert.ok(find(':first-child').classList.contains('carousel'), 'has carousel class');
  assert.ok(find(':first-child').classList.contains('slide'), 'has slide class');
  assert.equal(findAll('.carousel-inner').length, 1, 'has carouse-inner');
  assert.equal(findAll('.carousel-indicators').length, 1, 'has carousel-indicators');
});

testBS3('carousel has correct controls markup', function(assert) {
  this.render(hbs`{{#bs-carousel showIndicators=false as |car|}}{{car.controls}}{{/bs-carousel}}`);

  let left = find('.left');
  let right = find('.right');
  assert.ok(left.classList.contains('carousel-control'), 'has left control class names');
  assert.ok(right.classList.contains('carousel-control'), 'has right control class names');
  assert.ok(left.querySelector('.sr-only'), 'left control has sr-only');
  assert.ok(right.querySelector('.sr-only'), 'right control has sr-only');
});

testBS4('carousel has correct controls markup', function(assert) {
  this.render(hbs`{{#bs-carousel showIndicators=false as |car|}}{{car.controls}}{{/bs-carousel}}`);

  let prev = findAll('.carousel-control-prev');
  let next = findAll('.carousel-control-next');
  assert.equal(prev.length, 1, 'has left control class names');
  assert.equal(next.length, 1, 'has right control class names');
  assert.ok(prev[0].querySelector('.sr-only'), 'left control has sr-only');
  assert.ok(next[0].querySelector('.sr-only'), 'right control has sr-only');
});

testBS3('carousel has correct indicators and slides markup', function(assert) {
  this.render(hbs`{{#bs-carousel as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);

  assert.equal(findAll('.carousel-indicators li').length, 2, 'has right number of indicators');
  assert.equal(findAll('.carousel-inner .item').length, 2, 'has right number of slides');
});

testBS4('carousel has correct indicators and slides markup', function(assert) {
  this.render(hbs`{{#bs-carousel as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);

  assert.equal(findAll('.carousel-indicators li').length, 2, 'has right number of indicators');
  assert.equal(findAll('.carousel-inner .carousel-item').length, 2, 'has right number of slides');
});

// Parameters

test('carousel autoPlay=false must not start sliding', async function(assert) {
  this.render(hbs`{{#bs-carousel autoPlay=false interval=30 as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
  await waitTransitionTime();
  assert.ok(getActivatedSlide(1), 'autoPlay has correct behavior');
});

test('carousel autoPlay=true must start sliding', async function(assert) {
  this.render(hbs`{{#bs-carousel autoPlay=true interval=30 as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
  await waitTransitionTime();
  assert.ok(getActivatedSlide(2), 'autoPlay has correct behavior');
});

test('carousel continuouslyCycle=false must not cross lower bound', async function(assert) {
  this.render(hbs`{{#bs-carousel continuouslyCycle=false as |car|}}{{car.controls}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
  clickToPrevSlide();
  await waitTransitionTime();
  assert.ok(getActivatedSlide(1), 'continuouslyCycle has correct behavior');
});

test('carousel continuouslyCycle=false must not cross upper bound', async function(assert) {
  this.render(hbs`{{#bs-carousel continuouslyCycle=false index=1 as |car|}}{{car.controls}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
  clickToNextSlide();
  await waitTransitionTime();
  assert.ok(getActivatedSlide(2), 'continuouslyCycle has correct behavior');
});

test('carousel continuouslyCycle=true must cross lower bound', async function(assert) {
  this.render(hbs`{{#bs-carousel continuouslyCycle=true as |car|}}{{car.controls}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
  clickToPrevSlide();
  await waitTransitionTime();
  assert.ok(getActivatedSlide(2), 'continuouslyCycle has correct behavior');
});

test('carousel continuouslyCycle=true must cross upper bound', async function(assert) {
  this.render(hbs`{{#bs-carousel continuouslyCycle=true index=1 as |car|}}{{car.controls}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
  clickToNextSlide();
  await waitTransitionTime();
  assert.ok(getActivatedSlide(1), 'continuouslyCycle has correct behavior');
});

test('carousel index=N specifies starting slide', function(assert) {
  this.render(hbs`{{#bs-carousel index=1 as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
  assert.ok(getActivatedSlide(2), 'index has correct behavior');
});

test('carousel interval=0 must not trigger automatic sliding', async function(assert) {
  this.render(hbs`{{#bs-carousel autoPlay=true interval=0 as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
  await waitTransitionTime();
  assert.ok(getActivatedSlide(1), 'interval has correct behavior');
});

test('carousel interval=(>0) must trigger automatic sliding', async function(assert) {
  this.render(hbs`{{#bs-carousel autoPlay=true interval=30 as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
  await waitTransitionTime();
  assert.ok(getActivatedSlide(2), 'interval has correct behavior');
});

test('carousel ltr=false does right-to-left automatic sliding', async function(assert) {
  this.render(hbs`{{#bs-carousel autoPlay=true interval=30 ltr=false as |car|}}{{car.slide}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
  await waitTransitionTime(TRANSITION_DURATION + 50);
  assert.ok(getActivatedSlide(3), 'ltr has correct behavior');
});

test('carousel ltr=true does left-to-right automatic sliding', async function(assert) {
  this.render(hbs`{{#bs-carousel autoPlay=true interval=30 ltr=true as |car|}}{{car.slide}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
  await waitTransitionTime(TRANSITION_DURATION + 50);
  assert.ok(getActivatedSlide(2), 'ltr has correct behavior');
});

test('carousel pauseOnMouseEnter=false must not pause automatic sliding', async function(assert) {
  this.render(hbs`{{#bs-carousel autoPlay=true interval=30 pauseOnMouseEnter=false as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
  triggerEvent('.carousel', 'mouseenter');
  await waitTransitionTime();
  assert.ok(getActivatedSlide(2), 'pauseOnMouseEnter has correct behavior');
});

test('carousel pauseOnMouseEnter=true must pause automatic sliding', async function(assert) {
  this.render(hbs`{{#bs-carousel autoPlay=true interval=30 pauseOnMouseEnter=true as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
  triggerEvent('.carousel', 'mouseenter');
  await waitTransitionTime();
  assert.ok(getActivatedSlide(1), 'pauseOnMouseEnter has correct behavior');
});

// User clicks

test('carousel has functional right control', async function(assert) {
  this.render(hbs`{{#bs-carousel as |car|}}{{car.controls}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
  clickToNextSlide();
  await waitTransitionTime();
  assert.ok(find('.item:nth-child(2).active'), 'right control changes slide');
});

test('carousel has functional left control', async function(assert) {
  this.render(hbs`{{#bs-carousel index=1 as |car|}}{{car.controls}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
  clickToPrevSlide();
  await waitTransitionTime();
  assert.ok(find('.item:nth-child(1).active'), 'left control changes slide');
});

test('carousel has functional indicators', async function(assert) {
  this.render(hbs`{{#bs-carousel as |car|}}{{car.slide}}{{car.slide}}{{/bs-carousel}}`);
  clickIndicator(2);
  await waitTransitionTime();
  assert.ok(find('.carousel-indicators > li:nth-child(2).active'), 'indicators changes indicator index');
  assert.ok(getActivatedSlide(2), 'indicators changes slide index');
});
