import { findAll } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-form/element/control/checkbox', 'Integration | Component | bs form/element/control/checkbox', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{bs-form/element/control/checkbox}}`);

  assert.equal(findAll('input[type=checkbox]').length, 1);
});
