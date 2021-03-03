import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { waitFor, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { test, visibilityClass, delay } from '../../helpers/bootstrap';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import { skipTransition } from 'ember-bootstrap/utils/transition-end';
import sinon from 'sinon';

module('Integration | Component | bs-collapse', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  hooks.before(function () {
    skipTransition(false);
  });

  hooks.after(function () {
    skipTransition(undefined);
  });

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('collapse has correct default markup', async function (assert) {
    await render(hbs`<BsCollapse><p>Just some content</p></BsCollapse>`);
    assert.dom('.collapse').exists('collapse has collapse class');
    assert.dom('.collapse').hasNoClass(visibilityClass(), 'collapse does not have visibility class');
  });

  test('expanded collapse has correct default markup', async function (assert) {
    await render(hbs`<BsCollapse @collapsed={{false}}><p>Just some content</p></BsCollapse>`);
    assert.dom('.collapse').hasClass('collapse', 'collapse has collapse class');
    assert.dom('.collapse').hasClass(visibilityClass(), 'collapse has visibility class');
  });

  test('setting collapse to false expands this item', async function (assert) {
    let showAction = sinon.spy();
    let shownAction = sinon.spy();
    this.actions.show = showAction;
    this.actions.shown = shownAction;

    this.set('collapsed', true);
    await render(
      hbs`<BsCollapse @collapsed={{this.collapsed}} @onShow={{action "show"}} @onShown={{action "shown"}}><p>Just some content</p></BsCollapse>`
    );
    this.set('collapsed', false);

    assert.ok(showAction.calledOnce, 'onShow action has been called');
    assert.notOk(shownAction.called, 'onShown action has not been called');
    assert.dom('.collapsing').exists('collapse has collapsing class while transition is running');

    // wait for transitions to complete
    await settled();
    assert.ok(shownAction.calledOnce, 'onShown action has been called');
    assert.dom('.collapse').exists('collapse has collapse class');
    assert.dom('.collapse').hasClass(visibilityClass(), 'collapse has visibility class');
  });

  test('setting collapse to true collapses this item', async function (assert) {
    let hideAction = sinon.spy();
    let hiddenAction = sinon.spy();
    this.actions.hide = hideAction;
    this.actions.hidden = hiddenAction;

    this.set('collapsed', false);
    await render(
      hbs`<BsCollapse @collapsed={{this.collapsed}} @onHide={{action "hide"}} @onHidden={{action "hidden"}}><p>Just some content</p></BsCollapse>`
    );
    this.set('collapsed', true);

    assert.ok(hideAction.calledOnce, 'onHide action has been called');
    assert.notOk(hiddenAction.called, 'onHidden action has not been called');
    assert.dom('.collapsing').exists('collapse has collapsing class while transition is running');

    // wait for transitions to complete
    await settled();
    assert.ok(hiddenAction.calledOnce, 'onHidden action has been called');
    assert.dom('.collapse').exists('collapse has collapse class');
    assert.dom('.collapse').hasNoClass('in', 'collapse does not have in class');
  });

  test('after collapsing/expanding height/width is set correctly ', async function (assert) {
    this.set('collapsed', true);
    await render(
      hbs`<BsCollapse @expandedSize={{200}} @transitionDuration={{200}} @collapsed={{this.collapsed}}><p>Just some content</p></BsCollapse>`
    );
    this.set('collapsed', false);

    await waitFor('.collapsing[style*=height]');
    await delay(100);

    assert.dom('.collapsing').hasAttribute('style', 'height: 200px;');

    await waitFor('.collapse');

    assert.dom('.collapse').hasAttribute('style', '');
  });

  test('it passes accessibility checks', async function (assert) {
    await render(hbs`<button type="button">Test</button><BsCollapse><p>Just some content</p></BsCollapse>`);

    await a11yAudit();
    assert.ok(true, 'A11y audit passed');
  });
});
