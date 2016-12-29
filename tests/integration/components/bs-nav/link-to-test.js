import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-nav/link-to', 'Integration | Component | bs nav/link to', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bs-nav/link-to "foo" "bar"}}`);

  assert.equal(this.$().text().trim(), 'foo');

  // Template block usage:
  this.render(hbs`
    {{#bs-nav/link-to "foo"}}
      template block text
    {{/bs-nav/link-to}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
