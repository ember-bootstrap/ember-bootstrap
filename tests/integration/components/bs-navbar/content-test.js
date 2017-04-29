import { find, findAll } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-navbar/content', 'Integration | Component | bs-navbar/content', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{bs-navbar/content}}`);

  assert.equal(find('*').textContent.trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bs-navbar/content}}
      template block text
    {{/bs-navbar/content}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text');
});

test('it has correct markup', function(assert) {
  this.render(hbs`
    {{#bs-navbar/content}}
      Content
    {{/bs-navbar/content}}
  `);

  assert.equal(find('*').textContent.trim(), 'Content');
  assert.equal(findAll('.navbar-collapse').length, 1, 'there is only one element with the navbar-collapse class');
  assert.ok(find('.navbar-collapse').classList.contains('collapse'), 'it has the collapse class indicating it derives from bs-collapse');
});
