import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-navbar/nav', 'Integration | Component | bs-navbar/nav', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{bs-navbar/nav}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bs-navbar/nav}}
      template block text
    {{/bs-navbar/nav}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it has correct markup', function(assert) {
  this.render(hbs`
    {{#bs-navbar/nav}}
      Nav
    {{/bs-navbar/nav}}
  `);

  assert.equal(this.$().text().trim(), 'Nav');
  assert.equal(this.$('.navbar-nav').length, 1, 'there is only one element with the navbar-nav class');
  assert.ok(this.$('.navbar-nav').hasClass('nav'), 'it has the nav class indicating it derives from bs-nav');
});

test('it no longer supports the justified option', function(assert) {
  this.render(hbs`{{bs-navbar/nav justified=true}}`);

  assert.equal(this.$('.navbar-justified').length, 0, 'the justified class was not applied');
});
