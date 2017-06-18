import { click } from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { test } from '../../helpers/bootstrap-test';
import { setupForPositioning, assertPositioning } from '../../helpers/contextual-help';

moduleForComponent('bs-popover', 'Integration | Component | bs-popover', {
  integration: true
});

test('should place popover on top of element', async function(assert) {
  this.render(hbs`<div id="wrapper"><p style="margin-top: 200px"><a href="#" id="target">Click me{{#bs-popover placement="top" title="very very very very very very very long popover" fade=false}}very very very very very very very long popover{{/bs-popover}}</a></p></div>`);

  setupForPositioning();

  await click('#target');
  assertPositioning(assert, '.popover');
});
