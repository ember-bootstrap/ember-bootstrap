import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-navbar-header', 'Integration | Component | bs navbar header', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{bs-navbar-header}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bs-navbar-header}}
      template block text
    {{/bs-navbar-header}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it has correct markup', function(assert) {
  this.render(hbs`
    {{#bs-navbar-header}}
      Header
    {{/bs-navbar-header}}
  `);

  assert.equal(this.$().text().trim(), 'Header');
  assert.equal(this.$('.navbar-header').length, 1, 'there is only one element with the header class');
});
