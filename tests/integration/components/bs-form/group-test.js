import { moduleForComponent } from 'ember-qunit';
import { test, testBS3, testBS4 } from '../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-form/group', 'Integration | Component | bs-form/group', {
  integration: true
});

test('component has form-group bootstrap class', function(assert) {
  this.render(hbs`{{bs-form/group}}`);
  assert.equal(this.$(':first-child').hasClass('form-group'), true, 'component has form-group class');
});

testBS3('support size classes', function(assert) {
  this.render(hbs`{{bs-form/group size="lg"}}`);
  assert.equal(this.$('.form-group').hasClass('form-group-lg'), true, 'form-group has large class');

  this.render(hbs`{{bs-form/group size="sm"}}`);
  assert.equal(this.$('.form-group').hasClass('form-group-sm'), true, 'form-group has small class');
});

testBS4('support size classes', function(assert) {
  this.render(hbs`{{bs-form/group size="lg"}}`);
  assert.equal(this.$('.form-group').hasClass('form-control-lg'), true, 'form-group has large class');

  this.render(hbs`{{bs-form/group size="sm"}}`);
  assert.equal(this.$('.form-group').hasClass('form-control-sm'), true, 'form-group has small class');
});

const validations = {
  success: {
    formGroupClasses: ['has-feedback', 'has-success'],
    iconClasses: ['glyphicon', 'glyphicon-ok']
  },
  warning: {
    formGroupClasses: ['has-feedback', 'has-warning'],
    iconClasses: ['glyphicon', 'glyphicon-warning-sign']
  },
  error: {
    formGroupClasses: ['has-feedback', 'has-error'],
    iconClasses: ['glyphicon', 'glyphicon-remove']
  }
};

function testValidationState(assert, state) {
  let validationConfig = validations[state];
  this.render(hbs`{{#bs-form/group validation=validation}}{{/bs-form/group}}`);
  this.set('validation', state);
  validationConfig.formGroupClasses.forEach((className) => {
    assert.equal(this.$(':first-child').hasClass(className), true, `component has ${className} class`);
  });
  assert.equal(this.$('.form-control-feedback').length, 1, 'component has feedback icon');
  validationConfig.iconClasses.forEach((className) => {
    assert.equal(this.$('.form-control-feedback').hasClass(className), 1, `icon has ${className} class`);
  });
}

test('component with successful validation has success classes and success icon', function(assert) {
  testValidationState.call(this, assert, 'success');
});

test('component with warning validation has warning classes and warning icon', function(assert) {
  testValidationState.call(this, assert, 'warning');
});

test('component with error validation has error classes and error icon', function(assert) {
  testValidationState.call(this, assert, 'error');
});
