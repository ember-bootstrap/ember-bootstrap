import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import { testBS3 } from '../../helpers/bootstrap';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import sinon from 'sinon';

module('Integration | Component | bs-button-group', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('button group has correct CSS classes', async function (assert) {
    await render(
      hbs`
        <BsButtonGroup @size="lg" as |bg|>
          <bg.button @value={{1}}>1</bg.button>
          <bg.button @value={{2}}>2</bg.button>
          <bg.button @value={{3}}>3</bg.button>
        </BsButtonGroup>
      `
    );

    assert.dom('.btn-group').exists('has btn-group class');
    assert.dom('.btn-group').hasClass('btn-group-lg', 'has size class');
  });

  testBS3('button group supports justified layout', async function (assert) {
    await render(
      hbs`
        <BsButtonGroup @justified={{true}} as |bg|>
          <bg.button @value={{1}}>1</bg.button>
          <bg.button @value={{2}}>2</bg.button>
          <bg.button @value={{3}}>3</bg.button>
        </BsButtonGroup>
      `
    );

    assert.dom('.btn-group').exists('has btn-group class');
    assert.dom('.btn-group').hasClass('btn-group-justified', 'has justified class');
  });

  test('button group supports vertical layout', async function (assert) {
    await render(
      hbs`
        <BsButtonGroup @vertical={{true}} as |bg|>
          <bg.button @value={{1}}>1</bg.button>
          <bg.button @value={{2}}>2</bg.button>
          <bg.button @value={{3}}>3</bg.button>
        </BsButtonGroup>
      `
    );

    assert.dom('.btn-group').doesNotExist('has not btn-group class');
    assert.dom('.btn-group-vertical').exists('has vertical class');
  });

  test('radio button group calls onChange with value of selected button', async function (assert) {
    let action = sinon.spy();
    this.change = action;
    await render(
      hbs`
        <BsButtonGroup @type="radio" @value={{this.value}} @onChange={{this.change}} as |bg|>
          <bg.button @value={{1}}>1</bg.button>
          <bg.button @value={{2}}>2</bg.button>
          <bg.button @value={{3}}>3</bg.button>
        </BsButtonGroup>
      `
    );

    for (let i = 0; i < 3; i++) {
      await click(`button:nth-child(${i + 1})`);
      assert.ok(action.calledWith(i + 1), 'onChange has been called with correct value');
    }
  });

  test('checkbox button group calls onChange with value of all selected buttons', async function (assert) {
    assert.expect(1);
    let expectedValue = [1, 2];
    this.change = (value) => {
      assert.deepEqual(value, expectedValue);
    };
    await render(
      hbs`
        <BsButtonGroup @type="checkbox" @value={{this.value}} @onChange={{this.change}} as |bg|>
          <bg.button @value={{1}}>1</bg.button>
          <bg.button @value={{2}}>2</bg.button>
          <bg.button @value={{3}}>3</bg.button>
        </BsButtonGroup>
      `
    );
    this.set('value', [1]);
    await click('button:nth-child(2)');
  });

  test('radio button group with value set activates button with same value', async function (assert) {
    await render(
      hbs`
        <BsButtonGroup @type="radio" @value={{this.value}} as |bg|>
          <bg.button @value={{1}}>1</bg.button>
          <bg.button @value={{2}}>2</bg.button>
          <bg.button @value={{3}}>3</bg.button>
        </BsButtonGroup>
      `
    );
    this.set('value', 1);

    assert.equal(this.value, 1, 'value must match set value');

    // check button's active property
    for (let k = 0; k < 3; k++) {
      assert.equal(
        this.element.querySelector(`button:nth-child(${k + 1})`).classList.contains('active'),
        0 === k,
        'only button with same value is active'
      );
    }
  });

  test('checkbox button group with value set activates buttons with same value', async function (assert) {
    let value = A([1, 3]);
    await render(
      hbs`
        <BsButtonGroup @type="checkbox" @value={{this.value}} as |bg|>
          <bg.button @value={{1}}>1</bg.button>
          <bg.button @value={{2}}>2</bg.button>
          <bg.button @value={{3}}>3</bg.button>
        </BsButtonGroup>
      `
    );
    this.set('value', value);

    assert.deepEqual(this.value, value, 'value must match set value');

    // check button's active property
    for (let k = 0; k < 3; k++) {
      assert.equal(
        this.element.querySelector(`button:nth-child(${k + 1})`).classList.contains('active'),
        value.includes(k + 1),
        'only buttons with value contained in set value are active'
      );
    }
  });

  test('setting radio button group value activates button with same value', async function (assert) {
    await render(
      hbs`
        <BsButtonGroup @type="radio" @value={{this.value}} as |bg|>
          <bg.button @value={{1}}>1</bg.button>
          <bg.button @value={{2}}>2</bg.button>
          <bg.button @value={{3}}>3</bg.button>
        </BsButtonGroup>
      `
    );

    for (let i = 0; i < 3; i++) {
      this.set('value', i + 1);
      assert.equal(this.value, i + 1, 'value must match set value');

      // check button's active property
      for (let k = 0; k < 3; k++) {
        assert.equal(
          this.element.querySelector(`button:nth-child(${k + 1})`).classList.contains('active'),
          i === k,
          'only button with same value is active'
        );
      }
    }
  });

  test('setting checkbox button group value with array of values activates buttons with same value', async function (assert) {
    await render(
      hbs`
        <BsButtonGroup @type="checkbox" @value={{this.value}} as |bg|>
          <bg.button @value={{1}}>1</bg.button>
          <bg.button @value={{2}}>2</bg.button>
          <bg.button @value={{3}}>3</bg.button>
        </BsButtonGroup>
      `
    );

    let value = A([1, 3]);
    this.set('value', value);
    assert.deepEqual(this.value, value, 'value must match set value');

    // check button's active property
    for (let k = 0; k < 3; k++) {
      assert.equal(
        this.element.querySelector(`button:nth-child(${k + 1})`).classList.contains('active'),
        value.includes(k + 1),
        'only buttons with value contained in set value is active'
      );
    }
  });

  test('when clicking active radio button, onChange must not be called', async function (assert) {
    let action = sinon.spy();
    this.change = action;
    await render(
      hbs`
        <BsButtonGroup @type="radio" @value={{1}} @onChange={{this.change}} as |bg|>
          <bg.button @value={{1}}>1</bg.button>
          <bg.button @value={{2}}>2</bg.button>
          <bg.button @value={{3}}>3</bg.button>
        </BsButtonGroup>
      `
    );

    await click('button:nth-child(1)');
    assert.notOk(action.called, 'onChange has not been called');
  });

  test('setting radio button group value to null sets buttons active state to false', async function (assert) {
    await render(
      hbs`
        <BsButtonGroup @type="radio" @value={{this.value}} as |bg|>
          <bg.button @value={{1}}>1</bg.button>
          <bg.button @value={{2}}>2</bg.button>
          <bg.button @value={{3}}>3</bg.button>
        </BsButtonGroup>
      `
    );

    for (let i = 0; i < 3; i++) {
      this.set('value', i + 1);
      this.set('value', null);
      assert.equal(this.value, null, 'value must be null');
      // check button's active property
      for (let k = 0; k < 3; k++) {
        assert.dom(`button:nth-child(${k + 1})`).hasNoClass('active', 'button active state is true');
      }
    }
  });

  test('clicking button group does not change public value property', async function (assert) {
    let value = A([1]);
    this.set('value', value);
    await render(
      hbs`
        <BsButtonGroup @type="checkbox" @value={{this.value}} @onChange={{this.change}} as |bg|>
          <bg.button @value={{1}}>1</bg.button>
          <bg.button @value={{2}}>2</bg.button>
          <bg.button @value={{3}}>3</bg.button>
        </BsButtonGroup>
      `
    );

    await click('button:nth-child(3)');
    assert.equal(this.value, value, 'Does not change value property');
  });

  test('it passes accessibility checks', async function (assert) {
    await render(
      hbs`
        <BsButtonGroup as |bg|>
          <bg.button @value={{1}}>1</bg.button>
          <bg.button @value={{2}}>2</bg.button>
          <bg.button @value={{3}}>3</bg.button>
        </BsButtonGroup>
      `
    );

    await a11yAudit();
    assert.ok(true, 'A11y audit passed');
  });
});
