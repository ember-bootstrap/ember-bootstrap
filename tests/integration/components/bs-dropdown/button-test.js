import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-dropdown-button', 'Integration | Component | bs-dropdown/button', {
  integration: true
});

test('dropdown button has correct default markup', function(assert) {
  this.render(hbs`{{#bs-dropdown/button}}Test{{/bs-dropdown/button}}`);

  assert.equal(find(':first-child').tagName, 'BUTTON', 'dropdown button is a button');
  assert.equal(find(':first-child').classList.contains('dropdown-toggle'), true, 'has dropdown-toggle class');
  assert.equal(find(':first-child').getAttribute('role'), 'button', 'has role=button');
});

