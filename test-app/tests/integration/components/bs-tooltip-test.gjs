import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  blur,
  click,
  focus,
  render,
  settled,
  triggerEvent,
  waitUntil,
} from '@ember/test-helpers';
import {
  delay,
  test,
  testRequiringFocus,
  tooltipArrowClass,
  tooltipPositionClass,
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
import BsTooltip from 'ember-bootstrap/components/bs-tooltip';
import BsTooltipElement from 'ember-bootstrap/components/bs-tooltip/element';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

module('Integration | Component | bs-tooltip', function (hooks) {
  setupRenderingTest(hooks);
  setupStylesheetSupport(hooks);
  setupNoDeprecations(hooks);

  function isVisible(tt) {
    return (
      tt &&
      tt.classList.contains('fade') &&
      tt.classList.contains(visibilityClass())
    );
  }

  test('it has correct markup', async function (assert) {
    // Template block usage:
    await render(
      <template>
        <BsTooltip @id='tooltip-element' @fade={{true}} @visible={{true}}>
          template block text
        </BsTooltip>
      </template>,
    );

    assert.dom('.tooltip').exists({ count: 1 }, 'has tooltip class');
    // assert.ok(find('.tooltip').classList.contains(tooltipPositionClass('top')), 'has placement class');
    assert.dom('.tooltip').hasClass('fade', 'has fade class');
    assert.dom('.tooltip').hasClass(visibilityClass(), 'has visibility class');
    assert.equal(
      this.element.querySelector('.tooltip').getAttribute('role'),
      'tooltip',
      'has ARIA role',
    );
    assert.dom(`.${tooltipArrowClass()}`).exists({ count: 1 }, 'has arrow');
    assert.dom('.tooltip-inner').hasText('template block text', 'shows title');
  });

  skip('it supports different placements', async function (assert) {
    let placements = ['top', 'left', 'bottom', 'right'];
    class State {
      @tracked placement = placements[0];
    }
    const state = new State();
    await render(
      <template>
        <BsTooltipElement @id='tooltip-element' @placement={{state.placement}}>
          template block text
        </BsTooltipElement>
      </template>,
    );
    placements.forEach((placement) => {
      state.placement = placement;
      let placementClass = tooltipPositionClass(placement);
      assert
        .dom('.tooltip')
        .hasClass(placementClass, `has ${placementClass} class`);
    });
  });

  test('it shows visible tooltip', async function (assert) {
    await render(
      <template><BsTooltip @title='Dummy' @visible={{true}} /></template>,
    );

    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');
    assert.dom('.tooltip .tooltip-inner').hasText('Dummy');
  });

  test('it shows visible tooltip with block content', async function (assert) {
    await render(
      <template>
        <BsTooltip @visible={{true}}>
          BLOCK
        </BsTooltip>
      </template>,
    );

    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');
    assert.dom('.tooltip .tooltip-inner').hasText('BLOCK');
  });

  test('it hides invisible tooltip', async function (assert) {
    await render(<template><BsTooltip @title='Dummy' /></template>);

    assert.dom('.tooltip').doesNotExist('tooltip is not visible');
  });

  test('it shows and hides immediately when hovering [fade=false]', async function (assert) {
    await render(
      <template>
        <div id='target'><BsTooltip @title='Dummy' @fade={{false}} /></div>
      </template>,
    );

    await triggerEvent('#target', 'mouseenter');
    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');

    await triggerEvent('#target', 'mouseleave');
    assert.dom('.tooltip').doesNotExist('tooltip is not visible');
  });

  testRequiringFocus(
    'it shows and hides immediately when focusing [fade=false]',
    async function (assert) {
      await render(
        <template>
          <button type='button' class='btn' id='target'><BsTooltip
              @title='Dummy'
              @fade={{false}}
            /></button>
        </template>,
      );

      await focus('#target');
      assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');

      await blur('#target');
      assert.dom('.tooltip').doesNotExist('tooltip is not visible');
    },
  );

  test('it shows and hides immediately when clicking [fade=false]', async function (assert) {
    await render(
      <template>
        <div id='target'><BsTooltip
            @title='Dummy'
            @fade={{false}}
            @triggerEvents='click'
          /></div>
      </template>,
    );

    await click('#target');
    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');

    await click('#target');
    assert.dom('.tooltip').doesNotExist('tooltip is not visible');
  });

  test('it allows changing the trigger element to some arbitrary element', async function (assert) {
    await render(
      <template>
        <div id='target'></div><div><BsTooltip
            @title='Dummy'
            @fade={{false}}
            @triggerElement='#target'
          /></div>
      </template>,
    );

    await triggerEvent('#target', 'mouseenter');
    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');

    await triggerEvent('#target', 'mouseleave');
    assert.dom('.tooltip').doesNotExist('tooltip is not visible');
  });

  test('trigger element can be rendered later in dom order than its tooltip', async function (assert) {
    await render(
      <template>
        <div><BsTooltip
            @title='Dummy'
            @fade={{false}}
            @triggerElement='#target'
          /></div><div id='target'></div>
      </template>,
    );

    await triggerEvent('#target', 'mouseenter');
    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');

    await triggerEvent('#target', 'mouseleave');
    assert.dom('.tooltip').doesNotExist('tooltip is not visible');
  });

  test('it calls onShow/onShown actions when showing tooltip by event [fade=false]', async function (assert) {
    const showAction = sinon.spy();
    const shownAction = sinon.spy();
    await render(
      <template>
        <div id='target'><BsTooltip
            @title='Dummy'
            @fade={{false}}
            @onShow={{showAction}}
            @onShown={{shownAction}}
          /></div>
      </template>,
    );
    await triggerEvent('#target', 'mouseenter');
    assert.ok(showAction.calledOnce, 'show action has been called');
    assert.ok(shownAction.calledOnce, 'shown action has been called');
  });

  test('it calls onShow/onShown actions when showing tooltip programmatically [fade=false]', async function (assert) {
    class State {
      @tracked visible = false;
    }
    const state = new State();
    const showAction = sinon.spy();
    const shownAction = sinon.spy();
    await render(
      <template>
        <div id='target'><BsTooltip
            @title='Dummy'
            @visible={{state.visible}}
            @fade={{false}}
            @onShow={{showAction}}
            @onShown={{shownAction}}
          /></div>
      </template>,
    );
    state.visible = true;
    await settled();
    assert.ok(showAction.calledOnce, 'show action has been called');
    assert.ok(shownAction.calledOnce, 'shown action has been called');
  });

  test('it aborts showing if onShow action returns false', async function (assert) {
    const showAction = sinon.stub().returns(false);
    const shownAction = sinon.spy();
    await render(
      <template>
        <div id='target'><BsTooltip
            @title='Dummy'
            @fade={{false}}
            @onShow={{showAction}}
            @onShown={{shownAction}}
          /></div>
      </template>,
    );
    await triggerEvent('#target', 'mouseenter');
    assert.ok(showAction.calledOnce, 'show action has been called');
    assert.notOk(shownAction.calledOnce, 'show action has not been called');
    assert.dom('.tooltip').doesNotExist('tooltip is not visible');
  });

  test('it calls onHide/onHidden actions when hiding tooltip by event [fade=false]', async function (assert) {
    const hideAction = sinon.spy();
    const hiddenAction = sinon.spy();
    await render(
      <template>
        <div id='target'><BsTooltip
            @title='Dummy'
            @fade={{false}}
            @onHide={{hideAction}}
            @onHidden={{hiddenAction}}
          /></div>
      </template>,
    );
    await triggerEvent('#target', 'mouseenter');
    await triggerEvent('#target', 'mouseleave');
    assert.ok(hideAction.calledOnce, 'hide action has been called');
    assert.ok(hiddenAction.calledOnce, 'hidden action was called');
  });

  test('it calls onHide/onHidden actions when hiding tooltip programmatically [fade=false]', async function (assert) {
    class State {
      @tracked visible = true;
    }
    const state = new State();
    const hideAction = sinon.spy();
    const hiddenAction = sinon.spy();
    await render(
      <template>
        <div id='target'><BsTooltip
            @visible={{state.visible}}
            @title='Dummy'
            @fade={{false}}
            @onHide={{hideAction}}
            @onHidden={{hiddenAction}}
          /></div>
      </template>,
    );
    state.visible = false;
    await settled();
    assert.ok(hideAction.calledOnce, 'hide action has been called');
    assert.ok(hiddenAction.calledOnce, 'hidden action was called');
  });

  test('it aborts hiding if onHide action returns false', async function (assert) {
    const hideAction = sinon.stub().returns(false);
    const hiddenAction = sinon.spy();
    await render(
      <template>
        <div id='target'><BsTooltip
            @title='Dummy'
            @fade={{false}}
            @onHide={{hideAction}}
            @onHidden={{hiddenAction}}
          /></div>
      </template>,
    );
    await triggerEvent('#target', 'mouseenter');
    await triggerEvent('#target', 'mouseleave');
    assert.ok(hideAction.calledOnce, 'hide action has been called');
    assert.notOk(hiddenAction.calledOnce, 'hidden action has not been called');
    assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');
  });

  testRequiringFocus(
    'it keeps showing when leaving the mouse but is still focused [fade=false]',
    async function (assert) {
      await render(
        <template>
          <a href='#' id='target'><BsTooltip
              @title='Dummy'
              @fade={{false}}
            /></a>
        </template>,
      );

      await focus('#target');
      assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');

      await triggerEvent('#target', 'mouseenter');
      assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');
      await triggerEvent('#target', 'mouseleave');
      assert.dom('.tooltip').exists({ count: 1 }, 'tooltip is visible');
    },
  );

  test("Renders in wormhole's default destination if renderInPlace is not set", async function (assert) {
    class State {
      @tracked show = false;
    }
    const state = new State();
    await render(
      <template>
        <div id='ember-bootstrap-wormhole'></div>{{#if state.show}}<BsTooltip
            @title='Simple Tooltip'
            @visible={{true}}
            @fade={{false}}
          />{{/if}}
      </template>,
    );
    state.show = true;
    await settled();

    assert
      .dom('#ember-bootstrap-wormhole .tooltip')
      .exists({ count: 1 }, 'Tooltip exists in wormhole');
  });

  test('Renders in test container if renderInPlace is not set', async function (assert) {
    class State {
      @tracked show = false;
    }
    const state = new State();
    await render(
      <template>
        {{#if state.show}}<BsTooltip
            @title='Simple Tooltip'
            @visible={{true}}
            @fade={{false}}
          />{{/if}}
      </template>,
    );
    state.show = true;
    await settled();

    assert.dom('.tooltip').exists({ count: 1 }, 'Tooltip exists.');
    assert.dom('#wrapper .tooltip').doesNotExist();
  });

  test('Renders in place (no wormhole) if renderInPlace is set', async function (assert) {
    class State {
      @tracked show = false;
    }
    const state = new State();
    await render(
      <template>
        <div id='ember-bootstrap-wormhole'></div><div id='wrapper'>{{#if
            state.show
          }}<BsTooltip
              @title='Simple Tooltip'
              @visible={{true}}
              @fade={{false}}
              @renderInPlace={{true}}
            />{{/if}}</div>
      </template>,
    );
    state.show = true;
    await settled();

    assert
      .dom('#wrapper .tooltip')
      .exists({ count: 1 }, 'Tooltip exists in place.');
  });

  test('should place tooltip on top of element', async function (assert) {
    this.insertCSSRule('.margin-top { margin-top: 200px; }');

    await render(
      <template>
        <div id='wrapper'>
          <p class='margin-top'>
            <a href='#' id='target'>
              Hover me<BsTooltip
                @title='very very very very very very very long tooltip'
                @fade={{false}}
              />
            </a>
          </p>
        </div>
      </template>,
    );

    setupForPositioning();

    await triggerEvent('#target', 'mouseenter');
    assertPositioning(assert, '.tooltip', 6);
  });

  test('should place tooltip on top of element if already visible', async function (assert) {
    this.insertCSSRule('.margin-top { margin-top: 200px; }');

    class State {
      @tracked visible;
    }
    const state = new State();

    await render(
      <template>
        <div id='wrapper'>
          {{#if state.visible}}
            <p class='margin-top'>
              <a href='#' id='target'>
                Hover me<BsTooltip
                  @title='very very very very very very very long tooltip'
                  @fade={{false}}
                  @visible={{true}}
                />
              </a>
            </p>
          {{/if}}
        </div>
      </template>,
    );

    setupForPositioning();
    state.visible = true;
    await settled();
    assertPositioning(assert, '.tooltip', 6);
  });

  test('should place tooltip on top of element if visible is set to true', async function (assert) {
    this.insertCSSRule('.margin-top { margin-top: 200px; }');

    class State {
      @tracked visible = false;
    }
    const state = new State();

    await render(
      <template>
        <div id='wrapper'>
          <p class='margin-top'>
            <a href='#' id='target'>
              Hover me<BsTooltip
                @title='very very very very very very very long tooltip'
                @fade={{false}}
                @visible={{state.visible}}
              />
            </a>
          </p>
        </div>
      </template>,
    );

    setupForPositioning();

    state.visible = true;
    await settled();
    assertPositioning(assert, '.tooltip', 6);
  });

  test("should show tooltip if leave event hasn't occurred before delay expires", async function (assert) {
    await render(
      <template>
        <div id='target'><BsTooltip @title='Dummy' @delay={{150}} /></div>
      </template>,
    );

    triggerEvent('#target', 'mouseenter');

    await delay(100);
    assert.notOk(
      isVisible(this.element.querySelector('.tooltip')),
      '100ms: tooltip is not faded in',
    );

    await delay(100);
    assert.ok(
      isVisible(this.element.querySelector('.tooltip')),
      '200ms: tooltip is faded in',
    );
  });

  test('should not show tooltip if leave event occurs before delay expires', async function (assert) {
    await render(
      <template>
        <div id='target'><BsTooltip @title='Dummy' @delay={{150}} /></div>
      </template>,
    );

    triggerEvent('#target', 'mouseenter');

    await delay(100);
    assert.notOk(
      isVisible(this.element.querySelector('.tooltip')),
      '100ms: tooltip not faded in',
    );
    triggerEvent('#target', 'mouseleave');

    await delay(100);
    assert.notOk(
      isVisible(this.element.querySelector('.tooltip')),
      '200ms: tooltip not faded in',
    );
  });

  test('should not hide tooltip if leave event occurs and enter event occurs within the hide delay', async function (assert) {
    await render(
      <template>
        <div id='target'><BsTooltip
            @title='Dummy'
            @delayShow={{0}}
            @delayHide={{150}}
          /></div>
      </template>,
    );
    triggerEvent('#target', 'mouseenter');

    await waitUntil(() => isVisible(this.element.querySelector('.tooltip')));
    triggerEvent('#target', 'mouseleave');

    await delay(100);
    assert.ok(
      isVisible(this.element.querySelector('.tooltip')),
      '100ms: tooltip still faded in',
    );
    triggerEvent('#target', 'mouseenter');

    await delay(100);
    assert.ok(
      isVisible(this.element.querySelector('.tooltip')),
      '200ms: tooltip still faded in',
    );
  });

  test('should not show tooltip if leave event occurs before delay expires', async function (assert) {
    await render(
      <template>
        <div id='target'><BsTooltip @title='Dummy' @delay={{150}} /></div>
      </template>,
    );
    triggerEvent('#target', 'mouseenter');

    await delay(100);
    assert.notOk(
      isVisible(this.element.querySelector('.tooltip')),
      '100ms: tooltip not faded in',
    );
    triggerEvent('#target', 'mouseleave');

    await delay(100);
    assert.notOk(
      isVisible(this.element.querySelector('.tooltip')),
      '200ms: tooltip not faded in',
    );
  });

  test('should position tooltip arrow centered', async function (assert) {
    this.insertCSSRule('.margin-top { margin-top: 200px; }');

    let expectedArrowPosition = 94;
    await render(
      <template>
        <div id='ember-bootstrap-wormhole'></div>
        <div id='wrapper'>
          <p class='margin-top'>
            <button type='button' class='btn' id='target'>
              Click me<BsTooltip
                @placement='top'
                @title='very very very very very very very long tooltip'
                @fade={{false}}
              />
            </button>
          </p>
        </div>
      </template>,
    );

    setupForPositioning();

    await click('#target');
    let arrowPosition = parseInt(
      this.element
        .querySelector(`.${tooltipArrowClass()}`)
        .style.transform.match(/translate(?:3d)?\(([0-9.]+)px.*\)/)[1],
      10,
    );
    assert.ok(
      Math.abs(arrowPosition - expectedArrowPosition) <= 1,
      `Expected position: ${expectedArrowPosition}, actual: ${arrowPosition}`,
    );
  });

  test('should adjust tooltip arrow', async function (assert) {
    this.insertCSSRule('.margin-top { margin-top: 200px; }');
    this.insertCSSRule('#target { width: 100px; padding: 0; border: none; }');

    let expectedArrowPosition = 144;

    await render(
      <template>
        <div id='ember-bootstrap-wormhole'></div>
        <div id='wrapper'>
          <p class='margin-top'>
            <button type='button' id='target'>
              Click me<BsTooltip
                @autoPlacement={{true}}
                @viewportSelector='#wrapper'
                @placement='top'
                @title='very very very very very very very long tooltip'
                @fade={{false}}
              />
            </button>
          </p>
        </div>
      </template>,
    );

    setupForPositioning('right');

    await click('#target');
    let arrowPosition = parseInt(
      this.element
        .querySelector(`.${tooltipArrowClass()}`)
        .style.transform.match(/translate(?:3d)?\(([0-9.]+)px.*\)/)[1],
      10,
    );

    assert.ok(
      Math.abs(arrowPosition - expectedArrowPosition) <= 1,
      `Expected position: ${expectedArrowPosition}, actual: ${arrowPosition}`,
    );

    // check again to prevent regression of https://github.com/kaliber5/ember-bootstrap/issues/361
    await click('#target');
    await click('#target');

    arrowPosition = parseInt(
      this.element
        .querySelector(`.${tooltipArrowClass()}`)
        .style.transform.match(/translate(?:3d)?\(([0-9.]+)px.*\)/)[1],
      10,
    );
    assert.ok(
      Math.abs(arrowPosition - expectedArrowPosition) <= 1,
      `Expected position: ${expectedArrowPosition}, actual: ${arrowPosition}`,
    );
  });

  test('should adjust placement if not fitting in viewport', async function (assert) {
    this.insertCSSRule('.margin-top { margin-top: 300px; }');

    await render(
      <template>
        <div id='ember-bootstrap-wormhole'></div>
        <div id='wrapper'>
          <p class='margin-top'>
            <button type='button' class='btn' id='target'>
              Click me<BsTooltip
                @placement='bottom'
                @autoPlacement={{true}}
                @title='very very very very very very very long tooltip'
                @fade={{false}}
              />
            </button>
          </p>
        </div>
      </template>,
    );

    setupForPositioning('right');
    await click('#target');
    await delay(50);

    assert.dom('.tooltip').hasClass(tooltipPositionClass('top'));
    assertPositioning(assert, '.tooltip', 6);
  });

  test('it yields close action', async function (assert) {
    const hideAction = sinon.spy();
    const hiddenAction = sinon.spy();
    await render(
      <template>
        <div id='target'>
          <BsTooltip
            @visible={{true}}
            @onHide={{hideAction}}
            @onHidden={{hiddenAction}}
            as |tt|
          >
            <div id='hide' {{on 'click' tt.close}} role='button'>Hide</div>
          </BsTooltip>
        </div>
      </template>,
    );
    await click('#hide');
    assert.ok(hideAction.calledOnce, 'hide action has been called');
    assert.ok(hiddenAction.calledOnce, 'hidden action was called');
    assert.dom('.tooltip').doesNotExist('tooltip is not visible');
  });

  test('it passes all HTML attribute', async function (assert) {
    await render(
      <template>
        <div id='target'><BsTooltip
            @title='Dummy'
            class='wide'
            data-test
            role='foo'
          /></div>
      </template>,
    );
    await triggerEvent('#target', 'mouseenter');
    assert.dom('.tooltip').hasClass('wide');
    assert.dom('.tooltip').hasAttribute('role', 'foo');
    assert.dom('.tooltip').hasAttribute('data-test');
  });

  // The timing of test helpers seems to have changed, which makes this test fail
  skip('can be shown and disposed in same loop', async function (assert) {
    class State {
      @tracked show = true;
    }
    const state = new State();
    await render(
      <template>
        {{#if state.show}}<div id='target'><BsTooltip
              @title='Dummy'
              class='wide'
            /></div>{{/if}}
      </template>,
    );
    triggerEvent('#target', 'mouseenter');
    state.show = false;
    await settled();
    assert.dom('.tooltip').doesNotExist();
  });

  test('it passes accessibility checks', async function (assert) {
    await render(
      <template>
        <button type='button'>
          Test
          <BsTooltip @title='Dummy' @visible={{true}} />
        </button>
      </template>,
    );

    await a11yAudit();
    assert.ok(true, 'A11y audit passed');
  });
});
