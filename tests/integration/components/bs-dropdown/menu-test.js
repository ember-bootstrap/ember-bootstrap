import { findAll, find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-dropdown-menu', 'Integration | Component | bs-dropdown/menu', {
  integration: true
});

test('dropdown menu has correct markup', function(assert) {
  this.render(hbs`{{#bs-dropdown/menu align="right"}}Something{{/bs-dropdown/menu}}`);

  assert.equal(find(':first-child').tagName, 'UL', 'menu is an unordered list (<ul>) by default');
  assert.equal(find('ul').classList.contains('dropdown-menu'), true, 'menu has dropdown-menu class');
  assert.equal(find('ul').classList.contains('dropdown-menu-right'), true, 'menu has dropdown-menu-right class');
  assert.equal(find('ul').innerHTML.trim(), 'Something', 'menu contains block contents');
});

test('dropdown menu yields item component', function(assert) {
  this.render(hbs`{{#bs-dropdown/menu as |ddm|}}{{#ddm.item}}Dummy{{/ddm.item}}{{/bs-dropdown/menu}}`);

  assert.equal(findAll('li').length, 1, 'has item component');
});
