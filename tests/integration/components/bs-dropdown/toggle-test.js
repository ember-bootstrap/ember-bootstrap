import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';
import sinon from 'sinon';

module('Integration | Component | bs-dropdown/toggle', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('toggle has correct default markup', async function (assert) {
    await render(hbs`<BsDropdown as |dd|><dd.toggle>Test</dd.toggle></BsDropdown>`);

    assert.dom('a').exists('toggle is an anchor tag by default');
    assert.dom('a').hasAttribute('href', '#', 'has href attribute');
    assert.dom('.dropdown-toggle').exists('has dropdown-toggle class');
    assert.dom('a').hasAttribute('role', 'button', 'has role=button');
  });

  test('clicking toggle sends onClick action', async function (assert) {
    let action = sinon.spy();
    this.actions.click = action;
    await render(hbs`<BsDropdown as |dd|><dd.toggle @onClick={{action "click"}}>Test</dd.toggle></BsDropdown>`);
    await click('a');
    assert.ok(action.calledOnce, 'onClick action has been called.');
  });
});
