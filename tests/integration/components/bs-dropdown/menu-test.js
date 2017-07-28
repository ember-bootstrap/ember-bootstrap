import { findAll, find } from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import { testBS3, testBS4 } from '../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-dropdown-menu', 'Integration | Component | bs-dropdown/menu', {
  integration: true
});

testBS3('dropdown menu has correct markup', function(assert) {
  this.render(hbs`{{#bs-dropdown/menu align="right"}}Something{{/bs-dropdown/menu}}`);

  assert.equal(find(':first-child').tagName, 'UL', 'menu is an unordered list (<ul>) by default');
  assert.equal(find('ul').classList.contains('dropdown-menu'), true, 'menu has dropdown-menu class');
  assert.equal(find('ul').classList.contains('dropdown-menu-right'), true, 'menu has dropdown-menu-right class');
  assert.equal(find('ul').innerHTML.trim(), 'Something', 'menu contains block contents');
});

testBS4('dropdown menu has correct markup', function(assert) {
  this.render(hbs`{{#bs-dropdown/menu align="right"}}Something{{/bs-dropdown/menu}}`);

  assert.equal(find(':first-child').tagName, 'DIV', 'menu is a div (<div>) by default');
  assert.equal(find('div').classList.contains('dropdown-menu'), true, 'menu has dropdown-menu class');
  assert.equal(find('div').classList.contains('dropdown-menu-right'), true, 'menu has dropdown-menu-right class');
  assert.equal(find('div').innerHTML.trim(), 'Something', 'menu contains block contents');
});

testBS3('dropdown menu yields item component', function(assert) {
  this.render(hbs`{{#bs-dropdown/menu as |ddm|}}{{#ddm.item}}Dummy{{/ddm.item}}{{/bs-dropdown/menu}}`);

  assert.equal(findAll('li').length, 1, 'has item component');
});

testBS4('dropdown menu yields item component', function(assert) {
  this.render(hbs`{{#bs-dropdown/menu as |ddm|}}{{#ddm.item}}Dummy{{/ddm.item}}{{/bs-dropdown/menu}}`);

  assert.equal(findAll('.dropdown-item').length, 0, 'has item component with no markup');
});
