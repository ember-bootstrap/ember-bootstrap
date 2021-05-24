import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { testBS3, testBS5, testForBootstrap, testNotBS3, validationErrorClass } from '../../../helpers/bootstrap';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';

const validations = {
  success: {
    formGroupClasses: ['has-feedback', 'has-success'],
    iconClasses: ['glyphicon', 'glyphicon-ok'],
  },
  warning: {
    formGroupClasses: ['has-feedback', 'has-warning'],
    iconClasses: ['glyphicon', 'glyphicon-warning-sign'],
  },
  error: {
    formGroupClasses: ['has-feedback', validationErrorClass()],
    iconClasses: ['glyphicon', 'glyphicon-remove'],
  },
};

module('Integration | Component | bs-form/group', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  testForBootstrap([3, 4], 'component has form-group bootstrap class', async function (assert) {
    await render(hbs`<BsForm::Group data-test-form-group />`);
    assert.dom('[data-test-form-group]').hasClass('form-group', 'component has form-group class');
  });

  testBS5('component has no form-group bootstrap class', async function (assert) {
    await render(hbs`<BsForm::Group data-test-form-group />`);
    assert.dom('[data-test-form-group]').hasNoClass('form-group', 'component has no form-group class');
  });

  testNotBS3('component has row class for horizontal layouts', async function (assert) {
    await render(hbs`<BsForm::Group @formLayout="horizontal" />`);
    assert.dom('.row').exists('component has row class');
  });

  testBS3('support size classes', async function (assert) {
    await render(hbs`<BsForm::Group @size="lg" data-test-form-group />`);
    assert.dom('[data-test-form-group]').hasClass('form-group-lg', 'form-group has large class');

    await render(hbs`<BsForm::Group @size="sm" data-test-form-group />`);
    assert.dom('[data-test-form-group]').hasClass('form-group-sm', 'form-group has small class');
  });

  testNotBS3('does not set size class for BS4', async function (assert) {
    await render(hbs`<BsForm::Group @size="lg" data-test-form-group />`);
    assert.dom('[data-test-form-group]').hasNoClass('form-group-lg', 'form-group has not large class');

    await render(hbs`<BsForm::Group @size="sm" data-test-form-group />`);
    assert.dom('[data-test-form-group]').hasNoClass('form-group-sm', 'form-group has not small class');
  });

  async function testValidationState(assert, state) {
    let validationConfig = validations[state];
    await render(hbs`<BsForm::Group @validation={{this.validation}}></BsForm::Group>`);
    this.set('validation', state);
    validationConfig.formGroupClasses.forEach((className) => {
      assert.dom(`.${className}`).exists(`component has ${className} class`);
    });
    assert.dom('.form-control-feedback').exists({ count: 1 }, 'component has feedback icon');
    validationConfig.iconClasses.forEach((className) => {
      assert.dom('.form-control-feedback').hasClass(className, `icon has ${className} class`);
    });
  }

  testBS3('component with successful validation has success classes and success icon', function (assert) {
    return testValidationState.call(this, assert, 'success');
  });

  testBS3('component with warning validation has warning classes and warning icon', function (assert) {
    return testValidationState.call(this, assert, 'warning');
  });

  testBS3('component with error validation has error classes and error icon', function (assert) {
    return testValidationState.call(this, assert, 'error');
  });
});
