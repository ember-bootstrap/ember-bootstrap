import hbs from 'htmlbars-inline-precompile';
import { find, findAll } from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import { test, testBS3, testBS4 } from '../../helpers/bootstrap-test';

moduleForComponent('bs-carousel', 'Integration | Component | bs-carousel', {
  integration: true
});

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