import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-navbar-toggle', 'Integration | Component | bs-navbar-toggle', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{bs-navbar-toggle}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bs-navbar-toggle}}
      template block text
    {{/bs-navbar-toggle}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it has correct markup', function(assert) {
  this.render(hbs`{{bs-navbar-toggle}}`);

  assert.equal(this.$('button').length, 1, 'there is exactly one button element');
  assert.ok(this.$('button').hasClass('navbar-toggle'), 'the toggle has the navbar-toggle class');
  assert.ok(this.$('button').hasClass('collapsed'), 'the toggle has the collapsed class');
  assert.ok(this.$('button').hasClass('btn'), 'the toggle has the btn class indicating it derives from bs-button');
});
