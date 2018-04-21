import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-dropdown/toggle', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('toggle has correct default markup', async function(assert) {
    await render(hbs`{{#bs-dropdown/toggle}}Test{{/bs-dropdown/toggle}}`);

    assert.dom('a').exists('toggle is an anchor tag by default');
    assert.dom('a').hasAttribute('href', '#', 'has href attribute');
    assert.dom('.dropdown-toggle').exists('has dropdown-toggle class');
    assert.dom('a').hasAttribute('role', 'button', 'has role=button');
  });

  test('toggle as button does not have href', async function(assert) {
    await render(hbs`{{#bs-dropdown/toggle tagName="button"}}Test{{/bs-dropdown/toggle}}`);

    assert.dom('button').exists('toggle is a button');
    assert.dom('button').doesNotHaveAttribute('href', 'does not have href attribute');
  });

  test('clicking toggle sends onClick action', async function(assert) {
    let action = this.spy();
    this.actions.click = action;
    await render(hbs`{{#bs-dropdown/toggle onClick=(action "click")}}Test{{/bs-dropdown/toggle}}`);
    await click('a');
    assert.ok(action.calledOnce, 'onClick action has been called.');
  });
});

