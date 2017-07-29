import { A } from '@ember/array';
import { find, findAll } from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import { formFeedbackClass, test } from '../../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-form/element/errors', 'Integration | Component | bs form/element/errors', {
  integration: true
});

test('is empty by default', function(assert) {

  this.set('messages', ['foo', 'bar']);

  this.render(hbs`{{bs-form/element/errors show=false messages=messages}}`);

  assert.equal(findAll(`.${formFeedbackClass()}`).length, 0);
});

test('shows first message', function(assert) {

  this.set('messages', A(['foo', 'bar']));

  this.render(hbs`{{bs-form/element/errors show=true messages=messages}}`);

  assert.equal(findAll(`.${formFeedbackClass()}`).length, 1);
  assert.equal(find(`.${formFeedbackClass()}`).textContent.trim(), 'foo');
});
