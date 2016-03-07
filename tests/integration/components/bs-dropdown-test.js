import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-dropdown', 'Integration | Component | bs-dropdown', {
  integration: true
});

test('dropdown container has dropdown class', function(assert) {
  this.render(hbs`{{#bs-dropdown}}Test{{/bs-dropdown}}`);

  assert.equal(this.$(':first-child').hasClass('dropdown'), true, 'has dropdown class');
});

test('dropdown container with dropdown button has btn-group class', function(assert) {
  this.render(hbs`{{#bs-dropdown}}{{#bs-dropdown-button}}Dropdown <span class="caret"></span>{{/bs-dropdown-button}}{{#bs-dropdown-menu}}<li><a href="#">Something</a></li>{{/bs-dropdown-menu}}{{/bs-dropdown}}`);
  assert.equal(this.$(':first-child').hasClass('btn-group'), true, 'has btn-group class');
});

test('dropdown-toggle toggles dropdown visibility', function(assert) {
  this.render(hbs`{{#bs-dropdown}}{{#bs-dropdown-toggle}}Dropdown <span class="caret"></span>{{/bs-dropdown-toggle}}{{#bs-dropdown-menu}}<li><a href="#">Something</a></li>{{/bs-dropdown-menu}}{{/bs-dropdown}}`);

  assert.equal(this.$(':first-child').hasClass('open'), false, 'has not open class');
  this.$('a.dropdown-toggle').click();
  assert.equal(this.$(':first-child').hasClass('open'), true, 'has open class');
  this.$('a.dropdown-toggle').click();
  assert.equal(this.$(':first-child').hasClass('open'), false, 'has not open class');
});

test('opened dropdown will close on outside click', function(assert) {
  this.render(hbs`{{#bs-dropdown}}{{#bs-dropdown-toggle}}Dropdown <span class="caret"></span>{{/bs-dropdown-toggle}}{{#bs-dropdown-menu}}<li><a href="#">Something</a></li>{{/bs-dropdown-menu}}{{/bs-dropdown}}`);

  this.$('a.dropdown-toggle').click();
  assert.equal(this.$(':first-child').hasClass('open'), true, 'has open class');

  this.$().closest(document).click();
  assert.equal(this.$(':first-child').hasClass('open'), false, 'has not open class');
});

test('clicking dropdown menu will close it', function(assert) {
  this.render(hbs`{{#bs-dropdown}}{{#bs-dropdown-toggle}}Dropdown <span class="caret"></span>{{/bs-dropdown-toggle}}{{#bs-dropdown-menu}}<li><a href="#">Something</a></li>{{/bs-dropdown-menu}}{{/bs-dropdown}}`);
  this.$('a.dropdown-toggle').click();
  assert.equal(this.$(':first-child').hasClass('open'), true, 'has open class');

  this.$('ul.dropdown-menu a').click();
  assert.equal(this.$(':first-child').hasClass('open'), false, 'has not open class');
});

test('clicking dropdown menu when closeOnMenuClick is false will not close it', function(assert) {
  this.render(hbs`{{#bs-dropdown closeOnMenuClick=false}}{{#bs-dropdown-toggle}}Dropdown <span class="caret"></span>{{/bs-dropdown-toggle}}{{#bs-dropdown-menu}}<li><a href="#">Something</a></li>{{/bs-dropdown-menu}}{{/bs-dropdown}}`);
  this.$('a.dropdown-toggle').click();
  assert.equal(this.$(':first-child').hasClass('open'), true, 'has open class');

  this.$('ul.dropdown-menu a').click();
  assert.equal(this.$(':first-child').hasClass('open'), true, 'has open class');
});
