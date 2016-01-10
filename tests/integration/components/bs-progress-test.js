import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-progress', 'Integration | Component | bs-progress', {
  integration: true
});

test('bs-progress has correct markup', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#bs-progress}}
      template block text
    {{/bs-progress}}
  `);

  assert.equal(this.$().text().trim(), 'template block text', 'Shows block content');

  assert.equal(this.$('div.progress').length, 1, 'Has progress class');

});
