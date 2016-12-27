import Ember from 'ember';
import { moduleForComponent } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-button-group', 'Integration | Component | bs-button-group', {
  integration: true
});

test('button group has correct CSS classes', function(assert) {
  this.render(hbs`{{#bs-button-group size="lg" vertical=true justified=true as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`);

  assert.equal(this.$(':first-child').hasClass('btn-group'), true, 'has btn-group class');
  assert.equal(this.$(':first-child').hasClass('btn-group-lg'), true, 'has size class');
  assert.equal(this.$(':first-child').hasClass('btn-group-vertical'), true, 'has vertical class');
  assert.equal(this.$(':first-child').hasClass('btn-group-justified'), true, 'has justified class');
});

test('radio button group calls onChange with value of selected button', function(assert) {
  let action = this.spy();
  this.on('change', action);
  this.render(hbs`{{#bs-button-group type="radio" value=value onChange=(action "change") as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`);

  for (let i = 0; i < 3; i++) {
    this.$('button').eq(i).click();
    assert.ok(action.calledWith(i + 1), 'onChange has been called with correct value');
  }
});

test('checkbox button group calls onChange with value of all selected buttons', function(assert) {
  assert.expect(1);
  let expectedValue = [1, 2];
  this.on('change', (value) => {
    assert.deepEqual(value, expectedValue);
  });
  this.render(hbs`{{#bs-button-group type="checkbox" value=value onChange=(action "change") as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`);
  this.set('value', [1]);
  this.$('button').eq(1).click();
});

test('radio button group with value set activates button with same value', function(assert) {
  this.render(hbs`{{#bs-button-group type="radio" value=value as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`);
  this.set('value', 1);

  assert.equal(this.get('value'), 1, 'value must match set value');

  // check button's active property
  for (let k = 0; k < 3; k++) {
    assert.equal(this.$('button').eq(k).hasClass('active'), 0 === k, 'only button with same value is active');
  }
});

test('checkbox button group with value set activates buttons with same value', function(assert) {
  let value = Ember.A([1, 3]);
  this.render(hbs`{{#bs-button-group type="checkbox" value=value as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`);
  this.set('value', value);

  assert.deepEqual(this.get('value'), value, 'value must match set value');

  // check button's active property
  for (let k = 0; k < 3; k++) {
    assert.equal(this.$('button').eq(k).hasClass('active'), value.includes(k + 1), 'only buttons with value contained in set value are active');
  }
});

test('setting radio button group value activates button with same value', function(assert) {
  this.render(hbs`{{#bs-button-group type="radio" value=value as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`);

  for (let i = 0; i < 3; i++) {
    this.set('value', i + 1);
    assert.equal(this.get('value'), i + 1, 'value must match set value');

    // check button's active property
    for (let k = 0; k < 3; k++) {
      assert.equal(this.$('button').eq(k).hasClass('active'), i === k, 'only button with same value is active');
    }
  }
});

test('setting checkbox button group value with array of values activates buttons with same value', function(assert) {
  this.render(hbs`{{#bs-button-group type="checkbox" value=value as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`);

  let value = Ember.A([1, 3]);
  this.set('value', value);
  assert.deepEqual(this.get('value'), value, 'value must match set value');

  // check button's active property
  for (let k = 0; k < 3; k++) {
    assert.equal(this.$('button').eq(k).hasClass('active'), value.includes(k + 1), 'only buttons with value contained in set value is active');
  }
});

test('when clicking active radio button, onChange must not be called', function(assert) {
  let action = this.spy();
  this.on('change', action);
  this.render(hbs`{{#bs-button-group type="radio" value=1 as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`);

  this.$('button').eq(0).click();
  assert.notOk(action.called, 'onChange has not been called');
});

test('setting radio button group value to null sets buttons active state to false', function(assert) {
  this.render(hbs`{{#bs-button-group type="radio" value=value as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`);

  for (let i = 0; i < 3; i++) {
    this.set('value', i + 1);
    this.set('value', null);
    assert.equal(this.get('value'), null, 'value must be null');
    // check button's active property
    for (let k = 0; k < 3; k++) {
      assert.equal(this.$('button').eq(k).hasClass('active'), false, 'button active state is true');
    }
  }
});

test('clicking button group does not change public value porperty', function(assert) {
  let value = Ember.A([1]);
  this.set('value', value);
  this.render(hbs`{{#bs-button-group type="checkbox" value=value as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`);

  this.$('button').eq(2).click();
  assert.equal(this.get('value'), value, 'Does not change value property');
});