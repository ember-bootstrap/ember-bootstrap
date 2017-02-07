import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-form/element/control/textarea', 'Integration | Component | bs form/element/control/textarea', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bs-form/element/control/textarea}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bs-form/element/control/textarea}}
      template block text
    {{/bs-form/element/control/textarea}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
