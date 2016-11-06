import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-button-group', 'Integration | Component | bs-button-group', {
  integration: true
});

test('button group has correct CSS classes', function(assert) {
  this.render(hbs`{{#bs-button-group size="lg" vertical=true justified=true}}{{#bs-button value=1}}1{{/bs-button}}{{#bs-button value=2}}2{{/bs-button}}{{#bs-button value=3}}3{{/bs-button}}{{/bs-button-group}}`);

  assert.equal(this.$(':first-child').hasClass('btn-group'), true, 'has btn-group class');
  assert.equal(this.$(':first-child').hasClass('btn-group-lg'), true, 'has size class');
  assert.equal(this.$(':first-child').hasClass('btn-group-vertical'), true, 'has vertical class');
  assert.equal(this.$(':first-child').hasClass('btn-group-justified'), true, 'has justified class');
});

test('radio button group has value of selected button', function(assert) {
  this.render(hbs`{{#bs-button-group type="radio" value=value}}{{#bs-button value=1}}1{{/bs-button}}{{#bs-button value=2}}2{{/bs-button}}{{#bs-button value=3}}3{{/bs-button}}{{/bs-button-group}}`);

  for (let i = 0; i < 3; i++) {
    this.$('button').eq(i).click();
    assert.equal(this.get('value'), i + 1, 'value of button group must match that of clicked button');

    // check button's active property
    for (let k = 0; k < 3; k++) {
      assert.equal(this.$('button').eq(k).hasClass('active'), i === k, 'only clicked button is active');
    }
  }
});

test('checkbox button group has value of all selected button', function(assert) {
  let expectedValue = [];
  this.render(hbs`{{#bs-button-group type="checkbox" value=value}}{{#bs-button value=1}}1{{/bs-button}}{{#bs-button value=2}}2{{/bs-button}}{{#bs-button value=3}}3{{/bs-button}}{{/bs-button-group}}`);

  for (let i = 0; i < 3; i++) {
    this.$('button').eq(i).click();
    expectedValue.push(i + 1);
    assert.deepEqual(this.get('value'), expectedValue, 'value of button group must match array of values of all active buttons');

    // check button's active property
    for (let k = 0; k < 3; k++) {
      assert.equal(this.$('button').eq(k).hasClass('active'), k <= i, 'every clicked button is active');
    }
  }
});

test('radio button group with value set activates button with same value', function(assert) {
  this.render(hbs`{{#bs-button-group type="radio" value=value}}{{#bs-button value=1}}1{{/bs-button}}{{#bs-button value=2}}2{{/bs-button}}{{#bs-button value=3}}3{{/bs-button}}{{/bs-button-group}}`);
  this.set('value', 1);

  assert.equal(this.get('value'), 1, 'value must match set value');

  // check button's active property
  for (let k = 0; k < 3; k++) {
    assert.equal(this.$('button').eq(k).hasClass('active'), 0 === k, 'only button with same value is active');
  }
});

test('checkbox button group with value set activates buttons with same value', function(assert) {
  let value = [1, 3];
  this.render(hbs`{{#bs-button-group type="checkbox" value=value}}{{#bs-button value=1}}1{{/bs-button}}{{#bs-button value=2}}2{{/bs-button}}{{#bs-button value=3}}3{{/bs-button}}{{/bs-button-group}}`);
  this.set('value', value);

  assert.deepEqual(this.get('value'), value, 'value must match set value');

  // check button's active property
  for (let k = 0; k < 3; k++) {
    assert.equal(this.$('button').eq(k).hasClass('active'), value.includes(k + 1), 'only buttons with value contained in set value are active');
  }
});

test('setting radio button group value activates button with same value', function(assert) {
  this.render(hbs`{{#bs-button-group type="radio" value=value}}{{#bs-button value=1}}1{{/bs-button}}{{#bs-button value=2}}2{{/bs-button}}{{#bs-button value=3}}3{{/bs-button}}{{/bs-button-group}}`);

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
  this.render(hbs`{{#bs-button-group type="checkbox" value=value}}{{#bs-button value=1}}1{{/bs-button}}{{#bs-button value=2}}2{{/bs-button}}{{#bs-button value=3}}3{{/bs-button}}{{/bs-button-group}}`);

  let value = [1, 3];
  this.set('value', value);
  assert.deepEqual(this.get('value'), value, 'value must match set value');

  // check button's active property
  for (let k = 0; k < 3; k++) {
    assert.equal(this.$('button').eq(k).hasClass('active'), value.includes(k + 1), 'only buttons with value contained in set value is active');
  }
});

test('when clicking active radio button, button remains active', function(assert) {
  this.render(hbs`{{#bs-button-group type="radio" value=value}}{{#bs-button value=1}}1{{/bs-button}}{{#bs-button value=2}}2{{/bs-button}}{{#bs-button value=3}}3{{/bs-button}}{{/bs-button-group}}`);

  this.$('button').eq(0).click();
  this.$('button').eq(0).click();
  assert.ok(this.$('button').eq(0).hasClass('active'), 'clicked active button remains active');
});

test('setting radio button group value to null sets buttons active state to false', function(assert) {
  this.render(hbs`{{#bs-button-group type="radio" value=value}}{{#bs-button value=1}}1{{/bs-button}}{{#bs-button value=2}}2{{/bs-button}}{{#bs-button value=3}}3{{/bs-button}}{{/bs-button-group}}`);

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
