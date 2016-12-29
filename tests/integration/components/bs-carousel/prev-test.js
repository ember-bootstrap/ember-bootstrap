import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-carousel/prev', 'Integration | Component | bs carousel/prev', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bs-carousel/prev}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bs-carousel/prev}}
      template block text
    {{/bs-carousel/prev}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
