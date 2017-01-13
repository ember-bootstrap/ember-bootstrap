import { moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startApp from '../../../helpers/start-app';
import destroyApp from '../../../helpers/destroy-app';
import test from 'ember-sinon-qunit/test-support/test';

moduleForComponent('bs-nav/item', 'Integration | Component | bs-nav/item', {
  integration: true
});

test('it has correct markup', function(assert) {
  this.render(hbs`
    {{#bs-nav/item}}
      template block text
    {{/bs-nav/item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text', 'Shows block content');
  assert.equal(this.$('li').length, 1, 'it is an list item');
  assert.ok(!this.$('li').hasClass('active'), 'has not active class');
  assert.ok(!this.$('li').hasClass('disabled'), 'has not disabled class');

});

test('can be disabled', function(assert) {
  this.render(hbs`{{bs-nav/item disabled=true}}`);

  assert.ok(this.$('li').hasClass('disabled'), 'has disabled class');
});

test('can be active', function(assert) {
  this.render(hbs`{{bs-nav/item active=true}}`);

  assert.ok(this.$('li').hasClass('active'), 'has active class');
});

test('active link makes nav item active', function(assert) {

  let application = startApp();

  this.render(hbs`
    {{#bs-nav/item}}
      {{#bs-nav/link-to "application" active="foo"}}Test{{/bs-nav/link-to}}
    {{/bs-nav/item}}
  `);
  assert.ok(this.$('li').hasClass('active'), 'has active class');
  destroyApp(application);
});

test('disabled link makes nav item disabled', function(assert) {

  let application = startApp();

  this.render(hbs`
    {{#bs-nav/item}}
      {{#bs-nav/link-to "application" disabled="foo"}}Test{{/bs-nav/link-to}}
    {{/bs-nav/item}}
  `);
  assert.ok(this.$('li').hasClass('disabled'), 'has disabled class');
  destroyApp(application);
});

test('clicking item calls onClick action', function(assert) {
  let action = this.spy();
  this.on('click', action);
  this.render(hbs`{{bs-nav/item onClick=(action "click")}}`);
  this.$('li').click();

  assert.ok(action.calledOnce, 'action has been called');
});