import { moduleForComponent, test } from 'ember-qunit';
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

test('it has correct markup', function(assert) {
  this.render(hbs`{{bs-navbar}}`);

  assert.equal(this.$('nav').length, 1, 'there is only one nav element');
  assert.ok(this.$('nav').hasClass('navbar'), 'the navbar has the navbar class');
  assert.ok(this.$('nav').hasClass('navbar-default'), 'the navbar has the navbar-default class');
  assert.equal(this.$('nav > div').length, 1, 'there is a div right under the nav element');
  assert.ok(this.$('nav > div').hasClass('container-fluid'), 'the div is a fluid container');
});

test('it handles inverse navbars properly', function(assert) {
  this.render(hbs`{{bs-navbar type="inverse"}}`);

  assert.ok(this.$('nav').hasClass('navbar-inverse'), 'the navbar has the navbar-inverse class');
  assert.notOk(this.$('nav').hasClass('navbar-default'), 'the navbar does not have the navbar-default class');
});

test('it handles the toggling action propoerly', function(assert) {
  this.render(hbs`
    {{#bs-navbar as |navbar|}}
      {{#navbar.toggle}}{{navbar.collapsed}}{{/navbar.toggle}}
    {{/bs-navbar}}
  `);

  assert.equal(this.$('button').text().trim(), 'true', 'ensure the default state of the property');

  this.$('#clickme').click();
  setTimeout(() => {
    assert.equal(this.$('button').text().trim(), 'false', 'ensure the toggled state of the property');

    assert.async();
  }, 500);

  this.$('#clickme').click();
  setTimeout(() => {
    assert.equal(this.$('button').text().trim(), 'true', 'ensure the state of the property toggles back');

    assert.async();
  }, 500);
});

test('it exposes all the requisite contextual components', function(assert) {
  this.render(hbs`
    {{#bs-navbar as | navbar | }}
      {{#navbar.header}}
        {{navbar.toggle}}
        {{navbar.brand}}
      {{/navbar.header}}
      {{#navbar.content}}
        {{navbar.nav}}
      {{/navbar.content}}
    {{/bs-navbar}}
  `);

  assert.equal(this.$('nav.navbar-default').length, 1, 'it has the navbar');
  assert.equal(this.$('nav.navbar-default .navbar-header').length, 1, 'it has the navbar header');
  assert.equal(this.$('nav.navbar-default .navbar-header > button.navbar-toggle').length, 1, 'it has the navbar toggle');
  assert.equal(this.$('nav.navbar-default .navbar-header > a.navbar-brand').length, 1, 'it has the navbar brand');
  assert.equal(this.$('nav.navbar-default .navbar-collapse').length, 1, 'it has the navbar content');
  assert.equal(this.$('nav.navbar-default .navbar-collapse > .navbar-nav').length, 1, 'it has the navbar nav');
});
