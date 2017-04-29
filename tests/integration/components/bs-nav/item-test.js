import { find, findAll, click } from 'ember-native-dom-helpers';
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

  assert.equal(find('*').textContent.trim(), 'template block text', 'Shows block content');
  assert.equal(findAll('li').length, 1, 'it is an list item');
  assert.ok(!find('li').classList.contains('active'), 'has not active class');
  assert.ok(!find('li').classList.contains('disabled'), 'has not disabled class');

});

test('can be disabled', function(assert) {
  this.render(hbs`{{bs-nav/item disabled=true}}`);

  assert.ok(find('li').classList.contains('disabled'), 'has disabled class');
});

test('can be active', function(assert) {
  this.render(hbs`{{bs-nav/item active=true}}`);

  assert.ok(find('li').classList.contains('active'), 'has active class');
});

test('active link makes nav item active', function(assert) {

  let application = startApp();

  this.render(hbs`
    {{#bs-nav/item}}
      {{#bs-nav/link-to "application" active="foo"}}Test{{/bs-nav/link-to}}
    {{/bs-nav/item}}
  `);
  assert.ok(find('li').classList.contains('active'), 'has active class');
  destroyApp(application);
});

test('disabled link makes nav item disabled', function(assert) {

  let application = startApp();

  this.render(hbs`
    {{#bs-nav/item}}
      {{#bs-nav/link-to "application" disabled="foo"}}Test{{/bs-nav/link-to}}
    {{/bs-nav/item}}
  `);
  assert.ok(find('li').classList.contains('disabled'), 'has disabled class');
  destroyApp(application);
});

test('clicking item calls onClick action', async function(assert) {
  let action = this.spy();
  this.on('click', action);
  this.render(hbs`{{bs-nav/item onClick=(action "click")}}`);
  await click('li');

  assert.ok(action.calledOnce, 'action has been called');
});