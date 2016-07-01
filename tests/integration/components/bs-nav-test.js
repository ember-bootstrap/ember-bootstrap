import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-nav', 'Integration | Component | bs-nav', {
  integration: true
});

test('it has correct markup', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#bs-nav}}
      template block text
    {{/bs-nav}}
  `);

  assert.equal(this.$().text().trim(), 'template block text', 'Shows block content');
  assert.equal(this.$('ul').length, 1, 'it is an unordered list');
  assert.ok(this.$('ul').hasClass('nav'), 'has nav class');
});

test('it supports bootstrap options', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{bs-nav justified=true stacked=true type="pills"}}
  `);

  assert.ok(this.$('ul').hasClass('nav-pills'), 'has pills class');
  assert.ok(this.$('ul').hasClass('nav-justified'), 'has justified class');
  assert.ok(this.$('ul').hasClass('nav-stacked'), 'has stacked class');
});

