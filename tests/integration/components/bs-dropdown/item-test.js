import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

// TODO: Do this justice
moduleForComponent('bs-dropdown/item', 'Integration | Component | bs dropdown/item', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bs-dropdown/item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bs-dropdown/item}}
      template block text
    {{/bs-dropdown/item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
