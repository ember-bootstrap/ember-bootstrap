import { find, findAll } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import { testBS4 } from '../../../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-form/element/control/checkbox', 'Integration | Component | bs form/element/control/checkbox', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{bs-form/element/control/checkbox}}`);

  assert.equal(findAll('input[type=checkbox]').length, 1);
});

testBS4('component has form-check-input class', function(assert) {
  this.render(hbs`{{bs-form/element/control/checkbox}}`);
  assert.equal(find('input[type=checkbox]').classList.contains('form-check-input'), true, 'component has form-check-input class');
});
