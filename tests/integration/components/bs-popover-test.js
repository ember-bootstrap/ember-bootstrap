import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  popoverArrowClass,
  popoverPositionClass,
  test,
  versionDependent,
  visibilityClass,
} from '../../helpers/bootstrap';
import {
  assertPositioning,
  setupForPositioning,
} from '../../helpers/contextual-help';
import setupStylesheetSupport from '../../helpers/setup-stylesheet-support';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import sinon from 'sinon';

module('Integration | Component | bs-popover', function (hooks) {
  setupRenderingTest(hooks);
  setupStylesheetSupport(hooks);
  setupNoDeprecations(hooks);

  test('it has correct markup', async function (assert) {
    // Template block usage:
    await render(hbs`<BsPopover
  @id='popover-element'
  @fade={{true}}
  @title='dummy title'
  @visible={{true}}
  class='wide'
>
  template block text
</BsPopover>`);

    assert.dom('.popover').exists({ count: 1 }, 'has popover class');
    assert
      .dom('.popover.wide')
      .exists({ count: 1 }, 'it passes along class attribute');
    assert.dom('.popover').hasClass('fade', 'has fade class');
    assert.dom('.popover').hasClass(visibilityClass(), 'has visibility class');
    assert.equal(
      this.element.querySelector('.popover').getAttribute('role'),
      'tooltip',
      'has ARIA role',
    );
    assert.dom(`.${popoverArrowClass()}`).exists({ count: 1 }, 'has arrow');
    assert
      .dom(versionDependent('.popover-header'))
      .hasText('dummy title', 'shows title');
    assert
      .dom(versionDependent('.popover-body'))
      .hasText('template block text', 'shows content');
  });

  skip('it supports different placements', async function (assert) {
    this.insertCSSRule('#wrapper { margin: 200px }');

    let placements = ['top', 'left', 'bottom', 'right'];
    this.set('placement', placements[0]);
    await render(hbs`<div id='wrapper'>
  <BsPopover::Element
    @id='popover-element'
    @placement={{this.placement}}
    @title='dummy title'
  >
    template block text
  </BsPopover::Element>
</div>`);

    for (let placement of placements) {
      this.set('placement', placement);
      let placementClass = popoverPositionClass(placement);
      assert
        .dom('.popover')
        .hasClass(placementClass, `has ${placementClass} class`);
    }
  });

  test('should place popover on top of element', async function (assert) {
    this.insertCSSRule('#wrapper p { margin-top: 200px }');

    await render(hbs`<div id='ember-bootstrap-wormhole'></div>
<div id='wrapper'>
  <p>
    <button type='button' class='btn' id='target'>
      Click me<BsPopover
        @placement='top'
        @title='very very very very very very very long popover'
        @fade={{false}}
      >very very very very very very very long popover</BsPopover>
    </button>
  </p>
</div>`);

    setupForPositioning();

    await click('#target');

    assertPositioning(assert, '.popover', 8);
  });

  test('should adjust popover arrow', async function (assert) {
    this.insertCSSRule('#wrapper p { margin-top: 200px }');
    this.insertCSSRule('#target { width: 100px; padding: 0; border: none; }');

    let expectedArrowPosition = 217;

    await render(hbs`<div id='ember-bootstrap-wormhole'></div>
<div id='wrapper'>
  <p>
    <button type='button' id='target'>
      Click me<BsPopover
        @placement='top'
        @autoPlacement={{true}}
        @viewportSelector='#wrapper'
        @title='very very very very very very very long popover'
        @fade={{false}}
      >very very very very very very very long popover</BsPopover>
    </button>
  </p>
</div>`);

    setupForPositioning('right');

    await click('#target');
    let arrowPosition = parseInt(
      this.element
        .querySelector(`.${popoverArrowClass()}`)
        .style.transform.match(/translate(?:3d)?\(([0-9]+)px.*\)/)[1],
      10,
    );
    assert.ok(
      Math.abs(arrowPosition - expectedArrowPosition) <= 2,
      `Expected position: ${expectedArrowPosition}, actual: ${arrowPosition}`,
    );

    // check again to prevent regression of https://github.com/kaliber5/ember-bootstrap/issues/361
    await click('#target');
    await click('#target');
    arrowPosition = parseInt(
      this.element
        .querySelector(`.${popoverArrowClass()}`)
        .style.transform.match(/translate(?:3d)?\(([0-9]+)px.*\)/)[1],
      10,
    );
    assert.ok(
      Math.abs(arrowPosition - expectedArrowPosition) <= 2,
      `Expected position: ${expectedArrowPosition}, actual: ${arrowPosition}`,
    );
  });

  test('it stays open when clicked when rendered in place', async function (assert) {
    await render(hbs`<div id='target'>
  <BsPopover>
    <div id='content'>Content</div>
  </BsPopover>
</div>`);

    await click('#target');
    assert.dom('.popover').exists('popover is visible');
    await click('#content');
    assert.dom('.popover').exists('popover is still visible');
  });

  test('it yields close action', async function (assert) {
    let hideAction = sinon.spy();
    this.set('hide', hideAction);
    let hiddenAction = sinon.spy();
    this.set('hidden', hiddenAction);
    await render(hbs`<div id='target'>
  <BsPopover
    @visible={{true}}
    @onHide={{action this.hide}}
    @onHidden={{action this.hidden}}
    as |po|
  >
    <div id='hide' {{action po.close}} role='button'>Hide</div>
  </BsPopover>
</div>`);
    await click('#hide');
    assert.ok(hideAction.calledOnce, 'hide action has been called');
    assert.ok(hiddenAction.calledOnce, 'hidden action was called');
    assert.dom('.popover').doesNotExist('popover is not visible');
  });

  test('click-initiated close action does not interfere with click-to-open', async function (assert) {
    await render(hbs`<div id='target'>
  <BsPopover as |po|>
    <div id='hide' onclick={{action po.close}} role='button'>Hide</div>
  </BsPopover>
</div>`);
    await click('#target');
    assert.dom('.popover').exists('popover is visible');
    await click('#hide');
    assert.dom('.popover').doesNotExist('popover is not visible');
    await click('#target');
    assert.dom('.popover').exists('popover visible again');
  });

  test('click-initiated close action does not interfere with click-to-open when wormholed', async function (assert) {
    await render(hbs`<div id='ember-bootstrap-wormhole'></div>
<div id='target'>
  <BsPopover as |po|><div
      id='hide'
      onclick={{action po.close}}
      role='button'
    >Hide</div></BsPopover>
</div>`);
    await click('#target');
    assert.dom('.popover').exists('popover is visible');
    await click('#hide');
    assert.dom('.popover').doesNotExist('popover is not visible');
    await click('#target');
    assert.dom('.popover').exists('popover visible again');
  });

  test('non-click-initiated close action does not interfere with click-to-open', async function (assert) {
    await render(
      hbs`<div id='target'><BsPopover as |po|><input
      id='hide'
      onblur={{action po.close}}
    /></BsPopover></div>`,
    );
    await click('#target');
    assert.dom('.popover').exists('popover is visible');
    await triggerEvent('#hide', 'blur');
    assert.dom('.popover').doesNotExist('popover is not visible');
    await click('#target');
    assert.dom('.popover').exists('popover visible again');
  });

  test('non-click-initiated close action does not interfere with click-to-open when wormholed', async function (assert) {
    await render(
      hbs`<div id='ember-bootstrap-wormhole'></div><div id='target'><BsPopover
    as |po|
  ><input id='hide' onblur={{action po.close}} /></BsPopover></div>`,
    );
    await click('#target');
    assert.dom('.popover').exists('popover is visible');
    await triggerEvent('#hide', 'blur');
    assert.dom('.popover').doesNotExist('popover is not visible');
    await click('#target');
    assert.dom('.popover').exists('popover visible again');
  });

  test('it passes all HTML attribute', async function (assert) {
    await render(
      hbs`<div id='target'><BsPopover
    @title='Dummy'
    class='wide'
    data-test
    role='foo'
  >test</BsPopover></div>`,
    );
    await click('#target');
    assert.dom('.popover').hasClass('wide');
    assert.dom('.popover').hasAttribute('role', 'foo');
    assert.dom('.popover').hasAttribute('data-test');
  });

  test("Renders in wormhole's default destination if renderInPlace is not set", async function (assert) {
    this.set('show', false);
    await render(
      hbs`<div id='ember-bootstrap-wormhole'></div>{{#if this.show}}<BsPopover
    @title='Simple popover'
    @visible={{true}}
    @fade={{false}}
  />{{/if}}`,
    );
    this.set('show', true);
    await settled();

    assert
      .dom('#ember-bootstrap-wormhole .popover')
      .exists({ count: 1 }, 'Popover exists in wormhole');
  });

  test('Renders in test container if renderInPlace is not set', async function (assert) {
    this.set('show', false);
    await render(
      hbs`{{#if this.show}}<BsPopover
    @title='Simple popover'
    @visible={{true}}
    @fade={{false}}
  />{{/if}}`,
    );
    this.set('show', true);
    await settled();

    assert.dom('.popover').exists({ count: 1 }, 'Popover exists.');
    assert.dom('#wrapper .popover').doesNotExist();
  });

  test('Renders in place (no wormhole) if renderInPlace is set', async function (assert) {
    this.set('show', false);
    await render(
      hbs`<div id='ember-bootstrap-wormhole'></div><div id='wrapper'>{{#if
    this.show
  }}<BsPopover
      @title='Simple popover'
      @visible={{true}}
      @fade={{false}}
      @renderInPlace={{true}}
    />{{/if}}</div>`,
    );
    this.set('show', true);
    await settled();

    assert
      .dom('#wrapper .popover')
      .exists({ count: 1 }, 'Popover exists in place.');
  });

  test('it calls onShow/onShown actions when showing popover by event [fade=false]', async function (assert) {
    let showAction = sinon.spy();
    this.set('show', showAction);
    let shownAction = sinon.spy();
    this.set('shown', shownAction);
    await render(
      hbs`<div id='target'><BsPopover
    @title='Dummy'
    @fade={{false}}
    @onShow={{this.show}}
    @onShown={{this.shown}}
  /></div>`,
    );
    await click('#target');
    assert.ok(showAction.calledOnce, 'show action has been called');
    assert.ok(shownAction.calledOnce, 'shown action has been called');
  });

  test('it calls onShow/onShown actions when showing popover programmatically [fade=false]', async function (assert) {
    let showAction = sinon.spy();
    this.set('show', showAction);
    let shownAction = sinon.spy();
    this.set('shown', shownAction);
    this.set('visible', false);
    await render(
      hbs`<div id='target'><BsPopover
    @title='Dummy'
    @visible={{this.visible}}
    @fade={{false}}
    @onShow={{this.show}}
    @onShown={{this.shown}}
  /></div>`,
    );
    this.set('visible', true);
    await settled();
    assert.ok(showAction.calledOnce, 'show action has been called');
    assert.ok(shownAction.calledOnce, 'shown action has been called');
  });

  test('it aborts showing if onShow action returns false', async function (assert) {
    let showAction = sinon.stub();
    showAction.returns(false);
    this.set('show', showAction);
    let shownAction = sinon.spy();
    this.set('shown', shownAction);
    await render(
      hbs`<div id='target'><BsPopover
    @title='Dummy'
    @fade={{false}}
    @onShow={{this.show}}
    @onShown={{this.shown}}
  /></div>`,
    );
    await click('#target');
    assert.ok(showAction.calledOnce, 'show action has been called');
    assert.ok(shownAction.notCalled, 'show action has not been called');
    assert.dom('.popover').doesNotExist('popover is not visible');
  });

  test('it calls onHide/onHidden actions when hiding popover by event [fade=false]', async function (assert) {
    let hideAction = sinon.spy();
    this.set('hide', hideAction);
    let hiddenAction = sinon.spy();
    this.set('hidden', hiddenAction);
    await render(
      hbs`<div id='target'><BsPopover
    @title='Dummy'
    @fade={{false}}
    @onHide={{this.hide}}
    @onHidden={{this.hidden}}
  /></div>`,
    );
    await click('#target');
    await click('#target');
    assert.ok(hideAction.calledOnce, 'hide action has been called');
    assert.ok(hiddenAction.calledOnce, 'hidden action was called');
  });

  test('it calls onHide/onHidden actions when hiding popover programmatically [fade=false]', async function (assert) {
    let hideAction = sinon.spy();
    this.set('hide', hideAction);
    let hiddenAction = sinon.spy();
    this.set('hidden', hiddenAction);
    this.set('visible', true);
    await render(
      hbs`<div id='target'><BsPopover
    @visible={{this.visible}}
    @title='Dummy'
    @fade={{false}}
    @onHide={{this.hide}}
    @onHidden={{this.hidden}}
  /></div>`,
    );
    this.set('visible', false);
    await settled();
    assert.ok(hideAction.calledOnce, 'hide action has been called');
    assert.ok(hiddenAction.calledOnce, 'hidden action was called');
  });

  test('it aborts hiding if onHide action returns false', async function (assert) {
    let hideAction = sinon.stub();
    hideAction.returns(false);
    this.set('hide', hideAction);
    let hiddenAction = sinon.spy();
    this.set('hidden', hiddenAction);
    await render(
      hbs`<div id='target'><BsPopover
    @title='Dummy'
    @fade={{false}}
    @onHide={{this.hide}}
    @onHidden={{this.hidden}}
  /></div>`,
    );
    await click('#target');
    await click('#target');
    assert.ok(hideAction.calledOnce, 'hide action has been called');
    assert.ok(hiddenAction.notCalled, 'hidden action has not been called');
    assert.dom('.popover').exists({ count: 1 }, 'popover is visible');
  });

  test('it passes accessibility checks', async function (assert) {
    await render(hbs`<button type='button'>
  Test
  <BsPopover @title='dummy title' @visible={{true}}>
    template block text
  </BsPopover>
</button>`);

    await a11yAudit();
    assert.ok(true, 'A11y audit passed');
  });
});
