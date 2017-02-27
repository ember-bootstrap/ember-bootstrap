import { moduleForComponent } from 'ember-qunit';
import { test, testBS3, testBS4 } from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-navbar', 'Integration | Component | bs-navbar', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{bs-navbar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bs-navbar}}
      template block text
    {{/bs-navbar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

testBS3('it has correct default markup', function(assert) {
  this.render(hbs`{{bs-navbar}}`);

  assert.equal(this.$('nav').length, 1, 'there is only one nav element');
  assert.ok(this.$('nav').hasClass('navbar'), 'the navbar has the navbar class');
  assert.ok(this.$('nav').hasClass('navbar-default'), 'the navbar has the navbar-default class');
  assert.equal(this.$('nav > div').length, 1, 'there is a div right under the nav element');
  assert.ok(this.$('nav > div').hasClass('container-fluid'), 'the div is a fluid container');
});

testBS4('it has correct default markup', function(assert) {
  this.render(hbs`{{bs-navbar}}`);

  assert.equal(this.$('nav').length, 1, 'there is only one nav element');
  assert.ok(this.$('nav').hasClass('navbar'), 'the navbar has the navbar class');
  assert.ok(this.$('nav').hasClass('navbar-light'), 'the navbar has the navbar-default class');
  // No container by default because fluid is automatic
});

test('it handles inverse navbars properly', function(assert) {
  this.render(hbs`{{bs-navbar type="inverse"}}`);

  assert.ok(this.$('nav').hasClass('navbar-inverse'), 'the navbar has the navbar-inverse class');
  assert.notOk(this.$('nav').hasClass('navbar-default'), 'the navbar does not have the navbar-default class');
});

test('it handles fluid containers properly', function(assert) {
  this.render(hbs`{{bs-navbar fluid=false}}`);

  assert.ok(this.$('nav > div').hasClass('container'), 'the wrapping div has the container class');
  assert.notOk(this.$('nav > div').hasClass('container-fluid'), 'the wrapping div does not have the container-fluid class');
});

testBS3('it handles the toggling action properly', function(assert) {
  this.render(hbs`
    {{#bs-navbar as |navbar|}}
      {{#navbar.toggle class="clickme"}}Button{{/navbar.toggle}}
    {{/bs-navbar}}
  `);

  assert.ok(this.$('button.navbar-toggle').hasClass('collapsed'), 'ensure the default state of the button through the active class');

  let done = assert.async();

  this.$('button').click();
  setTimeout(() => {
    assert.notOk(this.$('button.navbar-toggle').hasClass('collapsed'), 'ensure the toggled state of the button through the active class');

    done();
  }, 500);
});

testBS4('it handles the toggling action properly', function(assert) {
  this.render(hbs`
    {{#bs-navbar as |navbar|}}
      {{#navbar.toggle class="clickme"}}Button{{/navbar.toggle}}
    {{/bs-navbar}}
  `);

  assert.ok(this.$('button.navbar-toggler').hasClass('collapsed'), 'ensure the default state of the button through the active class');

  let done = assert.async();

  this.$('button').click();
  setTimeout(() => {
    assert.notOk(this.$('button.navbar-toggler').hasClass('collapsed'), 'ensure the toggled state of the button through the active class');

    done();
  }, 500);
});

testBS3('it exposes all the requisite contextual components', function(assert) {
  this.render(hbs`
    {{#bs-navbar as | navbar | }}
      <div class="navbar-header">
        {{navbar.toggle}}
        <a class="navbar-brand" href="#">Brand</a>
      </div>
      {{#navbar.content}}
        {{navbar.nav}}
      {{/navbar.content}}
    {{/bs-navbar}}
  `);

  assert.equal(this.$('nav.navbar-default').length, 1, 'it has the navbar');
  assert.equal(this.$('nav.navbar-default .navbar-header > button.navbar-toggle').length, 1, 'it has the navbar toggle');
  assert.equal(this.$('nav.navbar-default .navbar-collapse').length, 1, 'it has the navbar content');
  assert.equal(this.$('nav.navbar-default .navbar-collapse > .navbar-nav').length, 1, 'it has the navbar nav');
});

testBS4('it exposes all the requisite contextual components', function(assert) {
  this.render(hbs`
    {{#bs-navbar as | navbar | }}
      <div class="navbar-header">
        {{navbar.toggle}}
        <a class="navbar-brand" href="#">Brand</a>
      </div>
      {{#navbar.content}}
        {{navbar.nav}}
      {{/navbar.content}}
    {{/bs-navbar}}
  `);

  assert.equal(this.$('nav.navbar-light').length, 1, 'it has the navbar');
  assert.equal(this.$('nav.navbar-light .navbar-header > button.navbar-toggler').length, 1, 'it has the navbar toggle');
  assert.equal(this.$('nav.navbar-light .navbar-collapse').length, 1, 'it has the navbar content');
  assert.equal(this.$('nav.navbar-light .navbar-collapse > .navbar-nav').length, 1, 'it has the navbar nav');
});

test('it nas no positional classes when position is not specified', function(assert) {
  this.render(hbs`{{bs-navbar}}`);

  assert.notOk(this.$('nav').hasClass('navbar-fixed-top'), 'it does not have navbar-fixed-top');
  assert.notOk(this.$('nav').hasClass('navbar-fixed-bottom'), 'it does not have navbar-fixed-bottom');
  assert.notOk(this.$('nav').hasClass('navbar-static-top'), 'it does not have navbar-static-top');
});

test('it handles fixed-top properly', function(assert) {
  this.render(hbs`{{bs-navbar position="fixed-top"}}`);

  assert.ok(this.$('nav').hasClass('navbar-fixed-top'), 'it has navbar-fixed-top');
  assert.notOk(this.$('nav').hasClass('navbar-fixed-bottom'), 'it does not have navbar-fixed-bottom');
  assert.notOk(this.$('nav').hasClass('navbar-static-top'), 'it does not have navbar-static-top');
});

test('it handles fixed-bottom properly', function(assert) {
  this.render(hbs`{{bs-navbar position="fixed-bottom"}}`);

  assert.notOk(this.$('nav').hasClass('navbar-fixed-top'), 'it does not have navbar-fixed-top');
  assert.ok(this.$('nav').hasClass('navbar-fixed-bottom'), 'it has navbar-fixed-bottom');
  assert.notOk(this.$('nav').hasClass('navbar-static-top'), 'it does not have navbar-static-top');
});

test('it handles static-top properly', function(assert) {
  this.render(hbs`{{bs-navbar position="static-top"}}`);

  assert.notOk(this.$('nav').hasClass('navbar-fixed-top'), 'it does not have navbar-fixed-top');
  assert.notOk(this.$('nav').hasClass('navbar-fixed-bottom'), 'it does not have navbar-fixed-bottom');
  assert.ok(this.$('nav').hasClass('navbar-static-top'), 'it has navbar-static-top');
});
