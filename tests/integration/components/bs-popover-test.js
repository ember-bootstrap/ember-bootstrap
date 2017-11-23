import { click, find } from 'ember-native-dom-helpers';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { test, versionDependent } from '../../helpers/bootstrap-test';
import {
  setupForPositioning,
  assertPositioning
} from '../../helpers/contextual-help';

module('Integration | Component | bs-popover', function(hooks) {
  setupRenderingTest(hooks);

  test('should place popover on top of element', async function(assert) {
    await render(
      hbs`<div id="ember-bootstrap-wormhole"></div><div id="wrapper"><p style="margin-top: 200px"><button class="btn" id="target">Click me{{#bs-popover placement="top" title="very very very very very very very long popover" fade=false}}very very very very very very very long popover{{/bs-popover}}</button></p></div>`
    );

    setupForPositioning();

    await click('#target');
    assertPositioning(assert, '.popover');
  });

  test('should adjust popover arrow', async function(assert) {
    let expectedArrowPosition = versionDependent(225, 227);
    await render(
      hbs`<div id="ember-bootstrap-wormhole"></div><div id="wrapper"><p style="margin-top: 200px"><button class="btn" id="target">Click me{{#bs-popover placement="top" autoPlacement=true viewportSelector="#wrapper" title="very very very very very very very long popover" fade=false}}very very very very very very very long popover{{/bs-popover}}</button></p></div>`
    );

    setupForPositioning('right');

    await click('#target');
    let arrowPosition = parseInt(find('.arrow').style.left, 10);
    assert.ok(Math.abs(arrowPosition - expectedArrowPosition) <= 2, `Expected position: ${expectedArrowPosition}, actual: ${arrowPosition}`);

    // check again to prevent regression of https://github.com/kaliber5/ember-bootstrap/issues/361
    await click('#target');
    await click('#target');
    arrowPosition = parseInt(find('.arrow').style.left, 10);
    assert.ok(Math.abs(arrowPosition - expectedArrowPosition) <= 2, `Expected position: ${expectedArrowPosition}, actual: ${arrowPosition}`);
  });
});
