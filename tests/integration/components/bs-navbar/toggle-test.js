import { find, findAll } from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import { test, testBS3, testBS4 } from '../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-navbar/toggle', 'Integration | Component | bs-navbar/toggle', {
  integration: true
});

testBS3('it renders inline usage', function(assert) {
  this.render(hbs`{{bs-navbar/toggle}}`);

  assert.equal(find('*').textContent.trim(), 'Toggle navigation');

  // Template block usage:
  this.render(hbs`
    {{#bs-navbar/toggle}}
      template block text
    {{/bs-navbar/toggle}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text');
});

testBS4('it renders inline usage', function(assert) {
  this.render(hbs`{{bs-navbar/toggle}}`);

  assert.ok(find('.navbar-toggler > span').classList.contains('navbar-toggler-icon'));

  // Template block usage:
  this.render(hbs`
    {{#bs-navbar/toggle}}
      template block text
    {{/bs-navbar/toggle}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text');
});

test('it renders block usage', function(assert) {
  this.render(hbs`
    {{#bs-navbar/toggle}}
      template block text
    {{/bs-navbar/toggle}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text');
});

testBS3('it has correct markup', function(assert) {
  this.render(hbs`{{bs-navbar/toggle}}`);

  assert.equal(findAll('button').length, 1, 'there is exactly one button element');
  assert.ok(find('button').classList.contains('navbar-toggle'), 'the toggle has the navbar-toggle class');
  assert.ok(find('button').classList.contains('collapsed'), 'the toggle has the collapsed class');
  assert.ok(find('button').classList.contains('btn'), 'the toggle has the btn class indicating it derives from bs-button');
});

testBS4('it has correct markup', function(assert) {
  this.render(hbs`{{bs-navbar/toggle}}`);

  assert.equal(findAll('button').length, 1, 'there is exactly one button element');
  assert.ok(find('button').classList.contains('navbar-toggler'), 'the toggle has the navbar-toggler class');
  assert.ok(find('button').classList.contains('collapsed'), 'the toggle has the collapsed class');
  assert.ok(find('button').classList.contains('btn'), 'the toggle has the btn class indicating it derives from bs-button');
});
