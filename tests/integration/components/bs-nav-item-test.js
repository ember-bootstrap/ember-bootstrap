import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import BootstrapLinktoInitializer from 'ember-bootstrap/initializers/bootstrap-linkto';
import startApp from '../../../tests/helpers/start-app';

moduleForComponent('bs-nav-item', 'Integration | Component | bs-nav-item', {
  integration: true
});

test('it has correct markup', function(assert) {
  this.render(hbs`
    {{#bs-nav-item}}
      template block text
    {{/bs-nav-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text', 'Shows block content');
  assert.equal(this.$('li').length, 1, 'it is an list item');
  assert.ok(!this.$('li').hasClass('active'), 'has not active class');
  assert.ok(!this.$('li').hasClass('disabled'), 'has not disabled class');

});

test('can be disabled', function(assert) {
  this.render(hbs`{{bs-nav-item disabled=true}}`);

  assert.ok(this.$('li').hasClass('disabled'), 'has disabled class');
});

test('can be active', function(assert) {
  this.render(hbs`{{bs-nav-item active=true}}`);

  assert.ok(this.$('li').hasClass('active'), 'has active class');
});

test('active link makes nav item active', function(assert) {

  let application = startApp();
  BootstrapLinktoInitializer.initialize(application);

  this.render(hbs`
    {{#bs-nav-item}}
      {{#link-to "application" active="foo"}}Test{{/link-to}}
    {{/bs-nav-item}}
  `);
  assert.ok(this.$('li').hasClass('active'), 'has active class');
  Ember.run(application, 'destroy');
});

test('disabled link makes nav item disabled', function(assert) {

  let application = startApp();
  BootstrapLinktoInitializer.initialize(application);

  this.render(hbs`
    {{#bs-nav-item}}
      {{#link-to "application" disabled="foo"}}Test{{/link-to}}
    {{/bs-nav-item}}
  `);
  assert.ok(this.$('li').hasClass('disabled'), 'has disabled class');
  Ember.run(application, 'destroy');
});