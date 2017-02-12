import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-form/element/feedback-icon', 'Integration | Component | bs form/element/feedback icon', {
  integration: true
});

test('is empty by default', function(assert) {

  this.render(hbs`{{bs-form/element/feedback-icon show=false}}`);

  assert.equal(this.$('.form-control-feedback').length, 0);
});

test('shows icon', function(assert) {

  this.render(hbs`{{bs-form/element/feedback-icon show=true iconName="foo"}}`);

  assert.equal(this.$('.form-control-feedback.foo').length, 1);
});