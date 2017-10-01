import { click, find } from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { test, testBS3 } from '../../helpers/bootstrap-test';
import {
  setupForPositioning,
  assertPositioning
} from '../../helpers/contextual-help';

moduleForComponent('bs-popover', 'Integration | Component | bs-popover', {
  integration: true
});

test('should place popover on top of element', async function(assert) {
  this.render(hbs`<div id="ember-bootstrap-wormhole"></div><div id="wrapper"><p style="margin-top: 200px"><a href="#" id="target">Click me{{#bs-popover placement="top" title="very very very very very very very long popover" fade=false}}very very very very very very very long popover{{/bs-popover}}</a></p></div>`);

  setupForPositioning();

  await click('#target');
  assertPositioning(assert, '.popover');
});

// @todo reenable BS4 testing when switching to BS4 beta, see tooltip tests...
testBS3('should adjust popover arrow', async function(assert) {
  let expectedArrowPosition = 238;
  this.render(hbs`<div id="ember-bootstrap-wormhole"></div><div id="wrapper"><p style="margin-top: 200px"><a href="#" id="target">Click me{{#bs-popover placement="top" autoPlacement=true viewportSelector="#wrapper" title="very very very very very very very long popover" fade=false}}very very very very very very very long popover{{/bs-popover}}</a></p></div>`);

  setupForPositioning('right');

  await click('#target');
  let arrowPosition = parseInt(find('.arrow').style.left, 10);
  assert.ok(Math.abs(arrowPosition - expectedArrowPosition) <= 1, `Expected position: ${expectedArrowPosition}, actual: ${arrowPosition}`);

  // check again to prevent regression of https://github.com/kaliber5/ember-bootstrap/issues/361
  await click('#target');
  await click('#target');
  arrowPosition = parseInt(find('.arrow').style.left, 10);
  assert.ok(Math.abs(arrowPosition - expectedArrowPosition) <= 1, `Expected position: ${expectedArrowPosition}, actual: ${arrowPosition}`);
});
