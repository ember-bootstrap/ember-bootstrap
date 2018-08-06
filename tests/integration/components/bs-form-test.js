import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { resolve, reject } from 'rsvp';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn, triggerKeyEvent, triggerEvent, waitFor, settled } from '@ember/test-helpers';
import {
  formFeedbackClass,
  test,
  testRequiringFocus,
  testBS3,
  testBS4,
  validationErrorClass,
  formFeedbackElement
} from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';
import { next } from '@ember/runloop';

const nextRunloop = function() {
  return new Promise((resolve) => {
    next(() => {
      resolve();
    });
  });
};

module('Integration | Component | bs-form', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  testBS3('form has correct CSS class', async function(assert) {

    let classSpec = {
      vertical: 'form',
      horizontal: 'form-horizontal',
      inline: 'form-inline'
    };

    for (let layout in classSpec) {
      this.set('formLayout', layout);
      await render(hbs`{{#bs-form formLayout=formLayout}}Test{{/bs-form}}`);
      assert.dom('form').hasClass(classSpec[layout], `form has expected class for ${layout}`);
    }
  });

  testBS4('form has correct markup', async function(assert) {
    await render(hbs`{{#bs-form formLayout=formLayout}}Test{{/bs-form}}`);

    let classSpec = {
      vertical: ['form', false],
      horizontal: ['form-horizontal', false],
      inline: ['form-inline', true]
    };

    for (let layout in classSpec) {
      this.set('formLayout', layout);
      let expectation = classSpec[layout];
      assert.equal(this.element.querySelector('form').classList.contains(expectation[0]), expectation[1], `form has expected markup for ${layout}`);
    }
  });

  test('it yields form element component', async function(assert) {
    await render(hbs`{{#bs-form as |form|}}{{form.element}}{{/bs-form}}`);

    assert.dom('.form-group').exists({ count: 1 }, 'form has element');
  });

  test('Submitting the form calls onBeforeSubmit and onSubmit action', async function(assert) {
    let submit = this.spy();
    let before = this.spy();
    let invalid = this.spy();
    let model = {};
    this.set('model', model);
    this.actions.before = before;
    this.actions.submit = submit;
    this.actions.invalid = invalid;
    await render(
      hbs`{{#bs-form model=model onBefore=(action "before") onSubmit=(action "submit") onInvalid=(action "invalid")}}Test{{/bs-form}}`
    );

    await triggerEvent('form', 'submit');
    assert.ok(before.calledWith(model), 'onBefore action has been called with model as parameter');
    assert.ok(submit.calledWith(model), 'onSubmit action has been called with model as parameter');
    assert.notOk(invalid.called, 'onInvalid action has not been called');
  });

  test('Clicking a submit button submits the form', async function(assert) {
    let submit = this.spy();
    this.actions.submit = submit;
    await render(
      hbs`{{#bs-form onSubmit=(action "submit")}}{{#bs-button buttonType="submit"}}Submit{{/bs-button}}{{/bs-form}}`
    );

    await click('button');
    assert.ok(submit.called, 'onSubmit action has been called');
  });

  test('Submitting the form with valid validation calls onBeforeSubmit and onSubmit action', async function(assert) {
    let submit = this.spy();
    let before = this.spy();
    let invalid = this.spy();
    let model = {};
    this.set('model', model);
    this.actions.before = before;
    this.actions.submit = submit;
    this.actions.invalid = invalid;
    this.set('validateStub', function() {
      return resolve('SUCCESS');
    });
    await render(
      hbs`{{#bs-form model=model hasValidator=true validate=validateStub onBefore=(action "before") onSubmit=(action "submit") onInvalid=(action "invalid") as |form|}}Test{{/bs-form}}`
    );

    await triggerEvent('form', 'submit');
    assert.ok(before.calledWith(model), 'onBefore action has been called with model as parameter');
    assert.ok(submit.calledWith(model, 'SUCCESS'), 'onSubmit action has been called with model and validation result as parameter');
    assert.notOk(invalid.called, 'onInvalid action has not been called');
  });

  test('Submitting the form with invalid validation calls onBeforeSubmit and onInvalid action', async function(assert) {
    let submit = this.spy();
    let before = this.spy();
    let invalid = this.spy();
    let model = {};
    this.set('model', model);
    this.actions.before = before;
    this.actions.submit = submit;
    this.actions.invalid = invalid;
    this.set('validateStub', function() {
      return reject('ERROR');
    });
    await render(
      hbs`{{#bs-form model=model hasValidator=true validate=validateStub onBefore=(action "before") onSubmit=(action "submit") onInvalid=(action "invalid") as |form|}}Test{{/bs-form}}`
    );

    await triggerEvent('form', 'submit');

    assert.ok(before.calledWith(model), 'onBefore action has been called with model as parameter');
    assert.ok(invalid.calledWith(model, 'ERROR'), 'onInvalid action has been called with model and validation result');
    assert.notOk(submit.called, 'onSubmit action has not been called');
  });

  test('Submitting the form with invalid validation shows validation errors', async function(assert) {
    let model = {};
    this.set('model', model);
    this.set('errors', A(['There is an error']));
    this.set('validateStub', function() {
      return reject();
    });
    await render(
      hbs`{{#bs-form model=model hasValidator=true validate=validateStub as |form|}}{{form.element hasValidator=true errors=errors}}{{/bs-form}}`
    );

    assert.dom(formFeedbackElement()).hasNoClass(
      validationErrorClass(),
      'validation errors aren\'t shown before user interaction'
    );
    await triggerEvent('form', 'submit');

    assert.dom(formFeedbackElement()).hasClass(
      validationErrorClass(),
      'validation errors are shown after form submission'
    );
    assert.dom(`.${formFeedbackClass()}`).hasText('There is an error');
  });

  test('Yields #isSubmitting', async function(assert) {
    let deferredSubmitAction = defer();
    this.set('submitAction', () => {
      return deferredSubmitAction.promise;
    });
    await this.render(hbs`{{#bs-form onSubmit=submitAction as |form|}}
      <div class='state {{if form.isSubmitting 'is-submitting'}}'></div>
    {{/bs-form}}`);

    assert.dom('form .state').doesNotHaveClass('is-submitting');

    triggerEvent('form', 'submit');

    await waitFor('form .state.is-submitting');

    deferredSubmitAction.resolve();
    await settled();
    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitting is never true if neither validate nor onSubmit returns Promise', async function(assert) {
    this.set('submitAction', () => {});
    this.set('validate', () => {});
    this.set('hasValidator', true);
    await this.render(hbs`{{#bs-form onSubmit=submitAction validate=validate hasValidator=hasValidator as |form|}}
      <div class='state {{if form.isSubmitting 'is-submitting'}}'></div>
    {{/bs-form}}`);

    assert.dom('form .state').doesNotHaveClass('is-submitting');
    triggerEvent('form', 'submit');
    await nextRunloop();
    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitting is true as long as Promise returned by onSubmit is pending', async function(assert) {
    let deferredSubmitAction = defer();
    this.set('submitAction', () => {
      return deferredSubmitAction.promise;
    });
    await this.render(hbs`{{#bs-form onSubmit=submitAction as |form|}}
      <div class='state {{if form.isSubmitting 'is-submitting'}}'></div>
    {{/bs-form}}`);

    assert.dom('form .state').doesNotHaveClass('is-submitting');

    triggerEvent('form', 'submit');
    await waitFor('form .state.is-submitting');

    deferredSubmitAction.resolve();
    await settled();
    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitting is true as long as Promise returned by validate is pending', async function(assert) {
    let deferredValidateAction = defer();
    this.set('hasValidator', true);
    this.set('validateAction', () => {
      return deferredValidateAction.promise;
    });
    await this.render(hbs`{{#bs-form hasValidator=hasValidator validate=validateAction as |form|}}
      <div class='state {{if form.isSubmitting 'is-submitting'}}'></div>
    {{/bs-form}}`);

    assert.dom('form .state').doesNotHaveClass('is-submitting');

    triggerEvent('form', 'submit');
    await waitFor('form .state.is-submitting');

    deferredValidateAction.resolve();
    await settled();
    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitting is true as long as Promises returned by onSubmit and validate are pending', async function(assert) {
    let deferredSubmitAction = defer();
    let deferredValidateAction = defer();
    this.set('submitAction', () => {
      return deferredSubmitAction.promise;
    });
    this.set('validateAction', () => {
      return deferredValidateAction.promise;
    });
    await this.render(hbs`{{#bs-form onSubmit=submitAction validate=validateAction hasValidator=true as |form|}}
      <div class='state {{if form.isSubmitting 'is-submitting'}}'></div>
    {{/bs-form}}`);

    assert.dom('form .state').doesNotHaveClass('is-submitting');

    triggerEvent('form', 'submit');
    await waitFor('form .state.is-submitting');

    deferredValidateAction.resolve();
    await nextRunloop();
    assert.dom('form .state').hasClass('is-submitting');

    deferredSubmitAction.resolve();
    await settled();
    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitting stays true until all pending submit have been fulfilled', async function(assert) {
    let deferredSubmitActions = [];
    this.set('submitAction', () => {
      let deferred = defer();
      deferredSubmitActions.push(deferred);
      return deferred.promise;
    });
    await this.render(hbs`{{#bs-form onSubmit=submitAction as |form|}}
      <div class='state {{if form.isSubmitting 'is-submitting'}}'></div>
    {{/bs-form}}`);

    assert.dom('form .state').doesNotHaveClass('is-submitting');

    triggerEvent('form', 'submit');
    await waitFor('form .state.is-submitting');

    triggerEvent('form', 'submit');
    await nextRunloop();
    // for ember <= 2.12 submitAction is not executed on the first runloop after submit has been triggered
    await nextRunloop();
    assert.equal(deferredSubmitActions.length, 2, 'assumption: submit action has been fired twice');

    deferredSubmitActions[0].resolve();
    await nextRunloop();
    assert.dom('form .state').hasClass('is-submitting');

    deferredSubmitActions[1].resolve();
    await settled();
    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Adds default onChange action to form elements that updates model\'s property', async function(assert) {
    let model = EmberObject.create({
      name: 'foo'
    });
    this.set('model', model);
    await render(hbs`{{#bs-form model=model as |form|}}
      {{form.element property="name"}}
    {{/bs-form}}`);

    assert.dom('input').hasValue('foo', 'input has model property value');

    await fillIn('input', 'bar');
    await triggerEvent('input', 'input');
    assert.equal(model.get('name'), 'bar', 'model property was updated');
  });

  testRequiringFocus('Pressing enter on a form with submitOnEnter submits the form', async function(assert) {
    let submit = this.spy();
    this.actions.submit = submit;
    await render(hbs`{{#bs-form onSubmit=(action "submit") submitOnEnter=true as |form|}}{{/bs-form}}`);
    await triggerKeyEvent('form', 'keypress', 13);
    assert.ok(submit.calledOnce, 'onSubmit action has been called');
  });

  test('supports novalidate attribute', async function(assert) {
    assert.expect(2);
    await render(hbs`{{bs-form}}`);
    assert.equal(
      this.element.querySelector('form').getAttribute('novalidate'),
      null,
      'defaults to false'
    );
    await render(hbs`{{bs-form novalidate=true}}`);
    assert.ok(
      this.element.querySelector('form').getAttribute('novalidate') === ''
    );
  });
});
