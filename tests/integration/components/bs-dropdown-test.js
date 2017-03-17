import { moduleForComponent } from 'ember-qunit';
import { openClass, test } from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-dropdown', 'Integration | Component | bs-dropdown', {
  integration: true
});

test('dropdown container has dropdown class', function(assert) {
  this.render(hbs`{{#bs-dropdown}}Test{{/bs-dropdown}}`);

  assert.equal(this.$(':first-child').hasClass('dropdown'), true, 'has dropdown class');
});

test('dropdown container supports dropup style', function(assert) {
  this.render(hbs`{{#bs-dropdown direction="up"}}Test{{/bs-dropdown}}`);

  assert.equal(this.$(':first-child').hasClass('dropup'), true, 'has dropup class');
});

test('dropdown container with dropdown button has btn-group class', function(assert) {
  this.render(hbs`{{#bs-dropdown as |dd|}}{{#dd.button}}Dropdown <span class="caret"></span>{{/dd.button}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`);
  let done = assert.async();
  // timeout is needed as class is set in next run loop
  setTimeout(() => {
    assert.equal(this.$(':first-child').hasClass('btn-group'), true, 'has btn-group class');
    done();
  }, 0);
});

test('dropdown container with block dropdown button has dropdown class', function(assert) {
  this.render(hbs`{{#bs-dropdown as |dd|}}{{#dd.button block=true}}Dropdown <span class="caret"></span>{{/dd.button}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`);
  let done = assert.async();
  // timeout is needed as class is set in next run loop
  setTimeout(() => {
    assert.equal(this.$(':first-child').hasClass('dropdown'), true, 'has dropdown class');
    done();
  }, 0);
});

test('dropdown container with dropdown button supports dropup style', function(assert) {
  this.render(hbs`{{#bs-dropdown direction="up" as |dd|}}{{#dd.button}}Dropdown <span class="caret"></span>{{/dd.button}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`);
  let done = assert.async();
  // timeout is needed as class is set in next run loop
  setTimeout(() => {
    assert.equal(this.$(':first-child').hasClass('btn-group'), true, 'has btn-group class');
    assert.equal(this.$(':first-child').hasClass('dropup'), true, 'has dropup class');
    done();
  }, 0);
});

test('dropdown-toggle toggles dropdown visibility', function(assert) {
  this.render(hbs`{{#bs-dropdown as |dd|}}{{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`);

  assert.equal(this.$(':first-child').hasClass(openClass()), false, 'Dropdown is closed');
  this.$('a.dropdown-toggle').click();
  assert.equal(this.$(':first-child').hasClass(openClass()), true, 'Dropdown is open');
  this.$('a.dropdown-toggle').click();
  assert.equal(this.$(':first-child').hasClass(openClass()), false, 'Dropdown is closed');
});

test('opened dropdown will close on outside click', function(assert) {
  this.render(hbs`{{#bs-dropdown as |dd|}}{{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`);

  this.$('a.dropdown-toggle').click();
  assert.equal(this.$(':first-child').hasClass(openClass()), true, 'Dropdown is open');

  this.$().closest(document).click();
  assert.equal(this.$(':first-child').hasClass(openClass()), false, 'Dropdown is closed');
});

test('clicking dropdown menu will close it', function(assert) {
  this.render(hbs`{{#bs-dropdown as |dd|}}{{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`);
  this.$('a.dropdown-toggle').click();
  assert.equal(this.$(':first-child').hasClass(openClass()), true, 'Dropdown is open');

  this.$('ul.dropdown-menu a').click();
  assert.equal(this.$(':first-child').hasClass(openClass()), false, 'Dropdown is closed');
});

test('clicking dropdown menu when closeOnMenuClick is false will not close it', function(assert) {
  this.render(hbs`{{#bs-dropdown closeOnMenuClick=false as |dd|}}{{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`);
  this.$('a.dropdown-toggle').click();
  assert.equal(this.$(':first-child').hasClass(openClass()), true, 'Dropdown is open');

  this.$('ul.dropdown-menu a').click();
  assert.equal(this.$(':first-child').hasClass(openClass()), true, 'Dropdown is open');
});

test('child components can access isOpen property', function(assert) {
  this.render(hbs`{{#bs-dropdown as |dd|}}{{#dd.toggle}}<span id="toggleText">{{if dd.isOpen "open" "closed"}}</span>{{/dd.toggle}}{{/bs-dropdown}}`);

  assert.equal(this.$('#toggleText').text(), 'closed', 'Dropdown is closed');
  this.$('a.dropdown-toggle').click();
  assert.equal(this.$('#toggleText').text(), 'open', 'Dropdown is open');
  this.$('a.dropdown-toggle').click();
  assert.equal(this.$('#toggleText').text(), 'closed', 'Dropdown is closed');
});

test('opening dropdown calls onShow action', function(assert) {
  let action = this.spy();
  this.on('show', action);
  this.render(hbs`{{#bs-dropdown onShow=(action "show") as |dd|}}{{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`);

  this.$('a.dropdown-toggle').click();
  assert.ok(action.calledOnce);
});

test('closing dropdown calls onHide action', function(assert) {
  let action = this.spy();
  this.on('hide', action);
  this.render(hbs`{{#bs-dropdown onHide=(action "hide") as |dd|}}{{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}{{#dd.menu}}<li><a href="#">Something</a></li>{{/dd.menu}}{{/bs-dropdown}}`);

  this.$('a.dropdown-toggle').click();
  this.$('ul.dropdown-menu a').click();
  assert.ok(action.calledOnce);
});
