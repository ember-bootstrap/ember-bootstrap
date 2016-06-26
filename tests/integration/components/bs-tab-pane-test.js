import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-tab-pane', 'Integration | Component | bs-tab-pane', {
  integration: true
});

test('it has correct markup', function(assert) {
  this.render(hbs`
    {{#bs-tab-pane}}
  template block text
  {{/bs-tab-pane}}
  `);

  assert.equal(this.$().text().trim(), 'template block text', 'Shows block content');
  assert.equal(this.$('div.tab-pane').length, 1, 'has tab-pane class');

});