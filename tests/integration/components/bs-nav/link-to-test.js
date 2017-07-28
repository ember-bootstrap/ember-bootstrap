import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-nav/link-to', 'Integration | Component | bs nav/link to', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#bs-nav/link-to "application"}}
      template block text
    {{/bs-nav/link-to}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text');
});
