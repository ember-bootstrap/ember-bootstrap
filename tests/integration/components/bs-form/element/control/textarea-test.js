import { findAll } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-form/element/control/textarea', 'Integration | Component | bs form/element/control/textarea', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{bs-form/element/control/textarea}}`);

  assert.equal(findAll('textarea').length, 1);
});
