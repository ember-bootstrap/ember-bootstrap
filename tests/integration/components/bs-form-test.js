import EmberObject from '@ember/object';
import Component from '@ember/component';
import { A } from '@ember/array';
import { resolve, reject } from 'rsvp';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn, triggerKeyEvent, triggerEvent, waitFor, waitUntil, settled, focus, blur } from '@ember/test-helpers';
import {
  formFeedbackClass,
  test,
  testRequiringFocus,
  testBS3,
  testBS4,
  validationErrorClass,
  formFeedbackElement, validationSuccessClass
} from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';
import { next, run } from '@ember/runloop';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';

const nextRunloop = function() {
  return new Promise((resolve) => {
    next(() => {
      resolve();
    });
  });
};

module('Integration | Component | bs-form', function(hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

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

  test('Submit event bubbles', async function(assert) {
    let TestComponent = Component.extend({
      submit() {
        assert.step('bubbles');
      }
    });
    this.owner.register('component:test-component', TestComponent);

    await render(hbs`
      {{#test-component}}
        {{#bs-form}}
          <button type="submit">submit</button>
        {{/bs-form}}
      {{/test-component}}
    `);
    await click('button');

    assert.verifySteps(['bubbles']);
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

  test('form with validation has novalidate attribute', async function(assert) {
    let model = {};
    this.set('model', model);
    await render(
      hbs`{{#bs-form model=model hasValidator=true as |form|}}Test{{/bs-form}}`
    );

    assert.dom('form').hasAttribute('novalidate');
  });

  test('form with validation allows overriding novalidate attribute', async function(assert) {
    let model = {};
    this.set('model', model);
    await render(
      hbs`{{#bs-form model=model hasValidator=true novalidate=false as |form|}}Test{{/bs-form}}`
    );

    assert.dom('form').doesNotHaveAttribute('novalidate');
  });

  testRequiringFocus('Submitting a form continues to show validations', async function(assert) {
    let model = {};
    this.set('model', model);
    this.set('errors', A([]));
    this.set('validateStub', () => this.get('errors.length') > 0 ? reject() : resolve());
    let deferredSubmitAction = defer();
    this.set('submitAction', () => {
      return deferredSubmitAction.promise;
    });
    await render(
      hbs`
        {{#bs-form model=model onSubmit=submitAction hasValidator=true validate=validateStub as |form|}}
          {{form.element property="dummy" hasValidator=true errors=errors}}
        {{/bs-form}}`
    );

    assert.dom(formFeedbackElement()).hasNoClass(
      validationErrorClass(),
      'validation errors aren\'t shown before user interaction'
    );

    await focus('input');
    await blur('input');
    await triggerEvent('form', 'submit');

    assert.dom(formFeedbackElement()).hasClass(
      validationSuccessClass(),
      'validation succcess is shown when form signals to show all validations'
    );

    // simulate validation errors being added while a submission is ongoing
    run(() => this.get('errors').pushObject('There is an error'));
    await settled();

    assert.dom(formFeedbackElement()).hasClass(
      validationErrorClass(),
      'validation errors are shown while submitting'
    );

    deferredSubmitAction.resolve();
    await settled();

    assert.dom(formFeedbackElement()).hasClass(
      validationErrorClass(),
      'validation errors are shown after submitting'
    );
  });

  testRequiringFocus(
    'Submitting a hideValidationsOnSubmit form with an async onSubmit does not show validation errors when submitting',
    async function(assert) {
      let model = {};
      this.set('model', model);
      this.set('errors', A([]));
      this.set('validateStub', () => this.get('errors.length') > 0 ? reject() : resolve());
      let deferredSubmitAction = defer();
      this.set('submitAction', () => {
        return deferredSubmitAction.promise;
      });
      await render(
        hbs`
        {{#bs-form hideValidationsOnSubmit=true model=model onSubmit=submitAction hasValidator=true validate=validateStub as |form|}}
          {{form.element property="dummy" hasValidator=true errors=errors}}
        {{/bs-form}}`
      );

      assert.dom(formFeedbackElement()).hasNoClass(
        validationErrorClass(),
        'validation errors aren\'t shown before user interaction'
      );

      await focus('input');
      await blur('input');
      await triggerEvent('form', 'submit');

      // simulate validation errors being added while a submission is ongoing
      run(() => this.get('errors').pushObject('There is an error'));
      await settled();

      assert.dom(formFeedbackElement()).hasNoClass(
        validationErrorClass(),
        'validation errors aren\'t shown while submitting'
      );

      deferredSubmitAction.resolve();
      await settled();

      assert.dom(formFeedbackElement()).hasNoClass(
        validationErrorClass(),
        'validation errors aren\'t shown after submitting'
      );

      await focus('input');
      await blur('input');

      // form element has been changed, and has errors now, so validations must show up
      assert.dom(formFeedbackElement()).hasClass(
        validationErrorClass(),
        'validation errors are shown after form submission'
      );
      assert.dom(`.${formFeedbackClass()}`).hasText('There is an error');
    });

  testRequiringFocus(
    'Submitting a hideValidationsOnSubmit form does not show validation errors when submitting',
    async function(assert) {
      let model = {};
      this.set('model', model);
      this.set('errors', A([]));
      this.set('validateStub', () => this.get('errors.length') > 0 ? reject() : resolve());
      this.set('submitAction', () => {
      });
      await render(
        hbs`
        {{#bs-form hideValidationsOnSubmit=true model=model onSubmit=submitAction hasValidator=true validate=validateStub as |form|}}
          {{form.element property="dummy" hasValidator=true errors=errors}}
        {{/bs-form}}`
      );

      assert.dom(formFeedbackElement()).hasNoClass(
        validationErrorClass(),
        'validation errors aren\'t shown before user interaction'
      );

      await focus('input');
      await blur('input');
      await triggerEvent('form', 'submit');

      // simulate validation errors being added while a submission is ongoing
      run(() => this.get('errors').pushObject('There is an error'));
      await settled();

      assert.dom(formFeedbackElement()).hasNoClass(
        validationErrorClass(),
        'validation errors aren\'t shown after submitting'
      );

      await focus('input');
      await blur('input');

      // form element has been changed, and has errors now, so validations must show up
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

  test('Yielded #isSubmitting is true as long as Promise returned by onInvalid is pending', async function(assert) {
    let deferredSubmitAction = defer();
    this.set('submitAction', () => {
      return deferredSubmitAction.promise;
    });
    this.set('validate', function() {
      return reject();
    });
    await this.render(hbs`{{#bs-form onInvalid=submitAction  hasValidator=true validate=validate as |form|}}
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

  test('Yielded #isSubmitted is true if onSubmit resolves', async function(assert) {
    this.actions.submit = this.stub().resolves();
    await render(hbs`{{#bs-form onSubmit=(action "submit") as |form|}}
      <button type="submit" class={{if form.isSubmitted "is-submitted"}}>submit</button>
    {{/bs-form}}`);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted');
  });

  test('Yielded #isSubmitted is true if onSubmit is undefined', async function(assert) {
    await render(hbs`{{#bs-form as |form|}}
      <button type="submit" class={{if form.isSubmitted "is-submitted"}}>submit</button>
    {{/bs-form}}`);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted');
  });

  test('Yielded #isSubmitted is true if validation passes', async function(assert) {
    this.actions.validate = this.stub().resolves();
    await render(hbs`{{#bs-form validate=(action "validate") hasValidator=true as |form|}}
      <button type="submit" class={{if form.isSubmitted "is-submitted"}}>submit</button>
    {{/bs-form}}`);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted');
  });

  test('A change to a form elements resets yielded #isSubmitted', async function(assert) {
    this.actions.submit = this.stub().resolves();
    await render(hbs`{{#bs-form onSubmit=(action "submit") model=(hash) as |form|}}
      {{form.element property="foo"}}
      <button type="submit" class={{if form.isSubmitted "is-submitted"}}>submit</button>
    {{/bs-form}}`);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted', 'assumption');

    await fillIn('input', 'bar');
    assert.dom('form button').doesNotHaveClass('is-submitted');
  });

  test('Yielded #isRejected is true if onSubmit action rejects', async function(assert) {
    this.actions.submit = this.stub().rejects();
    await render(hbs`{{#bs-form onSubmit=(action "submit") as |form|}}
      <button type="submit" class={{if form.isRejected "is-rejected"}}>submit</button>
    {{/bs-form}}`);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-rejected');
  });

  test('Yielded #isRejected is true if validation fails', async function(assert) {
    this.actions.validate = this.stub().rejects();
    await render(hbs`{{#bs-form validate=(action "validate") hasValidator=true as |form|}}
      <button type="submit" class={{if form.isRejected "is-rejected"}}>submit</button>
    {{/bs-form}}`);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-rejected');
  });

  test('A change to a form elements resets yielded #isRejected', async function(assert) {
    this.actions.submit = this.stub().rejects();
    await render(hbs`{{#bs-form onSubmit=(action "submit") model=(hash) as |form|}}
      {{form.element property="foo"}}
      <button type="submit" class={{if form.isRejected "is-rejected"}}>submit</button>
    {{/bs-form}}`);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-rejected', 'assumption');

    await fillIn('input', 'bar');
    assert.dom('form button').doesNotHaveClass('is-rejected');
  });

  test('Triggering resetSubmissionState resets submission state of form', async function(assert) {
    this.actions.submit = this.stub().resolves();
    await render(hbs`{{#bs-form onSubmit=(action "submit") model=(hash) as |form|}}
      <input onchange={{form.resetSubmissionState}}>
      <button type="submit" class={{if form.isSubmitted "is-submitted"}}>submit</button>
    {{/bs-form}}`);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted', 'assumption');

    await fillIn('input', 'bar');
    assert.dom('form button').doesNotHaveClass('is-submitted');
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

  test('preventConcurrency=true prevents submission to be fired concurrently', async function(assert) {
    let deferredSubmitAction = defer();
    let submitActionHasBeenExecuted = false;
    this.set('submitAction', () => {
      submitActionHasBeenExecuted = true;
      return deferredSubmitAction.promise;
    });
    this.set('beforeAction', () => {});
    this.set('validate', () => { return resolve(); });
    await render(hbs`
      {{#bs-form
        preventConcurrency=true
        onSubmit=submitAction onBefore=beforeAction validate=validate hasValidator=true
      }}{{/bs-form}}
    `);

    triggerEvent('form', 'submit');
    await waitUntil(() => submitActionHasBeenExecuted);

    this.set('submitAction', () => {
      assert.ok(false, 'onSubmit action is not executed concurrently');
    });
    this.set('beforeAction', () => {
      assert.ok(false, 'onBefore action is not executed if concurrent submission has been dropped');
    });
    this.set('validate', () => {
      assert.ok(false, 'validate is not executed if concurrent submission has been dropped');
    });
    await triggerEvent('form', 'submit');

    deferredSubmitAction.resolve();
    await settled();
    this.set('submitAction', () => {
      assert.step('onSubmit action');
    });
    this.set('beforeAction', () => {});
    this.set('validate', () => { return resolve(); });
    await triggerEvent('form', 'submit');
    assert.verifySteps(['onSubmit action'], 'onSubmit action is fired again after pending submission is settled');
  });

  test('supports novalidate attribute', async function(assert) {
    await render(hbs`{{bs-form}}`);
    assert.dom('form').doesNotHaveAttribute('novalidate');
    await render(hbs`{{bs-form novalidate=true}}`);
    assert.dom('form').hasAttribute('novalidate');
  });
});
