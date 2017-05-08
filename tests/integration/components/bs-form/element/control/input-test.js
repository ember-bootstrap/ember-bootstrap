import { findAll } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-form/element/control/input', 'Integration | Component | bs form/element/control/input', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{bs-form/element/control/input}}`);

  assert.equal(findAll('input[type=text]').length, 1);
});
