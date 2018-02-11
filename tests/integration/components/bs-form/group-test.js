import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import {
  test,
  testBS3,
  testBS4,
  validationErrorClass
} from '../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

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
    formGroupClasses: ['has-feedback', validationErrorClass()],
    iconClasses: ['glyphicon', 'glyphicon-remove']
  }
};

module('Integration | Component | bs-form/group', function(hooks) {
  setupRenderingTest(hooks);

  test('component has form-group bootstrap class', async function(assert) {
    await render(hbs`{{bs-form/group}}`);
    assert.dom(':first-child').hasClass('form-group', 'component has form-group class');
  });

  testBS4('component has row class for horizontal layouts', async function(assert) {
    await render(hbs`{{bs-form/group formLayout="horizontal"}}`);
    assert.dom(':first-child').hasClass('row', 'component has row class');
  });

  testBS4('component has form-check class for group with checkbox control type', async function(assert) {
    await render(hbs`{{bs-form/group controlType="checkbox"}}`);
    assert.dom(':first-child').hasClass('form-check', 'component has form-check class');
    assert.dom(':first-child').hasNoClass('form-group', 'component has no form-group class');
  });

  testBS3('support size classes', async function(assert) {
    await render(hbs`{{bs-form/group size="lg"}}`);
    assert.dom('.form-group').hasClass('form-group-lg', 'form-group has large class');

    await render(hbs`{{bs-form/group size="sm"}}`);
    assert.dom('.form-group').hasClass('form-group-sm', 'form-group has small class');
  });

  testBS4('does not set size class for BS4', async function(assert) {
    await render(hbs`{{bs-form/group size="lg"}}`);
    assert.dom('.form-group').hasNoClass('form-group-lg', 'form-group has not large class');

    await render(hbs`{{bs-form/group size="sm"}}`);
    assert.dom('.form-group').hasNoClass('form-group-sm', 'form-group has not small class');
  });

  async function testValidationState(assert, state) {
    let validationConfig = validations[state];
    await render(hbs`{{#bs-form/group validation=validation}}{{/bs-form/group}}`);
    this.set('validation', state);
    validationConfig.formGroupClasses.forEach((className) => {
      assert.dom(':first-child').hasClass(className, `component has ${className} class`);
    });
    assert.dom('.form-control-feedback').exists({ count: 1 }, 'component has feedback icon');
    validationConfig.iconClasses.forEach((className) => {
      assert.equal(this.element.querySelector('.form-control-feedback').classList.contains(className), 1, `icon has ${className} class`);
    });
  }

  testBS3('component with successful validation has success classes and success icon', function(assert) {
    return testValidationState.call(this, assert, 'success');
  });

  testBS3('component with warning validation has warning classes and warning icon', function(assert) {
    return testValidationState.call(this, assert, 'warning');
  });

  testBS3('component with error validation has error classes and error icon', function(assert) {
    return testValidationState.call(this, assert, 'error');
  });
});
