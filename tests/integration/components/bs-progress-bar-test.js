import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-progress-bar', 'Integration | Component | bs-progress-bar', {
  integration: true
});

test('bs-progress-bar has correct markup', function(assert) {
  this.render(hbs`
    {{bs-progress-bar}}
  `);

  assert.equal(this.$('div.progress-bar').length, 1, 'Has progress-bar class');

});


test('Progress bar has correct width according to value, minValue and maxValue', function(assert) {

  var baseSize = 500,
  // some test data
    testData = [
      {
        value: 60,
        minValue: 0,
        maxValue: 100
      },
      {
        value: 3,
        minValue: 0,
        maxValue: 10
      },
      {
        value: 6,
        minValue: 5,
        maxValue: 10
      }
    ],
    expectedWidth;

  testData.forEach(data => {
    this.render(hbs`
      <div style="width: 500px">
        {{#bs-progress}}
          {{bs-progress-bar value=value minValue=minValue maxValue=maxValue}}
        {{/bs-progress}}
      </div>
    `);

    let value = data.value,
      minValue = data.minValue || 0,
      maxValue = data.maxValue || 100,
      expectedWidth = (value - minValue) / (maxValue - minValue) * baseSize;

    this.setProperties(data);

    assert.equal(this.$('.progress-bar').width(), expectedWidth, 'Progress bar has expected width.');
  });

});

test('bs-progress-bar has invisible label for screen readers', function(assert) {
  this.render(hbs`
    {{#bs-progress}}
      {{bs-progress-bar value=5 maxValue=10}}
    {{/bs-progress}}
  `);

  assert.equal(this.$('.progress-bar .sr-only').html().trim(), '50%', 'Progress bar shows correct default label');

  this.render(hbs`
    {{#bs-progress}}
      {{#bs-progress-bar value=5 maxValue=10 as |percent|}}5 ({{percent}}%){{/bs-progress-bar}}
    {{/bs-progress}}
  `);

  assert.equal(this.$('.progress-bar .sr-only').html().trim(), '5 (50%)', 'Progress bar shows correct custom label');

});

test('bs-progress-bar can show label', function(assert) {
  this.render(hbs`
    {{#bs-progress}}
      {{bs-progress-bar value=5 maxValue=10 showLabel=true}}
    {{/bs-progress}}
  `);

  assert.equal(this.$('.progress-bar').html().trim(), '50%', 'Progress bar shows correct default label');

  this.render(hbs`
    {{#bs-progress}}
      {{#bs-progress-bar value=5 maxValue=10 showLabel=true as |percent|}}5 ({{percent}}%){{/bs-progress-bar}}
    {{/bs-progress}}
  `);

  assert.equal(this.$('.progress-bar').html().trim(), '5 (50%)', 'Progress bar shows correct custom label');

});

test('bs-progress-bar can round label\'s percent value', function(assert) {
  this.render(hbs`
    {{#bs-progress}}
      {{bs-progress-bar value=5 maxValue=6 roundDigits=2 showLabel=true}}
    {{/bs-progress}}
  `);

  assert.equal(this.$('.progress-bar').html().trim(), '83.33%', 'Progress bar shows correct default label');

});

test('bs-progress-bar supports type class', function(assert) {
  this.render(hbs`
    {{#bs-progress}}
      {{bs-progress-bar value=50 type="success"}}
    {{/bs-progress}}
  `);

  assert.ok(this.$('.progress-bar').hasClass('progress-bar-success'), 'Progress bar has type class');

});


test('bs-progress-bar supports striped style', function(assert) {
  this.render(hbs`
    {{#bs-progress}}
      {{bs-progress-bar value=50 type="success" striped=true}}
    {{/bs-progress}}
  `);

  assert.ok(this.$('.progress-bar').hasClass('progress-bar-striped'), 'Progress bar has type class');

});


test('bs-progress-bar supports animated stripes', function(assert) {
  this.render(hbs`
    {{#bs-progress}}
      {{bs-progress-bar value=50 type="success" striped=true animate=true}}
    {{/bs-progress}}
  `);

  assert.ok(this.$('.progress-bar').hasClass('progress-bar-striped'), 'Progress bar has type class');
  assert.ok(this.$('.progress-bar').hasClass('active'), 'Progress bar has active class');

});

test('bs-progress-bar supports stacked bars', function(assert) {
  this.render(hbs`
    {{#bs-progress}}
      {{bs-progress-bar value=50 type="success"}}
      {{bs-progress-bar value=30 type="info"}}
    {{/bs-progress}}
  `);

  assert.equal(this.$('.progress-bar').length, 2, 'Progress bar has two bars');

});