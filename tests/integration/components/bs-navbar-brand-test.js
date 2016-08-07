import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-navbar-brand', 'Integration | Component | bs navbar brand', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{bs-navbar-brand}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bs-navbar-brand}}
      template block text
    {{/bs-navbar-brand}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it has correct markup', function(assert) {
  this.render(hbs`
    {{#bs-navbar-brand}}
      Brand
    {{/bs-navbar-brand}}
  `);

  assert.equal(this.$().text().trim(), 'Brand');
  assert.equal(this.$('a').length, 1, 'it is an anchor tag');
  assert.ok(this.$('a').hasClass('navbar-brand'), 'it has the brand class');
  assert.equal(this.$('a').attr('href'), '#');
});
