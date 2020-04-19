import { assign } from '@ember/polyfills';
import { getContext } from '@ember/test-helpers';

export function setupForPositioning(align = 'left') {
  assign(getContext().element.querySelector('#wrapper').style, {
    position: 'absolute',
    bottom: 0,
    [align]: 0,
    textAlign: 'right',
    width: '300px',
    height: '300px',
  });

  assign(document.getElementById('ember-testing').style, {
    transform: 'none',
  });
}

function offset(el) {
  let rect = el.getBoundingClientRect();

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft,
  };
}

export function assertPositioning(assert, selector = '.tooltip') {
  assert.dom(selector).exists({ count: 1 }, 'Element exists.');

  let rootEl = getContext().element;
  let tooltip = rootEl.querySelector(selector);
  let trigger = rootEl.querySelector('#target');
  let margin =
    -parseInt(window.getComputedStyle(tooltip).marginTop, 10) +
    parseInt(window.getComputedStyle(tooltip).marginBottom, 10);
  let tooltipPos = Math.round(offset(tooltip).top + tooltip.offsetHeight + margin);
  let triggerPos = Math.round(offset(trigger).top);
  assert.ok(Math.abs(triggerPos - tooltipPos) <= 1, `Expected position: ${triggerPos}, actual: ${tooltipPos}`);
}
