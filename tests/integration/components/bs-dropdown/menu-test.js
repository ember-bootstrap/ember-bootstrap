import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-dropdown-menu', 'Integration | Component | bs-dropdown/menu', {
  integration: true
});

test('dropdown menu has correct markup', function(assert) {
  this.render(hbs`{{#bs-dropdown/menu align="right"}}<li><a href="#">Something</a></li>{{/bs-dropdown/menu}}`);

  assert.equal(this.$(':first-child').prop('tagName'), 'UL', 'menu is an unordered list (<ul>) by default');
  assert.equal(this.$('ul').hasClass('dropdown-menu'), true, 'menu has dropdown-menu class');
  assert.equal(this.$('ul').hasClass('dropdown-menu-right'), true, 'menu has dropdown-menu-right class');
  assert.equal(this.$('ul').html().trim(), '<li><a href="#">Something</a></li>', 'menu contains block contents');
});

