import Component from '@ember/component';
import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, focus, blur, triggerEvent, waitUntil, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  test,
  versionDependent,
  testRequiringFocus,
  visibilityClass,
  tooltipPositionClass,
  tooltipArrowClass,
  delay
} from '../../helpers/bootstrap-test';
import {
  setupForPositioning,
  assertPositioning
} from '../../helpers/contextual-help';

module('Integration | Component | bs-tooltip', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  function isVisible(tt) {
    return tt && tt.classList.contains('fade') && tt.classList.contains(visibilityClass());
  }

  test('it has correct markup', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{#bs-tooltip id="tooltip-element" fade=true visible=true}}
        template block text
      {{/bs-tooltip}}
    `);

    assert.dom('.tooltip').exists({ count: 1 }, 'has tooltip class');
    // assert.ok(find('.tooltip').classList.contains(tooltipPositionClass('top')), 'has placement class');
    assert.dom('.tooltip').hasClass('fade', 'has fade class');
    assert.dom('.tooltip').hasClass(visibilityClass(), 'has visibility class');
    assert.equal(this.element.querySelector('.tooltip').getAttribute('role'), 'tooltip', 'has ARIA role');
    assert.dom(versionDependent('.tooltip-arrow', '.arrow')).exists({ count: 1 }, 'has arrow');
    assert.dom('.tooltip-inner').hasText('template block text', 'shows title');
  });

  skip('it supports different placements', async function(assert) {
    let placements = ['top', 'left', 'bottom', 'right'];
    this.set('placement', placements[0]);
    await render(hbs`
      {{#bs-tooltip/element id="tooltip-element" placement=placement}}
        template block text
      {{/bs-tooltip/element}}
    `);
    placements.forEach((placement) => {
      this.set('placement', placement);
      let placementClass = tooltipPositionClass(placement);
      assert.dom('.tooltip').hasClass(placementClass, `has ${placementClass} class`);
    });
  });

  test('it shows visible tooltip', async function(assert) {
    await render(hbs`{{bs-tooltip title="Dummy" visible=true}}`);

    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');
    assert.dom('.tooltip .tooltip-inner').hasText('Dummy');
  });

  test('it shows visible tooltip with block content', async function(assert) {
    await render(hbs`{{#bs-tooltip visible=true}}
      BLOCK
      {{/bs-tooltip}}`);

    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');
    assert.dom('.tooltip .tooltip-inner').hasText('BLOCK');
  });

  test('it hides invisible tooltip', async function(assert) {
    await render(hbs`{{bs-tooltip title="Dummy"}}`);

    assert.dom('.tooltip').doesNotExist('tooltip is not visible');
  });

  test('it shows and hides immediately when hovering [fade=false]', async function(assert) {
    await render(hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false}}</div>`);

    await triggerEvent('#target', 'mouseenter');
    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');

    await triggerEvent('#target', 'mouseleave');
    assert.dom('.tooltip').doesNotExist('tooltip is not visible');
  });

  testRequiringFocus('it shows and hides immediately when focusing [fade=false]', async function(assert) {
    await render(hbs`<button class="btn" id="target">{{bs-tooltip title="Dummy" fade=false}}</button>`);

    await focus('#target');
    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');

    await blur('#target');
    assert.dom('.tooltip').doesNotExist('tooltip is not visible');
  });

  test('it shows and hides immediately when clicking [fade=false]', async function(assert) {
    await render(hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false triggerEvents="click"}}</div>`);

    await click('#target');
    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');

    await click('#target');
    assert.dom('.tooltip').doesNotExist('tooltip is not visible');
  });

  test('it allows changing the trigger element to some arbitrary element', async function(assert) {
    await render(
      hbs`<div id="target"></div><div>{{bs-tooltip title="Dummy" fade=false triggerElement="#target"}}</div>`
    );

    await triggerEvent('#target', 'mouseenter');
    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');

    await triggerEvent('#target', 'mouseleave');
    assert.dom('.tooltip').doesNotExist('tooltip is not visible');
  });

  test('it allows changing the trigger element to the parent view', async function(assert) {
    let dummyComponent = Component.extend({
      layout: hbs`<div>{{yield}}</div>`
    });
    this.owner.register('component:dum-my', dummyComponent);

    await render(
      hbs`{{#dum-my id="target"}}{{bs-tooltip title="Dummy" fade=false triggerElement="parentView"}}{{/dum-my}}`
    );

    await triggerEvent('#target', 'mouseenter');
    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');

    await triggerEvent('#target', 'mouseleave');
    assert.dom('.tooltip').doesNotExist('tooltip is not visible');
  });

  test('it calls onShow/onShown actions when showing tooltip [fade=false]', async function(assert) {
    let showAction = this.spy();
    this.actions.show = showAction;
    let shownAction = this.spy();
    this.actions.shown = shownAction;
    await render(
      hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false onShow=(action "show") onShown=(action "shown")}}</div>`
    );
    await triggerEvent('#target', 'mouseenter');
    assert.ok(showAction.calledOnce, 'show action has been called');
    assert.ok(shownAction.calledOnce, 'show action has been called');
  });

  test('it aborts showing if onShow action returns false', async function(assert) {
    let showAction = this.stub();
    showAction.returns(false);
    this.actions.show = showAction;
    let shownAction = this.spy();
    this.actions.shown = shownAction;
    await render(
      hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false onShow=(action "show") onShown=(action "shown")}}</div>`
    );
    await triggerEvent('#target', 'mouseenter');
    assert.ok(showAction.calledOnce, 'show action has been called');
    assert.notOk(shownAction.calledOnce, 'show action has not been called');
    assert.dom('.tooltip').doesNotExist('tooltip is not visible');
  });

  test('it calls onHide/onHidden actions when hiding tooltip [fade=false]', async function(assert) {
    let hideAction = this.spy();
    this.actions.hide = hideAction;
    let hiddenAction = this.spy();
    this.actions.hidden = hiddenAction;
    await render(
      hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false onHide=(action "hide") onHidden=(action "hidden")}}</div>`
    );
    await triggerEvent('#target', 'mouseenter');
    await triggerEvent('#target', 'mouseleave');
    assert.ok(hideAction.calledOnce, 'hide action has been called');
    assert.ok(hiddenAction.calledOnce, 'hidden action was called');
  });

  test('it aborts hiding if onHide action returns false', async function(assert) {
    let hideAction = this.stub();
    hideAction.returns(false);
    this.actions.hide = hideAction;
    let hiddenAction = this.spy();
    this.actions.hidden = hiddenAction;
    await render(
      hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false onHide=(action "hide") onHidden=(action "hidden")}}</div>`
    );
    await triggerEvent('#target', 'mouseenter');
    await triggerEvent('#target', 'mouseleave');
    assert.ok(hideAction.calledOnce, 'hide action has been called');
    assert.notOk(hiddenAction.calledOnce, 'hidden action has not been called');
    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');
  });

  testRequiringFocus('it keeps showing when leaving the mouse but is still focused [fade=false]', async function(assert) {
    await render(hbs`<a href="#" id="target">{{bs-tooltip title="Dummy" fade=false}}</a>`);

    await focus('#target');
    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');

    await triggerEvent('#target', 'mouseenter');
    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');
    await triggerEvent('#target', 'mouseleave');
    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');
  });

  test('Renders in wormhole if renderInPlace is not set', async function(assert) {
    this.set('show', false);
    await render(
      hbs`<div id="ember-bootstrap-wormhole"></div>{{#if show}}{{bs-tooltip title="Simple Tooltip" visible=true fade=false}}{{/if}}`
    );
    this.set('show', true);
    await settled();

    assert.dom('.tooltip').exists({ count: 1 }, 'Tooltip exists.');
    assert.equal(this.element.querySelector('.tooltip').parentNode.getAttribute('id'), 'ember-bootstrap-wormhole');
  });

  test('Renders in place (no wormhole) if renderInPlace is set', async function(assert) {
    this.set('show', false);
    await render(
      hbs`<div id="ember-bootstrap-wormhole"></div>{{#if show}}{{bs-tooltip title="Simple Tooltip" visible=true fade=false renderInPlace=true}}{{/if}}`
    );
    this.set('show', true);
    await settled();

    assert.dom('.tooltip').exists({ count: 1 }, 'Tooltip exists.');
    assert.notEqual(this.element.querySelector('.tooltip').parentNode.getAttribute('id'), 'ember-bootstrap-wormhole');
  });

  test('should place tooltip on top of element', async function(assert) {
    await render(
      hbs`<div id="wrapper"><p style="margin-top: 200px"><a href="#" id="target">Hover me{{bs-tooltip title="very very very very very very very long tooltip" fade=false}}</a></p></div>`
    );

    setupForPositioning();

    await triggerEvent('#target', 'mouseenter');
    assertPositioning(assert);
  });

  test('should place tooltip on top of element if already visible', async function(assert) {
    await render(
      hbs`<div id="wrapper">{{#if visible}}<p style="margin-top: 200px"><a href="#" id="target">Hover me{{bs-tooltip title="very very very very very very very long tooltip" fade=false visible=true}}</a></p>{{/if}}</div>`
    );

    setupForPositioning();
    this.set('visible', true);
    await settled();
    assertPositioning(assert);
  });

  test('should place tooltip on top of element if visible is set to true', async function(assert) {
    this.set('visible', false);
    await render(
      hbs`<div id="wrapper"><p style="margin-top: 200px"><a href="#" id="target">Hover me{{bs-tooltip title="very very very very very very very long tooltip" fade=false visible=visible}}</a></p></div>`
    );

    setupForPositioning();

    this.set('visible', true);
    await settled();
    assertPositioning(assert);
  });

  test('should show tooltip if leave event hasn\'t occurred before delay expires', async function(assert) {
    await render(hbs`<div id="target">{{bs-tooltip title="Dummy" delay=150}}</div>`);

    triggerEvent('#target', 'mouseenter');

    await delay(100);
    assert.notOk(isVisible(this.element.querySelector('.tooltip')), '100ms: tooltip is not faded in');

    await delay(100);
    assert.ok(isVisible(this.element.querySelector('.tooltip')), '200ms: tooltip is faded in');
  });

  test('should not show tooltip if leave event occurs before delay expires', async function(assert) {
    await render(hbs`<div id="target">{{bs-tooltip title="Dummy" delay=150}}</div>`);

    triggerEvent('#target', 'mouseenter');

    await delay(100);
    assert.notOk(isVisible(this.element.querySelector('.tooltip')), '100ms: tooltip not faded in');
    triggerEvent('#target', 'mouseleave');

    await delay(100);
    assert.notOk(isVisible(this.element.querySelector('.tooltip')), '200ms: tooltip not faded in');
  });

  test('should not hide tooltip if leave event occurs and enter event occurs within the hide delay', async function(assert) {
    await render(hbs`<div id="target">{{bs-tooltip title="Dummy" delayShow=0 delayHide=150}}</div>`);
    triggerEvent('#target', 'mouseenter');

    await waitUntil(() => isVisible(this.element.querySelector('.tooltip')));
    triggerEvent('#target', 'mouseleave');

    await delay(100);
    assert.ok(isVisible(this.element.querySelector('.tooltip')), '100ms: tooltip still faded in');
    triggerEvent('#target', 'mouseenter');

    await delay(100);
    assert.ok(isVisible(this.element.querySelector('.tooltip')), '200ms: tooltip still faded in');
  });

  test('should not show tooltip if leave event occurs before delay expires', async function(assert) {
    await render(hbs`<div id="target">{{bs-tooltip title="Dummy" delay=150}}</div>`);
    triggerEvent('#target', 'mouseenter');

    await delay(100);
    assert.notOk(isVisible(this.element.querySelector('.tooltip')), '100ms: tooltip not faded in');
    triggerEvent('#target', 'mouseleave');

    await delay(100);
    assert.notOk(isVisible(this.element.querySelector('.tooltip')), '200ms: tooltip not faded in');
  });

  test('show pass along class attribute', async function(assert) {
    await render(hbs`<div id="target">{{bs-tooltip title="Dummy" class='wide' delay=150}}</div>`);
    await triggerEvent('#target', 'mouseenter');
    assert.dom('.tooltip.wide').exists({ count: 1 });
  });

  test('should position tooltip arrow centered', async function(assert) {
    let expectedArrowPosition = versionDependent(95, 94);
    await render(
      hbs`<div id="ember-bootstrap-wormhole"></div><div id="wrapper"><p style="margin-top: 200px"><button class="btn" id="target">Click me{{bs-tooltip placement="top" title="very very very very very very very long tooltip" fade=false}}</button></p></div>`
    );

    setupForPositioning();

    await click('#target');
    let arrowPosition = parseInt(this.element.querySelector(`.${tooltipArrowClass()}`).style.left, 10);
    assert.ok(Math.abs(arrowPosition - expectedArrowPosition) <= 1, `Expected position: ${expectedArrowPosition}, actual: ${arrowPosition}`);
  });

  test('should adjust tooltip arrow', async function(assert) {
    let expectedArrowPosition = versionDependent(155, 150);
    await render(
      hbs`<div id="ember-bootstrap-wormhole"></div><div id="wrapper"><p style="margin-top: 200px"><button class="btn" id="target">Click me{{bs-tooltip autoPlacement=true viewportSelector="#wrapper" placement="top" title="very very very very very very very long tooltip" fade=false}}</button></p></div>`
    );

    setupForPositioning('right');

    await click('#target');
    let arrowPosition = parseInt(this.element.querySelector(`.${tooltipArrowClass()}`).style.left, 10);
    assert.ok(Math.abs(arrowPosition - expectedArrowPosition) <= 1, `Expected position: ${expectedArrowPosition}, actual: ${arrowPosition}`);

    // check again to prevent regression of https://github.com/kaliber5/ember-bootstrap/issues/361
    await click('#target');
    await click('#target');
    arrowPosition = parseInt(this.element.querySelector(`.${tooltipArrowClass()}`).style.left, 10);
    assert.ok(Math.abs(arrowPosition - expectedArrowPosition) <= 1, `Expected position: ${expectedArrowPosition}, actual: ${arrowPosition}`);
  });

  test('should adjust placement if not fitting in viewport', async function(assert) {
    await render(
      hbs`<div id="ember-bootstrap-wormhole"></div><div id="wrapper"><p style="margin-top: 300px"><button class="btn" id="target">Click me{{bs-tooltip placement="bottom" autoPlacement=true title="very very very very very very very long tooltip" fade=false}}</button></p></div>`
    );

    setupForPositioning('right');
    await click('#target');
    await delay(50);

    assert.dom('.tooltip').hasClass(tooltipPositionClass('top'));
    assertPositioning(assert);
  });
});
