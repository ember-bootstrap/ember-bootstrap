import { A } from '@ember/array';
import { find, click } from 'ember-native-dom-helpers';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-button-group', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('button group has correct CSS classes', async function(assert) {
    await render(
      hbs`{{#bs-button-group size="lg" justified=true as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`
    );

    assert.ok(find(':first-child').classList.contains('btn-group'), 'has btn-group class');
    assert.ok(find(':first-child').classList.contains('btn-group-lg'), 'has size class');
    assert.ok(find(':first-child').classList.contains('btn-group-justified'), 'has justified class');
  });

  test('button group supports vertical layout', async function(assert) {
    await render(
      hbs`{{#bs-button-group vertical=true as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`
    );

    assert.notOk(find(':first-child').classList.contains('btn-group'), 'has not btn-group class');
    assert.ok(find(':first-child').classList.contains('btn-group-vertical'), 'has vertical class');
  });

  test('radio button group calls onChange with value of selected button', async function(assert) {
    let action = this.spy();
    this.actions.change = action;
    await render(
      hbs`{{#bs-button-group type="radio" value=value onChange=(action "change") as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`
    );

    for (let i = 0; i < 3; i++) {
      await click(`button:nth-child(${i + 1})`);
      assert.ok(action.calledWith(i + 1), 'onChange has been called with correct value');
    }
  });

  test('checkbox button group calls onChange with value of all selected buttons', async function(assert) {
    assert.expect(1);
    let expectedValue = [1, 2];
    this.actions.change = (value) => {
      assert.deepEqual(value, expectedValue);
    };
    await render(
      hbs`{{#bs-button-group type="checkbox" value=value onChange=(action "change") as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`
    );
    this.set('value', [1]);
    await click('button:nth-child(2)');
  });

  test('radio button group with value set activates button with same value', async function(assert) {
    await render(
      hbs`{{#bs-button-group type="radio" value=value as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`
    );
    this.set('value', 1);

    assert.equal(this.get('value'), 1, 'value must match set value');

    // check button's active property
    for (let k = 0; k < 3; k++) {
      assert.equal(find(`button:nth-child(${k + 1})`).classList.contains('active'), 0 === k, 'only button with same value is active');
    }
  });

  test('checkbox button group with value set activates buttons with same value', async function(assert) {
    let value = A([1, 3]);
    await render(
      hbs`{{#bs-button-group type="checkbox" value=value as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`
    );
    this.set('value', value);

    assert.deepEqual(this.get('value'), value, 'value must match set value');

    // check button's active property
    for (let k = 0; k < 3; k++) {
      assert.equal(find(`button:nth-child(${k + 1})`).classList.contains('active'), value.includes(k + 1), 'only buttons with value contained in set value are active');
    }
  });

  test('setting radio button group value activates button with same value', async function(assert) {
    await render(
      hbs`{{#bs-button-group type="radio" value=value as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`
    );

    for (let i = 0; i < 3; i++) {
      this.set('value', i + 1);
      assert.equal(this.get('value'), i + 1, 'value must match set value');

      // check button's active property
      for (let k = 0; k < 3; k++) {
        assert.equal(find(`button:nth-child(${k + 1})`).classList.contains('active'), i === k, 'only button with same value is active');
      }
    }
  });

  test('setting checkbox button group value with array of values activates buttons with same value', async function(assert) {
    await render(
      hbs`{{#bs-button-group type="checkbox" value=value as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`
    );

    let value = A([1, 3]);
    this.set('value', value);
    assert.deepEqual(this.get('value'), value, 'value must match set value');

    // check button's active property
    for (let k = 0; k < 3; k++) {
      assert.equal(find(`button:nth-child(${k + 1})`).classList.contains('active'), value.includes(k + 1), 'only buttons with value contained in set value is active');
    }
  });

  test('when clicking active radio button, onChange must not be called', async function(assert) {
    let action = this.spy();
    this.actions.change = action;
    await render(
      hbs`{{#bs-button-group type="radio" value=1 as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`
    );

    await click('button:nth-child(1)');
    assert.notOk(action.called, 'onChange has not been called');
  });

  test('setting radio button group value to null sets buttons active state to false', async function(assert) {
    await render(
      hbs`{{#bs-button-group type="radio" value=value as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`
    );

    for (let i = 0; i < 3; i++) {
      this.set('value', i + 1);
      this.set('value', null);
      assert.equal(this.get('value'), null, 'value must be null');
      // check button's active property
      for (let k = 0; k < 3; k++) {
        assert.equal(find(`button:nth-child(${k + 1})`).classList.contains('active'), false, 'button active state is true');
      }
    }
  });

  test('clicking button group does not change public value porperty', async function(assert) {
    let value = A([1]);
    this.set('value', value);
    await render(
      hbs`{{#bs-button-group type="checkbox" value=value as |bg|}}{{#bg.button value=1}}1{{/bg.button}}{{#bg.button value=2}}2{{/bg.button}}{{#bg.button value=3}}3{{/bg.button}}{{/bs-button-group}}`
    );

    await click('button:nth-child(3)');
    assert.equal(this.get('value'), value, 'Does not change value property');
  });
});