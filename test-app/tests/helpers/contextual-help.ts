import { assert } from '@ember/debug';
import type { RenderingTestContext } from '@ember/test-helpers';
import { getContext } from '@ember/test-helpers';

export function setupForPositioning(align = 'left') {
  const wrapperEl =
    (getContext() as RenderingTestContext)!.element!.querySelector<HTMLDivElement>(
      '#wrapper',
    );

  assert('expected #wrapper element', wrapperEl);

  Object.assign(wrapperEl.style, {
    position: 'absolute',
    bottom: 0,
    [align]: 0,
    textAlign: 'right',
    width: '300px',
    height: '300px',
    overflow: 'hidden',
  });

  Object.assign(document.getElementById('ember-testing')!.style, {
    transform: 'none',
  });

  // popper.js v1 seems to have issues with the positioning of our testing container since ember-qunit v5
  // Could be related to https://github.com/popperjs/popper-core/issues/670
  Object.assign(document.getElementById('ember-testing-container')!.style, {
    position: 'relative',
    top: 0,
  });
}

function offset(el: Element) {
  const rect = el.getBoundingClientRect();

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft,
  };
}

export function assertPositioning(
  assert: Assert,
  selector = '.tooltip',
  additionalOffset = 0,
) {
  assert.dom(selector).exists({ count: 1 }, 'Element exists.');

  const rootEl = (getContext() as RenderingTestContext).element!;
  const tooltip = rootEl.querySelector<HTMLElement>(selector)!;
  const trigger = rootEl.querySelector<HTMLElement>('#target')!;
  const margin =
    -parseInt(window.getComputedStyle(tooltip).marginTop, 10) +
    parseInt(window.getComputedStyle(tooltip).marginBottom, 10);
  const tooltipPos = Math.round(
    offset(tooltip).top + tooltip.offsetHeight + margin + additionalOffset,
  );
  const triggerPos = Math.round(offset(trigger).top);
  assert.ok(
    Math.abs(triggerPos - tooltipPos) <= 1,
    `Expected position: ${triggerPos}, actual: ${tooltipPos}`,
  );
}
