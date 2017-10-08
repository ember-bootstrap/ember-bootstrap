import { assign } from '@ember/polyfills';
import { find, findAll } from 'ember-native-dom-helpers';

export function setupForPositioning(align = 'left') {
  assign(find('#wrapper').style, {
    position: 'absolute',
    bottom: 0,
    [align]: 0,
    textAlign: 'right',
    width: '300px',
    height: '300px'
  });

  assign(document.getElementById('ember-testing').style, {
    transform: 'none'
  });
}

function offset(el) {
  let rect = el.getBoundingClientRect();

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
}

export function assertPositioning(assert, selector = '.tooltip') {
  assert.equal(findAll(selector).length, 1, 'Element exists.');

  let tooltip = find(selector);
  let trigger = find('#target');
  let margin = -parseInt(window.getComputedStyle(tooltip).marginTop, 10) + parseInt(window.getComputedStyle(tooltip).marginBottom, 10);
  let tooltipPos = Math.round(offset(tooltip).top + tooltip.offsetHeight + margin);
  let triggerPos = Math.round(offset(trigger).top);
  assert.ok(Math.abs(triggerPos - tooltipPos) <= 1, `Expected position: ${triggerPos}, actual: ${tooltipPos}`);
}
