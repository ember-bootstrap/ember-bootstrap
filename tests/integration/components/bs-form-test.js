import EmberObject from '@ember/object';
import Component from '@ember/component';
import { A } from '@ember/array';
import { resolve, reject } from 'rsvp';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  click,
  fillIn,
  triggerKeyEvent,
  triggerEvent,
  waitFor,
  waitUntil,
  settled,
  focus,
  blur,
} from '@ember/test-helpers';
import {
  formFeedbackClass,
  test,
  testRequiringFocus,
  testBS3,
  testBS4,
  validationErrorClass,
  formFeedbackElement,
  validationSuccessClass,
} from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';
import { defer } from 'rsvp';
import { next, run } from '@ember/runloop';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import RSVP from 'rsvp';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
/* global Ember */

const nextRunloop = function () {
  return new Promise((resolve) => {
    next(() => {
      resolve();
    });
  });
};

module('Integration | Component | bs-form', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  testBS3('form has correct CSS class', async function (assert) {
    let classSpec = {
      vertical: 'form',
      horizontal: 'form-horizontal',
      inline: 'form-inline',
    };

    for (let layout in classSpec) {
      this.set('formLayout', layout);
      await render(hbs`<BsForm @formLayout={{formLayout}}>Test</BsForm>`);
      assert.dom('form').hasClass(classSpec[layout], `form has expected class for ${layout}`);
    }
  });

  testBS4('form has correct markup', async function (assert) {
    let classSpec = {
      vertical: ['form', false],
      horizontal: ['form-horizontal', false],
      inline: ['form-inline', true],
    };

    for (let layout in classSpec) {
      this.set('formLayout', layout);
      await render(hbs`<BsForm @formLayout={{formLayout}}>Test</BsForm>`);

      let expectation = classSpec[layout];
      assert.equal(
        this.element.querySelector('form').classList.contains(expectation[0]),
        expectation[1],
        `form has expected markup for ${layout}`
      );
    }
  });

  test('it yields form element component', async function (assert) {
    await render(hbs`<BsForm as |form|>{{form.element}}</BsForm>`);

    assert.dom('.form-group').exists({ count: 1 }, 'form has element');
  });

  test('Submitting the form calls onBeforeSubmit and onSubmit action', async function (assert) {
    let submit = this.spy();
    let before = this.spy();
    let invalid = this.spy();
    let model = {};
    this.set('model', model);
    this.actions.before = before;
    this.actions.submit = submit;
    this.actions.invalid = invalid;
    await render(
      hbs`<BsForm @model={{model}} @onBefore={{action "before"}} @onSubmit={{action "submit"}} @onInvalid={{action "invalid"}}>Test</BsForm>`
    );

    await triggerEvent('form', 'submit');
    assert.ok(before.calledWith(model), 'onBefore action has been called with model as parameter');
    assert.ok(submit.calledWith(model), 'onSubmit action has been called with model as parameter');
    assert.notOk(invalid.called, 'onInvalid action has not been called');
  });

  test('Clicking a submit button submits the form', async function (assert) {
    let submit = this.spy();
    this.actions.submit = submit;
    await render(
      hbs`<BsForm @onSubmit={{action "submit"}}><BsButton @buttonType="submit">Submit</BsButton></BsForm>`
    );

    await click('button');
    assert.ok(submit.calledOnce, 'onSubmit action has been called');
  });

  test('Submit event bubbles', async function (assert) {
    this.set('action', () => assert.step('bubbles'));

    // eslint-disable-next-line hbs/check-hbs-template-literals
    await render(hbs`
      <div {{on "submit" this.action}}>
        <BsForm>
          <button type="submit">submit</button>
        </BsForm>
      </div>
    `);
    await click('button');

    assert.verifySteps(['bubbles']);
  });

  test('Submitting the form with valid validation calls onBeforeSubmit and onSubmit action', async function (assert) {
    let submit = this.spy();
    let before = this.spy();
    let invalid = this.spy();
    let model = {};
    this.set('model', model);
    this.actions.before = before;
    this.actions.submit = submit;
    this.actions.invalid = invalid;
    this.set('validateStub', function () {
      return resolve('SUCCESS');
    });
    await render(hbs`
      <BsForm
        @model={{model}}
        @hasValidator={{true}}
        @validate={{validateStub}}
        @onBefore={{action "before"}}
        @onSubmit={{action "submit"}}
        @onInvalid={{action "invalid"}}
      >
        Test
      </BsForm>
    `);

    await triggerEvent('form', 'submit');
    assert.ok(before.calledWith(model), 'onBefore action has been called with model as parameter');
    assert.ok(
      submit.calledWith(model, 'SUCCESS'),
      'onSubmit action has been called with model and validation result as parameter'
    );
    assert.notOk(invalid.called, 'onInvalid action has not been called');
  });

  test('Submitting the form with invalid validation calls onBeforeSubmit and onInvalid action', async function (assert) {
    let submit = this.spy();
    let before = this.spy();
    let invalid = this.spy();
    let rejectsWith = new Error();
    let model = {};
    this.set('model', model);
    this.actions.before = before;
    this.actions.submit = submit;
    this.actions.invalid = invalid;
    this.set('validateStub', this.fake.rejects(rejectsWith));
    await render(hbs`
      <BsForm @model={{model}} @hasValidator={{true}} @validate={{validateStub}} @onBefore={{action "before"}} @onSubmit={{action "submit"}} @onInvalid={{action "invalid"}}>Test</BsForm>
    `);

    await triggerEvent('form', 'submit');

    assert.ok(before.calledWith(model), 'onBefore action has been called with model as parameter');
    assert.ok(
      invalid.calledWith(model, rejectsWith),
      'onInvalid action has been called with model and validation result'
    );
    assert.notOk(submit.called, 'onSubmit action has not been called');
  });

  test('Submitting the form with invalid validation shows validation errors', async function (assert) {
    let model = {};
    this.set('model', model);
    this.set('errors', A(['There is an error']));
    this.set('validateStub', this.fake.rejects());
    await render(
      hbs`<BsForm @model={{model}} @hasValidator={{true}} @validate={{validateStub}} as |form|><form.element @hasValidator={{true}} @errors={{errors}} /></BsForm>`
    );

    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationErrorClass(), "validation errors aren't shown before user interaction");
    await triggerEvent('form', 'submit');

    assert
      .dom(formFeedbackElement())
      .hasClass(validationErrorClass(), 'validation errors are shown after form submission');
    assert.dom(`.${formFeedbackClass()}`).hasText('There is an error');
  });

  test('Submitting the form with invalid validation shows validation errors only after onInvalid promise resolves', async function (assert) {
    let model = {};
    this.set('model', model);
    this.set('errors', A(['There is an error']));
    this.set('validateStub', this.fake.rejects());
    let deferredInvalidAction = defer();
    this.set('invalid', () => deferredInvalidAction.promise);

    await render(
      hbs`<BsForm @model={{model}} @hasValidator={{true}} @validate={{validateStub}} @onInvalid={{this.invalid}} as |form|><form.element @hasValidator={{true}} @errors={{errors}} /></BsForm>`
    );

    await triggerEvent('form', 'submit');

    assert
      .dom(formFeedbackElement())
      .hasNoClass(
        validationErrorClass(),
        "validation errors aren't shown before onInvalid is settled"
      );

    deferredInvalidAction.resolve();
    await settled();

    assert
      .dom(formFeedbackElement())
      .hasClass(validationErrorClass(), 'validation errors are shown after onInvalid is settled');
    assert.dom(`.${formFeedbackClass()}`).hasText('There is an error');
  });

  test('it does not catch errors thrown by onSubmit action', async function (assert) {
    let onErrorStub = this.stub();
    let expectedError = new Error();

    this.set('submitAction', this.fake.rejects(expectedError));
    Ember.onerror = onErrorStub;

    await render(hbs`
      <BsForm @onSubmit={{submitAction}}>
        <button type="submit">submit</button>
      </BsForm>
    `);
    await click('button');
    assert.ok(onErrorStub.calledOnceWith(expectedError));
  });

  test('form with validation has novalidate attribute', async function (assert) {
    let model = {};
    this.set('model', model);
    await render(hbs`<BsForm @model={{model}} @hasValidator={{true}}>Test</BsForm>`);

    assert.dom('form').hasAttribute('novalidate');
  });

  test('form with validation allows overriding novalidate attribute', async function (assert) {
    let model = {};
    this.set('model', model);
    await render(
      hbs`<BsForm @model={{model}} @hasValidator={{true}} novalidate={{false}}>Test</BsForm>`
    );

    assert.dom('form').doesNotHaveAttribute('novalidate');
  });

  testRequiringFocus('Submitting a form continues to show validations', async function (assert) {
    let model = {};
    this.set('model', model);
    this.set('errors', A([]));
    this.set('validateStub', () => (this.get('errors.length') > 0 ? reject() : resolve()));
    let deferredSubmitAction = defer();
    this.set('submitAction', () => {
      return deferredSubmitAction.promise;
    });
    await render(
      hbs`
        <BsForm @model={{model}} @onSubmit={{submitAction}} @hasValidator={{true}} @validate={{validateStub}} as |form|>
          <form.element @property="dummy" @hasValidator={{true}} @errors={{errors}} />
        </BsForm>`
    );

    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationErrorClass(), "validation errors aren't shown before user interaction");

    await focus('input');
    await blur('input');
    await triggerEvent('form', 'submit');

    assert
      .dom(formFeedbackElement())
      .hasClass(
        validationSuccessClass(),
        'validation succcess is shown when form signals to show all validations'
      );

    // simulate validation errors being added while a submission is ongoing
    run(() => this.errors.pushObject('There is an error'));
    await settled();

    assert
      .dom(formFeedbackElement())
      .hasClass(validationErrorClass(), 'validation errors are shown while submitting');

    deferredSubmitAction.resolve();
    await settled();

    assert
      .dom(formFeedbackElement())
      .hasClass(validationErrorClass(), 'validation errors are shown after submitting');
  });

  testRequiringFocus(
    'Submitting a hideValidationsOnSubmit form with an async onSubmit does not show validation errors when submitting',
    async function (assert) {
      let model = {};
      this.set('model', model);
      this.set('errors', A([]));
      this.set('validateStub', () => (this.get('errors.length') > 0 ? reject() : resolve()));
      let deferredSubmitAction = defer();
      this.set('submitAction', () => {
        return deferredSubmitAction.promise;
      });
      await render(
        hbs`
        <BsForm @hideValidationsOnSubmit={{true}} @model={{model}} @onSubmit={{submitAction}} @hasValidator={{true}} @validate={{validateStub}} as |form|>
          <form.element @property="dummy" @hasValidator={{true}} @errors={{errors}} />
        </BsForm>`
      );

      assert
        .dom(formFeedbackElement())
        .hasNoClass(
          validationErrorClass(),
          "validation errors aren't shown before user interaction"
        );

      await focus('input');
      await blur('input');
      await triggerEvent('form', 'submit');

      // simulate validation errors being added while a submission is ongoing
      run(() => this.errors.pushObject('There is an error'));
      await settled();

      assert
        .dom(formFeedbackElement())
        .hasNoClass(validationErrorClass(), "validation errors aren't shown while submitting");

      deferredSubmitAction.resolve();
      await settled();

      assert
        .dom(formFeedbackElement())
        .hasNoClass(validationErrorClass(), "validation errors aren't shown after submitting");

      await focus('input');
      await blur('input');

      // form element has been changed, and has errors now, so validations must show up
      assert
        .dom(formFeedbackElement())
        .hasClass(validationErrorClass(), 'validation errors are shown after form submission');
      assert.dom(`.${formFeedbackClass()}`).hasText('There is an error');
    }
  );

  testRequiringFocus(
    'Submitting a hideValidationsOnSubmit form does not show validation errors when submitting',
    async function (assert) {
      let model = {};
      this.set('model', model);
      this.set('errors', A([]));
      this.set('validateStub', () => (this.get('errors.length') > 0 ? reject() : resolve()));
      this.set('submitAction', () => {});
      await render(
        hbs`
        <BsForm @hideValidationsOnSubmit={{true}} @model={{model}} @onSubmit={{submitAction}} @hasValidator={{true}} @validate={{validateStub}} as |form|>
          <form.element @property="dummy" @hasValidator={{true}} @errors={{errors}} />
        </BsForm>`
      );

      assert
        .dom(formFeedbackElement())
        .hasNoClass(
          validationErrorClass(),
          "validation errors aren't shown before user interaction"
        );

      await focus('input');
      await blur('input');
      await triggerEvent('form', 'submit');

      // simulate validation errors being added while a submission is ongoing
      run(() => this.errors.pushObject('There is an error'));
      await settled();

      assert
        .dom(formFeedbackElement())
        .hasNoClass(validationErrorClass(), "validation errors aren't shown after submitting");

      await focus('input');
      await blur('input');

      // form element has been changed, and has errors now, so validations must show up
      assert
        .dom(formFeedbackElement())
        .hasClass(validationErrorClass(), 'validation errors are shown after form submission');
      assert.dom(`.${formFeedbackClass()}`).hasText('There is an error');
    }
  );

  test('it supports hash helper as model', async function (assert) {
    this.set('submitAction', function (model) {
      assert.step('submit');
      assert.equal(model.name, 'Moritz');
    });

    await render(hbs`
      <BsForm @model={{hash name="Max"}} @onSubmit={{this.submitAction}} as |form|>
        <form.element @property="name" />
      </BsForm>
    `);

    await fillIn('input', 'Moritz');
    await triggerEvent('form', 'submit');

    assert.verifySteps(['submit']);
  });

  test('it yields submit action', async function (assert) {
    let submit = this.spy();
    this.actions.submit = submit;
    await render(hbs`
      <BsForm @onSubmit={{action "submit"}} as |form|>
        <a role="button" onclick={{action form.submit}}>submit</a>
      </BsForm>
    `);

    await click('a');
    assert.ok(submit.calledOnce, 'onSubmit action has been called');
  });

  test('yielded submit action returns a promise', async function (assert) {
    class TestComponent extends Component {
      // eslint-disable-next-line ember/require-tagless-components
      tagName = 'button';

      click() {
        let ret = this.onClick();
        assert.ok(ret instanceof RSVP.Promise);
      }
    }
    this.owner.register('component:test-component', TestComponent);

    await render(hbs`
      <BsForm as |form|>
        {{test-component onClick=form.submit}}
      </BsForm>
    `);
    await click('button');
  });

  test('yielded submit action resolves for expected scenarios', async function (assert) {
    let scenarios = [
      { onSubmit() {} },
      { onSubmit: this.fake.resolves() },
      { onSubmit() {}, validate: this.fake.resolves() },
      { onSubmit: this.fake.resolves(), validate: this.fake.resolves() },
    ];

    class TestComponent extends Component {
      // eslint-disable-next-line ember/require-tagless-components
      tagName = 'button';

      async click() {
        try {
          let ret = await this.onClick();
          assert.ok(true, 'resolves');
          assert.strictEqual(ret, undefined, 'resolves with undefined');
        } catch (err) {
          assert.ok(false, err);
        }
      }
    }
    this.owner.register('component:test-component', TestComponent);

    assert.expect(scenarios.length * 2);

    for (let i = 0; i < scenarios.length; i++) {
      this.setProperties(scenarios[i]);
      await render(hbs`
        <BsForm @onSubmit={{onSubmit}} @validate={{validate}} as |form|>
          {{test-component onClick=form.submit}}
        </BsForm>
      `);
      await click('button');
    }
  });

  test('yielded submit action rejects for expected scenarios', async function (assert) {
    let scenarios = [
      { validate: this.fake.rejects('rejected value') },
      { onSubmit: this.fake.rejects('rejected value') },
    ];

    class TestComponent extends Component {
      // eslint-disable-next-line ember/require-tagless-components
      tagName = 'button';

      click() {
        assert.rejects(this.onSubmit(), 'rejected value');
      }
    }
    this.owner.register('component:test-component', TestComponent);

    assert.expect(scenarios.length);

    for (let i = 0; i < scenarios.length; i++) {
      this.setProperties(scenarios[i]);
      await render(hbs`
        <BsForm @onSubmit={{onSubmit}} @validate={{validate}} as |form|>
          {{test-component onSubmit=form.submit}}
        </BsForm>
      `);
      await click('button');
    }
  });

  test('Yields #isSubmitting', async function (assert) {
    let deferredSubmitAction = defer();
    this.set('submitAction', () => {
      return deferredSubmitAction.promise;
    });
    await this.render(hbs`
      <BsForm @onSubmit={{submitAction}} as |form|>
        <div class="state {{if form.isSubmitting "is-submitting"}}"></div>
      </BsForm>
    `);

    assert.dom('form .state').doesNotHaveClass('is-submitting');

    triggerEvent('form', 'submit');

    await waitFor('form .state.is-submitting');

    deferredSubmitAction.resolve();
    await settled();
    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitting is never true if neither validate nor onSubmit returns Promise', async function (assert) {
    this.set('submitAction', () => {});
    this.set('validate', () => {});
    this.set('hasValidator', true);
    await this.render(hbs`
      <BsForm @onSubmit={{submitAction}} @validate={{validate}} @hasValidator={{hasValidator}} as |form|>
        <div class="state {{if form.isSubmitting "is-submitting"}}"></div>
      </BsForm>
    `);

    assert.dom('form .state').doesNotHaveClass('is-submitting');
    triggerEvent('form', 'submit');
    await nextRunloop();

    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitting is true as long as Promise returned by onSubmit is pending', async function (assert) {
    let deferredSubmitAction = defer();
    this.set('submitAction', () => {
      return deferredSubmitAction.promise;
    });
    await this.render(hbs`
      <BsForm @onSubmit={{submitAction}} as |form|>
        <div class="state {{if form.isSubmitting "is-submitting"}}"></div>
      </BsForm>
    `);

    assert.dom('form .state').doesNotHaveClass('is-submitting');

    triggerEvent('form', 'submit');
    await waitFor('form .state.is-submitting');

    deferredSubmitAction.resolve();
    await settled();
    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitting is true as long as Promise returned by onInvalid is pending', async function (assert) {
    let deferredSubmitAction = defer();
    this.set('submitAction', () => {
      return deferredSubmitAction.promise;
    });
    this.set('validate', function () {
      return reject();
    });
    await this.render(hbs`
      <BsForm @onInvalid={{submitAction}} @hasValidator={{true}} @validate={{validate}} as |form|>
        <div class="state {{if form.isSubmitting "is-submitting"}}"></div>
      </BsForm>
    `);

    assert.dom('form .state').doesNotHaveClass('is-submitting');

    triggerEvent('form', 'submit');
    await waitFor('form .state.is-submitting');

    deferredSubmitAction.resolve();
    await settled();
    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitting is true as long as Promise returned by validate is pending', async function (assert) {
    let deferredValidateAction = defer();
    this.set('hasValidator', true);
    this.set('validateAction', () => {
      return deferredValidateAction.promise;
    });
    await this.render(hbs`
      <BsForm @hasValidator={{hasValidator}} @validate={{validateAction}} as |form|>
        <div class="state {{if form.isSubmitting "is-submitting"}}"></div>
      </BsForm>
    `);

    assert.dom('form .state').doesNotHaveClass('is-submitting');

    triggerEvent('form', 'submit');
    await waitFor('form .state.is-submitting');

    deferredValidateAction.resolve();
    await settled();
    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitting is true as long as Promises returned by onSubmit and validate are pending', async function (assert) {
    let deferredSubmitAction = defer();
    let deferredValidateAction = defer();
    this.set('submitAction', () => {
      return deferredSubmitAction.promise;
    });
    this.set('validateAction', () => {
      return deferredValidateAction.promise;
    });
    await this.render(hbs`
      <BsForm @onSubmit={{submitAction}} @validate={{validateAction}} @hasValidator={{true}} as |form|>
        <div class="state {{if form.isSubmitting "is-submitting"}}"></div>
      </BsForm>
    `);

    assert.dom('form .state').doesNotHaveClass('is-submitting');

    triggerEvent('form', 'submit');
    await waitFor('form .state.is-submitting');

    deferredValidateAction.resolve();
    await waitFor('form .state.is-submitting');

    deferredSubmitAction.resolve();
    await settled();
    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitting stays true until all pending submit have been fulfilled', async function (assert) {
    let deferredSubmitActions = [];
    this.set('submitAction', () => {
      let deferred = defer();
      deferredSubmitActions.push(deferred);
      return deferred.promise;
    });
    await this.render(hbs`
      <BsForm @onSubmit={{submitAction}} @preventConcurrency={{false}} as |form|>
        <div class="state {{if form.isSubmitting "is-submitting"}}"></div>
      </BsForm>
    `);

    assert.dom('form .state').doesNotHaveClass('is-submitting');

    triggerEvent('form', 'submit');
    await waitFor('form .state.is-submitting');

    triggerEvent('form', 'submit');
    await waitUntil(() => {
      // assumption: submit action has been fired twice
      return deferredSubmitActions.length === 2;
    });

    deferredSubmitActions[0].resolve();
    await waitFor('form .state.is-submitting');

    deferredSubmitActions[1].resolve();
    await settled();
    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitted is true if onSubmit resolves', async function (assert) {
    this.actions.submit = this.fake.resolves();
    await render(hbs`
      <BsForm @onSubmit={{action "submit"}} as |form|>
        <button type="submit" class={{if form.isSubmitted "is-submitted"}}>submit</button>
      </BsForm>
    `);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted');
  });

  test('Yielded #isSubmitted is true if onSubmit is undefined', async function (assert) {
    await render(hbs`
      <BsForm as |form|>
        <button type="submit" class={{if form.isSubmitted "is-submitted"}}>submit</button>
      </BsForm>
    `);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted');
  });

  test('Yielded #isSubmitted is true if validation passes', async function (assert) {
    this.actions.validate = this.fake.resolves();
    await render(hbs`
      <BsForm @validate={{action "validate"}} @hasValidator={{true}} as |form|>
        <button type="submit" class={{if form.isSubmitted "is-submitted"}}>submit</button>
      </BsForm>
    `);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted');
  });

  test('A change to a form elements resets yielded #isSubmitted', async function (assert) {
    this.actions.submit = this.fake.resolves();
    await render(hbs`
      <BsForm @onSubmit={{action "submit"}} @model={{hash }} as |form|>
        <form.element @property="foo" />
        <button type="submit" class={{if form.isSubmitted "is-submitted"}}>submit</button>
      </BsForm>
    `);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted', 'assumption');

    await fillIn('input', 'bar');
    assert.dom('form button').doesNotHaveClass('is-submitted');
  });

  test('Yielded #isRejected is true if onSubmit action rejects', async function (assert) {
    // tests fail by default on unhandled errors
    let expectedError = new Error();
    Ember.onerror = (error) => {
      if (error !== expectedError) {
        throw error;
      }
    };

    this.actions.submit = this.fake.rejects(expectedError);
    await render(hbs`
      <BsForm @onSubmit={{action "submit"}} as |form|>
        <button type="submit" class={{if form.isRejected "is-rejected"}}>submit</button>
      </BsForm>
    `);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-rejected');
  });

  test('Yielded #isRejected is true if validation fails', async function (assert) {
    this.actions.validate = this.fake.rejects();
    await render(hbs`
      <BsForm @validate={{action "validate"}} @hasValidator={{true}} as |form|>
        <button type="submit" class={{if form.isRejected "is-rejected"}}>submit</button>
      </BsForm>
    `);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-rejected');
  });

  test('A change to a form elements resets yielded #isRejected', async function (assert) {
    // tests fail by default on unhandled errors
    let expectedError = new Error();
    Ember.onerror = (error) => {
      if (error !== expectedError) {
        throw error;
      }
    };

    this.actions.submit = this.fake.rejects(expectedError);
    await render(hbs`
      <BsForm @onSubmit={{action "submit"}} @model={{hash }} as |form|>
        <form.element @property="foo" />
        <button type="submit" class={{if form.isRejected "is-rejected"}}>submit</button>
      </BsForm>
    `);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-rejected', 'assumption');

    await fillIn('input', 'bar');
    assert.dom('form button').doesNotHaveClass('is-rejected');
  });

  test('Triggering resetSubmissionState resets submission state of form', async function (assert) {
    this.actions.submit = this.fake.resolves();
    await render(hbs`
      <BsForm @onSubmit={{action "submit"}} @model={{hash }} as |form|>
        <input onchange={{form.resetSubmissionState}}>
        <button type="submit" class={{if form.isSubmitted "is-submitted"}}>submit</button>
      </BsForm>
    `);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted', 'assumption');

    await fillIn('input', 'bar');
    assert.dom('form button').doesNotHaveClass('is-submitted');
  });

  test("Adds default onChange action to form elements that updates model's property", async function (assert) {
    let model = EmberObject.create({
      name: 'foo',
    });
    this.set('model', model);
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <form.element @property="name" />
      </BsForm>
    `);

    assert.dom('input').hasValue('foo', 'input has model property value');

    await fillIn('input', 'bar');
    await triggerEvent('input', 'input');
    assert.equal(model.get('name'), 'bar', 'model property was updated');
  });

  testRequiringFocus(
    'Pressing enter on a form with submitOnEnter submits the form',
    async function (assert) {
      let submit = this.spy();
      this.actions.submit = submit;
      await render(hbs`<BsForm @onSubmit={{action "submit"}} @submitOnEnter={{true}}></BsForm>`);
      await triggerKeyEvent('form', 'keypress', 13);
      assert.ok(submit.calledOnce, 'onSubmit action has been called');
    }
  );

  test('prevents submission to be fired concurrently', async function (assert) {
    let deferredSubmitAction = defer();
    let submitActionHasBeenExecuted = false;
    this.set('submitAction', () => {
      submitActionHasBeenExecuted = true;
      return deferredSubmitAction.promise;
    });
    this.set('beforeAction', () => {});
    this.set('validate', () => {
      return resolve();
    });
    await render(hbs`
      <BsForm @onSubmit={{submitAction}} @onBefore={{beforeAction}} @validate={{validate}} @hasValidator={{true}}></BsForm>
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
    this.set('validate', () => {
      return resolve();
    });
    await triggerEvent('form', 'submit');
    assert.verifySteps(
      ['onSubmit action'],
      'onSubmit action is fired again after pending submission is settled'
    );
  });

  test('preventConcurrency=false allows submission to be fired concurrently', async function (assert) {
    let deferredSubmitAction = defer();
    let submitActionExecutionCounter = 0;

    let beforeActionFake = this.fake();
    let validateFake = this.fake();

    this.set('submitAction', () => {
      submitActionExecutionCounter++;
      return deferredSubmitAction.promise;
    });
    this.set('beforeAction', beforeActionFake);
    this.set('validate', validateFake);
    await render(hbs`
      <BsForm @preventConcurrency={{false}} @onSubmit={{submitAction}} @onBefore={{beforeAction}} @validate={{validate}} @hasValidator={{true}}>
      </BsForm>
    `);

    await triggerEvent('form', 'submit');
    assert.equal(submitActionExecutionCounter, 1);

    await triggerEvent('form', 'submit');
    assert.equal(submitActionExecutionCounter, 2);

    assert.ok(beforeActionFake.calledTwice);
    assert.ok(validateFake.calledTwice);

    deferredSubmitAction.resolve();
  });

  test('supports novalidate attribute', async function (assert) {
    await render(hbs`<BsForm />`);
    assert.dom('form').doesNotHaveAttribute('novalidate');

    await render(hbs`<BsForm novalidate={{true}} />`);
    assert.dom('form').hasAttribute('novalidate');
  });

  test('disabled property propagates to all its elements', async function (assert) {
    await render(
      hbs`
        <BsForm @model={{this}} @disabled={{true}} as |form|>
          <form.element @property="dummy" />
        </BsForm>`
    );

    assert.dom('.form-group input').hasAttribute('disabled');
  });

  test('readOnly property propagates to all its elements', async function (assert) {
    await render(
      hbs`
        <BsForm @model={{this}} @readonly={{true}} as |form|>
          <form.element @property="dummy" />
        </BsForm>`
    );

    assert.dom('.form-group input').hasAttribute('readonly');
  });

  test('it passes accessibility checks', async function (assert) {
    await render(
      hbs`
        <BsForm @model={{this}} as |form|>
          <form.element @property="dummy" @label="Dummy" />
        </BsForm>`
    );

    await a11yAudit();
    assert.ok(true, 'A11y audit passed');
  });
});
