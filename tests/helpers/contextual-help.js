import { find, findAll } from 'ember-native-dom-helpers';

export function setupForPositioning() {
  Object.assign(find('#wrapper').style, {
    position: 'absolute',
    bottom: 0,
    left: 0,
    textAlign: 'right',
    width: '300px',
    height: '300px'
  });

  Object.assign(document.getElementById('ember-testing').style, {
    transform: 'none'
  });

  find('a').style.marginTop = 200;
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
  let marginTop = parseInt(window.getComputedStyle(tooltip).marginTop, 10);
  let tooltipPos = Math.round(offset(tooltip).top + tooltip.offsetHeight - marginTop);
  let triggerPos = Math.round(offset(trigger).top);
  assert.equal(tooltipPos, triggerPos);
}
