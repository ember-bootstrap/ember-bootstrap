import Component from '@ember/component';
import {
  find,
  findAll,
  click,
  focus,
  blur,
  triggerEvent
} from 'ember-native-dom-helpers';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  test,
  versionDependent,
  testRequiringFocus,
  visibilityClass,
  tooltipPositionClass,
  tooltipArrowClass
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

  test('it shows visible tooltip', async function(assert) {
    await render(hbs`{{bs-tooltip title="Dummy" visible=true}}`);

    assert.equal(findAll('.tooltip').length, 1, 'tooltip is visible');
    assert.equal(find('.tooltip .tooltip-inner').textContent.trim(), 'Dummy');
  });

  test('it shows visible tooltip with block content', async function(assert) {
    await render(hbs`{{#bs-tooltip visible=true}}
      BLOCK
      {{/bs-tooltip}}`);

    assert.equal(findAll('.tooltip').length, 1, 'tooltip is visible');
    assert.equal(find('.tooltip .tooltip-inner').textContent.trim(), 'BLOCK');
  });

  test('it hides invisible tooltip', async function(assert) {
    await render(hbs`{{bs-tooltip title="Dummy"}}`);

    assert.equal(findAll('.tooltip').length, 0, 'tooltip is not visible');
  });

  test('it shows and hides immediately when hovering [fade=false]', async function(assert) {
    await render(hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false}}</div>`);

    await triggerEvent('#target', 'mouseenter');
    assert.equal(findAll('.tooltip').length, 1, 'tooltip is visible');

    await triggerEvent('#target', 'mouseleave');
    assert.equal(findAll('.tooltip').length, 0, 'tooltip is not visible');
  });

  testRequiringFocus('it shows and hides immediately when focusing [fade=false]', async function(assert) {
    await render(hbs`<button class="btn" id="target">{{bs-tooltip title="Dummy" fade=false}}</button>`);

    await focus('#target');
    assert.equal(findAll('.tooltip').length, 1, 'tooltip is visible');

    await blur('#target');
    assert.equal(findAll('.tooltip').length, 0, 'tooltip is not visible');
  });

  test('it shows and hides immediately when clicking [fade=false]', async function(assert) {
    await render(hbs`<div id="target">{{bs-tooltip title="Dummy" fade=false triggerEvents="click"}}</div>`);

    await click('#target');
    assert.equal(findAll('.tooltip').length, 1, 'tooltip is visible');

    await click('#target');
    assert.equal(findAll('.tooltip').length, 0, 'tooltip is not visible');
  });

  test('it allows changing the trigger element to some arbitrary element', async function(assert) {
    await render(
      hbs`<div id="target"></div><div>{{bs-tooltip title="Dummy" fade=false triggerElement="#target"}}</div>`
    );

    await triggerEvent('#target', 'mouseenter');
    assert.equal(findAll('.tooltip').length, 1, 'tooltip is visible');

    await triggerEvent('#target', 'mouseleave');
    assert.equal(findAll('.tooltip').length, 0, 'tooltip is not visible');
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
    assert.equal(findAll('.tooltip').length, 1, 'tooltip is visible');

    await triggerEvent('#target', 'mouseleave');
    assert.equal(findAll('.tooltip').length, 0, 'tooltip is not visible');
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
    assert.equal(findAll('.tooltip').length, 0, 'tooltip is not visible');
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
    assert.equal(findAll('.tooltip').length, 1, 'tooltip is visible');
  });

  testRequiringFocus('it keeps showing when leaving the mouse but is still focused [fade=false]', async function(assert) {
    await render(hbs`<a href="#" id="target">{{bs-tooltip title="Dummy" fade=false}}</a>`);

    await focus('#target');
    assert.equal(findAll('.tooltip').length, 1, 'tooltip is visible');

    await triggerEvent('#target', 'mouseenter');
    assert.equal(findAll('.tooltip').length, 1, 'tooltip is visible');
    await triggerEvent('#target', 'mouseleave');
    assert.equal(findAll('.tooltip').length, 1, 'tooltip is visible');
  });

  test('Renders in wormhole if renderInPlace is not set', async function(assert) {
    this.set('show', false);
    await render(
      hbs`<div id="ember-bootstrap-wormhole"></div>{{#if show}}{{bs-tooltip title="Simple Tooltip" visible=true fade=false}}{{/if}}`
    );
    this.set('show', true);

    assert.equal(findAll('.tooltip').length, 1, 'Tooltip exists.');
    assert.equal(find('.tooltip').parentNode.getAttribute('id'), 'ember-bootstrap-wormhole');
  });

  test('Renders in place (no wormhole) if renderInPlace is set', async function(assert) {
    this.set('show', false);
    await render(
      hbs`<div id="ember-bootstrap-wormhole"></div>{{#if show}}{{bs-tooltip title="Simple Tooltip" visible=true fade=false renderInPlace=true}}{{/if}}`
    );
    this.set('show', true);

    assert.equal(findAll('.tooltip').length, 1, 'Tooltip exists.');
    assert.notEqual(find('.tooltip').parentNode.getAttribute('id'), 'ember-bootstrap-wormhole');
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
    assert.expect(2);
    let done = assert.async();
    await render(
      hbs`<div id="wrapper">{{#if visible}}<p style="margin-top: 200px"><a href="#" id="target">Hover me{{bs-tooltip title="very very very very very very very long tooltip" fade=false visible=true}}</a></p>{{/if}}</div>`
    );

    setupForPositioning();
    this.set('visible', true);
    setTimeout(function() {
      assertPositioning(assert);
      done();
    }, 1);
  });

  test('should place tooltip on top of element if visible is set to true', async function(assert) {
    assert.expect(2);
    let done = assert.async();
    this.set('visible', false);
    await render(
      hbs`<div id="wrapper"><p style="margin-top: 200px"><a href="#" id="target">Hover me{{bs-tooltip title="very very very very very very very long tooltip" fade=false visible=visible}}</a></p></div>`
    );

    setupForPositioning();

    this.set('visible', true);
    setTimeout(function() {
      assertPositioning(assert);
      done();
    }, 1);
  });

  test('should show tooltip if leave event hasn\'t occurred before delay expires', async function(assert) {
    assert.expect(2);
    let done = assert.async();

    await render(hbs`<div id="target">{{bs-tooltip title="Dummy" delay=150}}</div>`);

    setTimeout(function() {
      assert.notOk(isVisible(find('.tooltip')), '100ms: tooltip is not faded in');
    }, 100);

    setTimeout(function() {
      assert.ok(isVisible(find('.tooltip')), '200ms: tooltip is faded in');
      done();
    }, 200);

    triggerEvent('#target', 'mouseenter');
  });

  test('should not show tooltip if leave event occurs before delay expires', async function(assert) {
    assert.expect(2);
    let done = assert.async();

    await render(hbs`<div id="target">{{bs-tooltip title="Dummy" delay=150}}</div>`);

    setTimeout(function() {
      assert.notOk(isVisible(find('.tooltip')), '100ms: tooltip not faded in');
      triggerEvent('#target', 'mouseleave');
    }, 100);

    setTimeout(function() {
      assert.notOk(isVisible(find('.tooltip')), '200ms: tooltip not faded in');
      done();
    }, 200);

    triggerEvent('#target', 'mouseenter');
  });

  test('should not hide tooltip if leave event occurs and enter event occurs within the hide delay', async function(assert) {
    assert.expect(3);
    let done = assert.async();

    await render(hbs`<div id="target">{{bs-tooltip title="Dummy" delayShow=0 delayHide=150}}</div>`);

    setTimeout(function() {
      assert.ok(isVisible(find('.tooltip')), '1ms: tooltip faded in');
      triggerEvent('#target', 'mouseleave');

      setTimeout(function() {
        assert.ok(isVisible(find('.tooltip')), '100ms: tooltip still faded in');
        triggerEvent('#target', 'mouseenter');
      }, 100);

      setTimeout(function() {
        assert.ok(isVisible(find('.tooltip')), '200ms: tooltip still faded in');
        done();
      }, 200);
    }, 0);

    triggerEvent('#target', 'mouseenter');
  });

  test('should not show tooltip if leave event occurs before delay expires', async function(assert) {
    assert.expect(2);
    let done = assert.async();

    await render(hbs`<div id="target">{{bs-tooltip title="Dummy" delay=150}}</div>`);

    setTimeout(function() {
      assert.notOk(isVisible(find('.tooltip')), '100ms: tooltip not faded in');
      triggerEvent('#target', 'mouseleave');
    }, 100);

    setTimeout(function() {
      assert.notOk(isVisible(find('.tooltip')), '200ms: tooltip not faded in');
      done();
    }, 200);

    triggerEvent('#target', 'mouseenter');
  });

  test('show pass along class attribute', async function(assert) {
    assert.expect(1);
    let done = assert.async();

    await render(hbs`<div id="target">{{bs-tooltip title="Dummy" class='wide' delay=150}}</div>`);
    setTimeout(function() {
      assert.equal(findAll('.tooltip.wide').length, 1);
      done();
    }, 200);

    triggerEvent('#target', 'mouseenter');
  });

  test('should position tooltip arrow centered', async function(assert) {
    let expectedArrowPosition = versionDependent(95, 98);
    await render(
      hbs`<div id="ember-bootstrap-wormhole"></div><div id="wrapper"><p style="margin-top: 200px"><button class="btn" id="target">Click me{{bs-tooltip placement="top" title="very very very very very very very long popover" fade=false}}</button></p></div>`
    );

    setupForPositioning();

    await click('#target');
    let arrowPosition = parseInt(find(`.${tooltipArrowClass()}`).style.left, 10);
    assert.ok(Math.abs(arrowPosition - expectedArrowPosition) <= 1, `Expected position: ${expectedArrowPosition}, actual: ${arrowPosition}`);
  });

  test('should adjust tooltip arrow', async function(assert) {
    let expectedArrowPosition = versionDependent(155, 154);
    await render(
      hbs`<div id="ember-bootstrap-wormhole"></div><div id="wrapper"><p style="margin-top: 200px"><button class="btn" id="target">Click me{{bs-tooltip autoPlacement=true viewportSelector="#wrapper" placement="top" title="very very very very very very very long popover" fade=false}}</button></p></div>`
    );

    setupForPositioning('right');

    await click('#target');
    let arrowPosition = parseInt(find(`.${tooltipArrowClass()}`).style.left, 10);
    assert.ok(Math.abs(arrowPosition - expectedArrowPosition) <= 1, `Expected position: ${expectedArrowPosition}, actual: ${arrowPosition}`);

    // check again to prevent regression of https://github.com/kaliber5/ember-bootstrap/issues/361
    await click('#target');
    await click('#target');
    arrowPosition = parseInt(find(`.${tooltipArrowClass()}`).style.left, 10);
    assert.ok(Math.abs(arrowPosition - expectedArrowPosition) <= 1, `Expected position: ${expectedArrowPosition}, actual: ${arrowPosition}`);
  });

  test('should adjust placement if not fitting in viewport', async function(assert) {
    let done = assert.async();
    await render(
      hbs`<div id="ember-bootstrap-wormhole"></div><div id="wrapper"><p style="margin-top: 300px"><button class="btn" id="target">Click me{{bs-tooltip placement="bottom" autoPlacement=true title="very very very very very very very long popover" fade=false}}</button></p></div>`
    );

    setupForPositioning('right');
    await click('#target');

    assert.ok(find('.tooltip').classList.contains(tooltipPositionClass('top')));

    setTimeout(function() {
      assertPositioning(assert);
      done();
    }, 50);
  });
});
