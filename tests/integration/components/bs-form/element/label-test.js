import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-form/element/label', 'Integration | Component | bs form/element/label', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bs-form/element/label}}`);

  assert.equal(find('*').textContent.trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bs-form/element/label}}
      template block text
    {{/bs-form/element/label}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text');
});
