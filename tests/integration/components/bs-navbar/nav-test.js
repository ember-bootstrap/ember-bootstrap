import { find, findAll } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-navbar/nav', 'Integration | Component | bs-navbar/nav', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{bs-navbar/nav}}`);

  assert.equal(find('*').textContent.trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bs-navbar/nav}}
      template block text
    {{/bs-navbar/nav}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text');
});

test('it has correct markup', function(assert) {
  this.render(hbs`
    {{#bs-navbar/nav}}
      Nav
    {{/bs-navbar/nav}}
  `);

  assert.equal(find('*').textContent.trim(), 'Nav');
  assert.equal(findAll('.navbar-nav').length, 1, 'there is only one element with the navbar-nav class');
  assert.ok(find('.navbar-nav').classList.contains('nav'), 'it has the nav class indicating it derives from bs-nav');
});

test('it no longer supports the justified option', function(assert) {
  this.render(hbs`{{bs-navbar/nav justified=true}}`);

  assert.equal(findAll('.navbar-justified').length, 0, 'the justified class was not applied');
});
