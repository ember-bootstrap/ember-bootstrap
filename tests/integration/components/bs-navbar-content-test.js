import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-navbar-content', 'Integration | Component | bs-navbar-content', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{bs-navbar-content}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bs-navbar-content}}
      template block text
    {{/bs-navbar-content}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it has correct markup', function(assert) {
  this.render(hbs`
    {{#bs-navbar-content}}
      Content
    {{/bs-navbar-content}}
  `);

  assert.equal(this.$().text().trim(), 'Content');
  assert.equal(this.$('.navbar-collapse').length, 1, 'there is only one element with the navbar-collapse class');
  assert.ok(this.$('.navbar-collapse').hasClass('collapse'), 'it has the collapse class indicating it derives from bs-collapse');
});
