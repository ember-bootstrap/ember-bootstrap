import EmberObject, { action } from '@ember/object';
import { A } from '@ember/array';
import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  blur,
  click,
  fillIn,
  focus,
  render,
  settled,
  setupOnerror,
  triggerEvent,
  triggerKeyEvent,
  waitFor,
  waitUntil,
} from '@ember/test-helpers';
import {
  formFeedbackClass,
  formFeedbackElement,
  test,
  testBS4,
  testRequiringFocus,
  validationErrorClass,
  validationSuccessClass,
} from '../../helpers/bootstrap';
import { defer } from '../../helpers/defer';
import { hbs } from 'ember-cli-htmlbars';
import { next, run } from '@ember/runloop';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import sinon from 'sinon';
import Form from 'ember-bootstrap/components/bs-form';
import FormElement from 'ember-bootstrap/components/bs-form/element';
import { ensureSafeComponent } from '@embroider/util';
import { setupAssertionsForErrorsNotHandledByEmberOnError } from '../../helpers/assert-errors';
import { setComponentTemplate } from '@ember/component';
import Component from '@glimmer/component';

const nextRunloop = function () {
  return new Promise((resolve) => {
    next(() => {
      resolve();
    });
  });
};

class ValidatingForm extends Form {
  '__ember-bootstrap_subclass' = true;

  get hasValidator() {
    return true;
  }

  async validate() {
    const result =
      typeof this.args.validate === 'function'
        ? this.args.validate()
        : (this.args.validate ?? true) === true
        ? 'VALID'
        : false;

    if (result === false) {
      throw 'INVALID';
    }

    return result;
  }
}

class ValidatingFormElement extends FormElement {
  get hasValidator() {
    return true;
  }
}

module('Integration | Component | bs-form', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);
  setupAssertionsForErrorsNotHandledByEmberOnError(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  testBS4('form has correct markup', async function (assert) {
    let classSpec = {
      vertical: ['form', false],
      horizontal: ['form-horizontal', false],
      inline: ['form-inline', true],
    };

    for (let layout in classSpec) {
      this.set('formLayout', layout);
      await render(hbs`<BsForm @formLayout={{this.formLayout}}>Test</BsForm>`);

      let expectation = classSpec[layout];
      assert.equal(
        this.element.querySelector('form').classList.contains(expectation[0]),
        expectation[1],
        `form has expected markup for ${layout}`,
      );
    }
  });

  test('it yields form element component', async function (assert) {
    await render(
      hbs`<BsForm as |form|><form.element data-test-form-element /></BsForm>`,
    );

    assert
      .dom('[data-test-form-element]')
      .exists({ count: 1 }, 'form has element');
  });

  test('Submitting the form calls onBeforeSubmit and onSubmit action', async function (assert) {
    let submit = sinon.spy();
    let before = sinon.spy();
    let invalid = sinon.spy();
    let model = {};
    this.set('model', model);
    this.actions.before = before;
    this.actions.submit = submit;
    this.actions.invalid = invalid;
    await render(
      hbs`<BsForm
  @model={{this.model}}
  @onBefore={{action 'before'}}
  @onSubmit={{action 'submit'}}
  @onInvalid={{action 'invalid'}}
>Test</BsForm>`,
    );

    await triggerEvent('form', 'submit');
    assert.ok(
      before.calledWith(model),
      'onBefore action has been called with model as parameter',
    );
    assert.ok(
      submit.calledWith(model),
      'onSubmit action has been called with model as parameter',
    );
    assert.notOk(invalid.called, 'onInvalid action has not been called');
  });

  test('Clicking a submit button submits the form', async function (assert) {
    let submit = sinon.spy();
    this.actions.submit = submit;
    await render(
      hbs`<BsForm @onSubmit={{action 'submit'}}><button
    type='submit'
  >Submit</button></BsForm>`,
    );

    await click('button');
    assert.ok(submit.calledOnce, 'onSubmit action has been called');
  });

  test('Submit event bubbles', async function (assert) {
    this.set('action', () => assert.step('bubbles'));

    // Enable again when hbs plugin works again _eslint-disable-next-line hbs/check-hbs-template-literals
    await render(hbs`<div {{on 'submit' this.action}}>
  <BsForm>
    <button type='submit'>submit</button>
  </BsForm>
</div>`);
    await click('button');

    assert.verifySteps(['bubbles']);
  });

  test('form that supports validation calls validate hook when submitting', async function (assert) {
    let model = {};
    this.set('model', model);

    class ValidatingForm extends Form {
      '__ember-bootstrap_subclass' = true;

      get hasValidator() {
        return true;
      }

      async validate(modelArg, formArg) {
        assert.step('validate');
        assert.strictEqual(
          modelArg,
          model,
          'validate is called with model argument',
        );
        assert.ok(
          formArg instanceof HTMLFormElement,
          'validate is called with form argument',
        );
      }
    }

    this.set('form', ensureSafeComponent(ValidatingForm, this));

    await render(hbs`<this.form @model={{this.model}}>Test</this.form>`);
    await triggerEvent('form', 'submit');

    assert.verifySteps(['validate'], 'validate has been called');
  });

  test('form that supports validation calls validate hook when calling submit action', async function (assert) {
    let model = {};
    this.set('model', model);

    class ValidatingForm extends Form {
      '__ember-bootstrap_subclass' = true;

      get hasValidator() {
        return true;
      }

      async validate(modelArg, formArg) {
        assert.step('validate');
        assert.strictEqual(
          modelArg,
          model,
          'validate is called with model argument',
        );
        assert.ok(
          formArg instanceof HTMLFormElement,
          'validate is called with form argument',
        );
      }
    }

    this.set('form', ensureSafeComponent(ValidatingForm, this));

    await render(hbs`<this.form @model={{this.model}} as |form|>
  <button type='button' {{on 'click' form.submit}}>Submit</button>
</this.form>`);
    await click('button');

    assert.verifySteps(['validate'], 'validate has been called');
  });

  test('Submitting the form with valid validation calls onBeforeSubmit and onSubmit action', async function (assert) {
    let submit = sinon.spy();
    let before = sinon.spy();
    let invalid = sinon.spy();
    let model = {};
    this.set('model', model);
    this.actions.before = before;
    this.actions.submit = submit;
    this.actions.invalid = invalid;

    this.set('form', ensureSafeComponent(ValidatingForm, this));

    await render(hbs`<this.form
  @model={{this.model}}
  @onBefore={{action 'before'}}
  @onSubmit={{action 'submit'}}
  @onInvalid={{action 'invalid'}}
>
  Test
</this.form>`);

    await triggerEvent('form', 'submit');
    assert.ok(
      before.calledWith(model),
      'onBefore action has been called with model as parameter',
    );
    assert.ok(
      submit.calledWith(model, 'VALID'),
      'onSubmit action has been called with model and validation result as parameter',
    );
    assert.notOk(invalid.called, 'onInvalid action has not been called');
  });

  test('Submitting the form with invalid validation calls onBeforeSubmit and onInvalid action', async function (assert) {
    let submit = sinon.spy();
    let before = sinon.spy();
    let invalid = sinon.spy();
    let model = {};
    this.set('model', model);
    this.actions.before = before;
    this.actions.submit = submit;
    this.actions.invalid = invalid;

    this.set('form', ensureSafeComponent(ValidatingForm, this));

    await render(hbs`<this.form
  @model={{this.model}}
  @validate={{false}}
  @onBefore={{action 'before'}}
  @onSubmit={{action 'submit'}}
  @onInvalid={{action 'invalid'}}
>Test</this.form>`);

    await triggerEvent('form', 'submit');

    assert.ok(
      before.calledWith(model),
      'onBefore action has been called with model as parameter',
    );
    assert.ok(
      invalid.calledWith(model, 'INVALID'),
      'onInvalid action has been called with model and validation result',
    );
    assert.notOk(submit.called, 'onSubmit action has not been called');
  });

  test('Submitting the form with invalid validation shows validation errors', async function (assert) {
    let model = {};
    this.set('model', model);
    this.set('errors', A(['There is an error']));

    this.set('form', ensureSafeComponent(ValidatingForm, this));
    this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

    await render(
      hbs`<this.form
  @elementComponent={{this.formElement}}
  @model={{this.model}}
  @validate={{false}}
  as |form|
><form.element @errors={{this.errors}} /></this.form>`,
    );

    assert
      .dom(formFeedbackElement())
      .hasNoClass(
        validationErrorClass(),
        "validation errors aren't shown before user interaction",
      );
    await triggerEvent('form', 'submit');

    assert
      .dom(formFeedbackElement())
      .hasClass(
        validationErrorClass(),
        'validation errors are shown after form submission',
      );
    assert.dom(`.${formFeedbackClass()}`).hasText('There is an error');
  });

  test('Submitting the form with invalid validation shows validation errors only after onInvalid promise resolves', async function (assert) {
    let model = {};
    this.set('model', model);
    this.set('errors', A(['There is an error']));
    this.set('validateStub', sinon.fake.rejects());
    let deferredInvalidAction = defer();
    this.set('invalid', () => deferredInvalidAction.promise);

    this.set('form', ensureSafeComponent(ValidatingForm, this));
    this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

    await render(
      hbs`<this.form
  @elementComponent={{this.formElement}}
  @model={{this.model}}
  @onInvalid={{this.invalid}}
  @validate={{false}}
  as |form|
><form.element @errors={{this.errors}} /></this.form>`,
    );

    await triggerEvent('form', 'submit');

    assert
      .dom(formFeedbackElement())
      .hasNoClass(
        validationErrorClass(),
        "validation errors aren't shown before onInvalid is settled",
      );

    deferredInvalidAction.resolve();
    await settled();

    assert
      .dom(formFeedbackElement())
      .hasClass(
        validationErrorClass(),
        'validation errors are shown after onInvalid is settled',
      );
    assert.dom(`.${formFeedbackClass()}`).hasText('There is an error');
  });

  test('Form with invalid validation shows validation errors immediately when @showValidations is true', async function (assert) {
    let model = {};
    this.set('model', model);
    this.set('errors', A(['There is an error']));

    this.set('form', ensureSafeComponent(ValidatingForm, this));
    this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

    await render(
      hbs`<this.form
  @elementComponent={{this.formElement}}
  @model={{this.model}}
  @validate={{false}}
  @showValidations={{true}}
  as |form|
><form.element @errors={{this.errors}} /></this.form>`,
    );

    assert
      .dom(formFeedbackElement())
      .hasClass(
        validationErrorClass(),
        'validation errors are shown when @showValidations is true',
      );
    assert.dom(`.${formFeedbackClass()}`).hasText('There is an error');
  });

  test('Form with valid validation shows validation success immediately when @showValidations is true', async function (assert) {
    let model = {};
    this.set('model', model);
    this.set('errors', A([]));

    this.set('form', ensureSafeComponent(ValidatingForm, this));
    this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

    await render(
      hbs`<this.form
  @elementComponent={{this.formElement}}
  @model={{this.model}}
  @validate={{false}}
  @showValidations={{true}}
  as |form|
><form.element @errors={{this.errors}} /></this.form>`,
    );

    assert
      .dom(formFeedbackElement())
      .hasClass(
        validationSuccessClass(),
        'validation success is shown when @showValidations is true',
      );
  });

  test('Form with invalid validation does not show validation success or errors when @showValidations is false', async function (assert) {
    let model = {};
    this.set('model', model);
    this.set('errors', A(['There is an error']));

    this.set('form', ensureSafeComponent(ValidatingForm, this));
    this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

    await render(
      hbs`<this.form
  @elementComponent={{this.formElement}}
  @model={{this.model}}
  @validate={{false}}
  @showValidations={{false}}
  as |form|
><form.element @errors={{this.errors}} /></this.form>`,
    );

    assert
      .dom(formFeedbackElement())
      .hasNoClass(
        validationErrorClass(),
        "validation errors aren't shown before user interaction",
      );
    assert
      .dom(formFeedbackElement())
      .hasNoClass(
        validationSuccessClass(),
        "validation success isn't shown before user interaction",
      );
    await triggerEvent('form', 'submit');

    assert
      .dom(formFeedbackElement())
      .hasNoClass(
        validationErrorClass(),
        "validation errors aren't shown after user interaction",
      );
    assert
      .dom(formFeedbackElement())
      .hasNoClass(
        validationSuccessClass(),
        "validation success isn't shown after user interaction",
      );
  });

  test('Form with valid validation does not show validation success or errors when @showValidations is false', async function (assert) {
    let model = {};
    this.set('model', model);
    this.set('errors', A([]));

    this.set('form', ensureSafeComponent(ValidatingForm, this));
    this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

    await render(
      hbs`<this.form
  @elementComponent={{this.formElement}}
  @model={{this.model}}
  @validate={{false}}
  @showValidations={{false}}
  as |form|
><form.element @errors={{this.errors}} /></this.form>`,
    );

    assert
      .dom(formFeedbackElement())
      .hasNoClass(
        validationErrorClass(),
        "validation errors aren't shown before user interaction",
      );
    assert
      .dom(formFeedbackElement())
      .hasNoClass(
        validationSuccessClass(),
        "validation success isn't shown before user interaction",
      );
    await triggerEvent('form', 'submit');

    assert
      .dom(formFeedbackElement())
      .hasNoClass(
        validationErrorClass(),
        "validation errors aren't shown after user interaction",
      );
    assert
      .dom(formFeedbackElement())
      .hasNoClass(
        validationSuccessClass(),
        "validation success isn't shown after user interaction",
      );
  });

  // skipping for now due to https://github.com/kaliber5/ember-bootstrap/issues/1682
  // @todo re-enable when this has been resolved
  skip('it does not catch errors thrown by synchronous @onSubmit action', async function (assert) {
    let onErrorStub = sinon.stub();
    let expectedError = new Error();

    this.set('submitAction', () => {
      throw expectedError;
    });
    setupOnerror(onErrorStub);

    await render(hbs`<BsForm @onSubmit={{this.submitAction}}>
  <button type='submit'>submit</button>
</BsForm>`);
    await click('button');
    assert.ok(onErrorStub.calledOnceWith(expectedError));
  });

  skip('it does not catch errors thrown by async @onSubmit action', async function (assert) {
    let onErrorStub = sinon.stub();
    let expectedError = new Error();

    this.set('submitAction', async () => {
      throw expectedError;
    });
    setupOnerror(onErrorStub);

    await render(hbs`<BsForm @onSubmit={{this.submitAction}}>
  <button type='submit'>submit</button>
</BsForm>`);
    await click('button');
    assert.ok(onErrorStub.calledOnceWith(expectedError));
  });

  test('form with validation has novalidate attribute', async function (assert) {
    let model = {};
    this.set('model', model);
    this.set('form', ensureSafeComponent(ValidatingForm, this));
    await render(hbs`<this.form @model={{this.model}}>Test</this.form>`);

    assert.dom('form').hasAttribute('novalidate');
  });

  test('form with validation allows overriding novalidate attribute', async function (assert) {
    let model = {};
    this.set('model', model);
    this.set('form', ensureSafeComponent(ValidatingForm, this));
    await render(
      hbs`<this.form @model={{this.model}} novalidate={{false}}>Test</this.form>`,
    );

    assert.dom('form').doesNotHaveAttribute('novalidate');
  });

  testRequiringFocus(
    'Submitting a form continues to show validations',
    async function (assert) {
      let model = {};
      this.set('model', model);
      let errors = A([]);
      this.set('errors', errors);
      let deferredSubmitAction = defer();
      this.set('submitAction', () => {
        return deferredSubmitAction.promise;
      });

      this.set('form', ensureSafeComponent(ValidatingForm, this));
      this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

      await render(
        hbs`<this.form
  @elementComponent={{this.formElement}}
  @model={{this.model}}
  @onSubmit={{this.submitAction}}
  as |form|
>
  <form.element @property='dummy' @errors={{this.errors}} />
</this.form>`,
      );

      assert
        .dom(formFeedbackElement())
        .hasNoClass(
          validationErrorClass(),
          "validation errors aren't shown before user interaction",
        );

      await focus('input');
      await blur('input');
      await triggerEvent('form', 'submit');

      assert
        .dom(formFeedbackElement())
        .hasClass(
          validationSuccessClass(),
          'validation success is shown when form signals to show all validations',
        );

      // simulate validation errors being added while a submission is ongoing
      run(() => this.errors.pushObject('There is an error'));
      await settled();

      assert
        .dom(formFeedbackElement())
        .hasClass(
          validationErrorClass(),
          'validation errors are shown while submitting',
        );

      deferredSubmitAction.resolve();
      await settled();

      assert
        .dom(formFeedbackElement())
        .hasClass(
          validationErrorClass(),
          'validation errors are shown after submitting',
        );
    },
  );

  testRequiringFocus(
    'Submitting a hideValidationsOnSubmit form with an async onSubmit does not show validation errors when submitting',
    async function (assert) {
      let model = {};
      this.set('model', model);
      this.set('errors', A([]));
      this.set('validateStub', () =>
        this.errors.length > 0 ? Promise.reject() : Promise.resolve(),
      );
      let deferredSubmitAction = defer();
      this.set('submitAction', () => {
        return deferredSubmitAction.promise;
      });

      this.set('form', ensureSafeComponent(ValidatingForm, this));
      this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

      await render(
        hbs`<this.form
  @elementComponent={{this.formElement}}
  @hideValidationsOnSubmit={{true}}
  @model={{this.model}}
  @onSubmit={{this.submitAction}}
  @validate={{this.validateStub}}
  as |form|
>
  <form.element @property='dummy' @errors={{this.errors}} />
</this.form>`,
      );

      assert
        .dom(formFeedbackElement())
        .hasNoClass(
          validationErrorClass(),
          "validation errors aren't shown before user interaction",
        );

      await focus('input');
      await blur('input');
      await triggerEvent('form', 'submit');

      // simulate validation errors being added while a submission is ongoing
      run(() => this.errors.pushObject('There is an error'));
      await settled();

      assert
        .dom(formFeedbackElement())
        .hasNoClass(
          validationErrorClass(),
          "validation errors aren't shown while submitting",
        );

      deferredSubmitAction.resolve();
      await settled();

      assert
        .dom(formFeedbackElement())
        .hasNoClass(
          validationErrorClass(),
          "validation errors aren't shown after submitting",
        );

      await focus('input');
      await blur('input');

      // form element has been changed, and has errors now, so validations must show up
      assert
        .dom(formFeedbackElement())
        .hasClass(
          validationErrorClass(),
          'validation errors are shown after form submission',
        );
      assert.dom(`.${formFeedbackClass()}`).hasText('There is an error');
    },
  );

  testRequiringFocus(
    'Submitting a hideValidationsOnSubmit form does not show validation errors when submitting',
    async function (assert) {
      let model = {};
      this.set('model', model);
      this.set('errors', A([]));
      this.set('validateStub', () =>
        this.errors.length > 0 ? Promise.reject() : Promise.resolve(),
      );
      this.set('submitAction', () => {});

      this.set('form', ensureSafeComponent(ValidatingForm, this));
      this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

      await render(
        hbs`<this.form
  @elementComponent={{this.formElement}}
  @hideValidationsOnSubmit={{true}}
  @model={{this.model}}
  @onSubmit={{this.submitAction}}
  @validate={{this.validateStub}}
  as |form|
>
  <form.element @property='dummy' @errors={{this.errors}} />
</this.form>`,
      );

      assert
        .dom(formFeedbackElement())
        .hasNoClass(
          validationErrorClass(),
          "validation errors aren't shown before user interaction",
        );

      await focus('input');
      await blur('input');
      await triggerEvent('form', 'submit');

      // simulate validation errors being added while a submission is ongoing
      run(() => this.errors.pushObject('There is an error'));
      await settled();

      assert
        .dom(formFeedbackElement())
        .hasNoClass(
          validationErrorClass(),
          "validation errors aren't shown after submitting",
        );

      await focus('input');
      await blur('input');

      // form element has been changed, and has errors now, so validations must show up
      assert
        .dom(formFeedbackElement())
        .hasClass(
          validationErrorClass(),
          'validation errors are shown after form submission',
        );
      assert.dom(`.${formFeedbackClass()}`).hasText('There is an error');
    },
  );

  // @todo enable again when/if https://github.com/glimmerjs/glimmer-vm/pull/1298 is resolved
  skip('it supports hash helper as model', async function (assert) {
    this.set('submitAction', function (model) {
      assert.step('submit');
      assert.equal(model.name, 'Moritz');
    });

    await render(hbs`<BsForm @model={{hash name='Max'}} @onSubmit={{this.submitAction}} as |form|>
  <form.element @property='name' />
</BsForm>`);

    await fillIn('input', 'Moritz');
    await triggerEvent('form', 'submit');

    assert.verifySteps(['submit']);
  });

  test('it yields submit action', async function (assert) {
    let submit = sinon.spy();
    this.actions.submit = submit;
    await render(hbs`<BsForm @onSubmit={{action 'submit'}} as |form|>
  <a href='#' role='button' onclick={{action form.submit}}>submit</a>
</BsForm>`);

    await click('a');
    assert.ok(submit.calledOnce, 'onSubmit action has been called');
  });

  test('yielded submit action returns a promise', async function (assert) {
    class TestComponent extends Component {
      @action
      click() {
        let ret = this.args.onClick();
        assert.ok(ret instanceof Promise);
      }
    }
    setComponentTemplate(
      hbs`<button type='button' {{on 'click' this.click}} />`,
      TestComponent,
    );
    this.set('testComponent', TestComponent);

    await render(hbs`<BsForm as |form|>
  <this.testComponent @onClick={{form.submit}} />
</BsForm>`);
    await click('button');
  });

  test('yielded submit action resolves for expected scenarios', async function (assert) {
    let scenarios = [
      { onSubmit() {} },
      { onSubmit: sinon.fake.resolves() },
      { onSubmit() {}, resolve: true },
      { onSubmit: sinon.fake.resolves(), resolve: true },
    ];

    class TestComponent extends Component {
      @action
      async click() {
        try {
          let ret = await this.args.onClick();
          assert.ok(true, 'resolves');
          assert.strictEqual(ret, undefined, 'resolves with undefined');
        } catch (err) {
          assert.ok(false, err);
        }
      }
    }
    setComponentTemplate(
      hbs`<button type='button' {{on 'click' this.click}} />`,
      TestComponent,
    );
    this.set('testComponent', TestComponent);

    class ValidForm extends Form {
      get hasValidator() {
        return true;
      }

      validate() {
        return this.args.resolve ? Promise.resolve() : undefined;
      }
    }

    this.set('form', ValidForm);

    assert.expect(scenarios.length * 2);

    for (let i = 0; i < scenarios.length; i++) {
      this.setProperties(scenarios[i]);
      await render(hbs`<this.form @onSubmit={{this.onSubmit}} @resolve={{this.resolve}} as |form|>
  <this.testComponent @onClick={{form.submit}} />
</this.form>`);
      await click('button');
    }
  });

  test('yielded submit action rejects for expected scenarios', async function (assert) {
    let scenarios = [
      {
        validate: sinon.fake.rejects('rejected value'),
        onSubmit: sinon.fake.resolves(),
      },
      {
        validate: sinon.fake.resolves(),
        onSubmit: sinon.fake.rejects('rejected value'),
      },
    ];

    class TestComponent extends Component {
      @action
      click() {
        assert.rejects(this.args.onSubmit(), 'rejected value');
      }
    }
    setComponentTemplate(
      hbs`<button type='button' {{on 'click' this.click}} />`,
      TestComponent,
    );
    this.set('testComponent', TestComponent);

    class ValidatingForm extends Form {
      get hasValidator() {
        return true;
      }

      validate() {
        return this.args.validate();
      }
    }

    this.set('form', ValidatingForm);

    assert.expect(scenarios.length);

    for (let i = 0; i < scenarios.length; i++) {
      this.setProperties(scenarios[i]);
      await render(hbs`<this.form @onSubmit={{this.onSubmit}} @validate={{this.validate}} as |form|>
  <this.testComponent @onSubmit={{form.submit}} />
</this.form>`);
      await click('button');
    }
  });

  test('Yields #isSubmitting', async function (assert) {
    let deferredSubmitAction = defer();
    this.set('submitAction', () => {
      return deferredSubmitAction.promise;
    });
    await render(hbs`<BsForm @onSubmit={{this.submitAction}} as |form|>
  <div class='state {{if form.isSubmitting "is-submitting"}}'></div>
</BsForm>`);

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
    await render(hbs`<BsForm
  @onSubmit={{this.submitAction}}
  @validate={{this.validate}}
  @hasValidator={{this.hasValidator}}
  as |form|
>
  <div class='state {{if form.isSubmitting "is-submitting"}}'></div>
</BsForm>`);

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
    await render(hbs`<BsForm @onSubmit={{this.submitAction}} as |form|>
  <div class='state {{if form.isSubmitting "is-submitting"}}'></div>
</BsForm>`);

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
    this.set('form', ValidatingForm);

    await render(hbs`<this.form @onInvalid={{this.submitAction}} @validate={{false}} as |form|>
  <div class='state {{if form.isSubmitting "is-submitting"}}'></div>
</this.form>`);

    assert.dom('form .state').doesNotHaveClass('is-submitting');

    triggerEvent('form', 'submit');
    await waitFor('form .state.is-submitting');

    deferredSubmitAction.resolve();
    await settled();
    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitting is true as long as Promise returned by validate is pending', async function (assert) {
    let deferredValidateAction = defer();
    this.set('validateAction', () => {
      return deferredValidateAction.promise;
    });

    this.set('form', ensureSafeComponent(ValidatingForm, this));

    await render(hbs`<this.form @validate={{this.validateAction}} as |form|>
  <div class='state {{if form.isSubmitting "is-submitting"}}'></div>
</this.form>`);

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

    this.set('form', ensureSafeComponent(ValidatingForm, this));

    await render(hbs`<this.form
  @onSubmit={{this.submitAction}}
  @validate={{this.validateAction}}
  as |form|
>
  <div class='state {{if form.isSubmitting "is-submitting"}}'></div>
</this.form>`);

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
    await render(hbs`<BsForm @onSubmit={{this.submitAction}} @preventConcurrency={{false}} as |form|>
  <div class='state {{if form.isSubmitting "is-submitting"}}'></div>
</BsForm>`);

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
    this.actions.submit = sinon.fake.resolves();
    await render(hbs`<BsForm @onSubmit={{action 'submit'}} as |form|>
  <button
    type='submit'
    class={{if form.isSubmitted 'is-submitted'}}
  >submit</button>
</BsForm>`);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted');
  });

  test('Yielded #isSubmitted is true if onSubmit is undefined', async function (assert) {
    await render(hbs`<BsForm as |form|>
  <button
    type='submit'
    class={{if form.isSubmitted 'is-submitted'}}
  >submit</button>
</BsForm>`);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted');
  });

  test('Yielded #isSubmitted is true if validation passes', async function (assert) {
    this.actions.validate = sinon.fake.resolves();
    await render(hbs`<BsForm @validate={{action 'validate'}} as |form|>
  <button
    type='submit'
    class={{if form.isSubmitted 'is-submitted'}}
  >submit</button>
</BsForm>`);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted');
  });

  test('A change to a form elements resets yielded #isSubmitted', async function (assert) {
    this.model = {};
    this.actions.submit = sinon.fake.resolves();
    await render(hbs`<BsForm @onSubmit={{action 'submit'}} @model={{this.model}} as |form|>
  <form.element @property='foo' />
  <button
    type='submit'
    class={{if form.isSubmitted 'is-submitted'}}
  >submit</button>
</BsForm>`);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted', 'assumption');

    await fillIn('input', 'bar');
    assert.dom('form button').doesNotHaveClass('is-submitted');
  });

  test('Yielded #isRejected is true if onSubmit action rejects', async function (assert) {
    // tests fail by default on unhandled errors
    let expectedError = new Error();

    this.actions.submit = sinon.fake.rejects(expectedError);
    await render(hbs`<BsForm @onSubmit={{action 'submit'}} as |form|>
  <button
    type='submit'
    class={{if form.isRejected 'is-rejected'}}
  >submit</button>
</BsForm>`);

    await assert.rejectsErrorNotHandledByEmberOnError(async () => {
      await triggerEvent('form', 'submit');
    }, expectedError);

    assert.dom('form button').hasClass('is-rejected');
  });

  test('Yielded #isRejected is true if validation fails', async function (assert) {
    this.set('form', ensureSafeComponent(ValidatingForm, this));
    await render(hbs`<this.form @validate={{false}} as |form|>
  <button
    type='submit'
    class={{if form.isRejected 'is-rejected'}}
  >submit</button>
</this.form>`);

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-rejected');
  });

  test('A change to a form elements resets yielded #isRejected', async function (assert) {
    // tests fail by default on unhandled errors
    let expectedError = new Error();

    this.model = {};
    this.actions.submit = sinon.fake.rejects(expectedError);
    await render(hbs`<BsForm @onSubmit={{action 'submit'}} @model={{this.model}} as |form|>
  <form.element @property='foo' />
  <button
    type='submit'
    class={{if form.isRejected 'is-rejected'}}
  >submit</button>
</BsForm>`);

    await assert.rejectsErrorNotHandledByEmberOnError(async () => {
      await triggerEvent('form', 'submit');
    }, expectedError);

    assert.dom('form button').hasClass('is-rejected', 'assumption');

    await fillIn('input', 'bar');
    assert.dom('form button').doesNotHaveClass('is-rejected');
  });

  test('Triggering resetSubmissionState resets submission state of form', async function (assert) {
    this.model = {};
    this.actions.submit = sinon.fake.resolves();
    await render(hbs`<BsForm @onSubmit={{action 'submit'}} @model={{this.model}} as |form|>
  <input onchange={{form.resetSubmissionState}} />
  {{#if form.isSubmitting}}isSubmitting{{/if}}
  {{#if form.isSubmitted}}isSubmitted{{/if}}
  {{#if form.isRejected}}isRejected{{/if}}
</BsForm>`);

    await triggerEvent('form', 'submit');
    assert.dom('form').hasText('isSubmitted');

    await fillIn('input', 'bar');
    assert.dom('form').hasNoText();
  });

  test("Adds default onChange action to form elements that updates model's property", async function (assert) {
    let model = EmberObject.create({
      name: 'foo',
    });
    this.set('model', model);
    await render(hbs`<BsForm @model={{this.model}} as |form|>
  <form.element @property='name' />
</BsForm>`);

    assert.dom('input').hasValue('foo', 'input has model property value');

    await fillIn('input', 'bar');
    await triggerEvent('input', 'input');
    assert.equal(model.get('name'), 'bar', 'model property was updated');
  });

  testRequiringFocus(
    'Pressing enter on a form with submitOnEnter submits the form',
    async function (assert) {
      let submit = sinon.spy();
      this.actions.submit = submit;
      await render(
        hbs`<BsForm @onSubmit={{action 'submit'}} @submitOnEnter={{true}} />`,
      );
      await triggerKeyEvent('form', 'keypress', 13);
      assert.ok(submit.calledOnce, 'onSubmit action has been called');
    },
  );

  testRequiringFocus(
    'Pressing enter on a form with multiple input elements and submitOnEnter submits the form',
    async function (assert) {
      let submit = sinon.spy();
      this.actions.submit = submit;
      await render(hbs`<BsForm @onSubmit={{action 'submit'}} @submitOnEnter={{true}} as |form|>
  <form.element @property='input1' />
  <form.element @property='input2' />
</BsForm>`);
      await triggerKeyEvent('input', 'keypress', 13);
      assert.ok(submit.calledOnce, 'onSubmit action has been called');
    },
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
      return Promise.resolve();
    });
    await render(hbs`<BsForm
  @onSubmit={{this.submitAction}}
  @onBefore={{this.beforeAction}}
  @validate={{this.validate}}
/>`);

    triggerEvent('form', 'submit');
    await waitUntil(() => submitActionHasBeenExecuted);

    this.set('submitAction', () => {
      assert.ok(false, 'onSubmit action is not executed concurrently');
    });
    this.set('beforeAction', () => {
      assert.ok(
        false,
        'onBefore action is not executed if concurrent submission has been dropped',
      );
    });
    this.set('validate', () => {
      assert.ok(
        false,
        'validate is not executed if concurrent submission has been dropped',
      );
    });
    await triggerEvent('form', 'submit');

    deferredSubmitAction.resolve();
    await settled();
    this.set('submitAction', () => {
      assert.step('onSubmit action');
    });
    this.set('beforeAction', () => {});
    this.set('validate', () => {
      return Promise.resolve();
    });
    await triggerEvent('form', 'submit');
    assert.verifySteps(
      ['onSubmit action'],
      'onSubmit action is fired again after pending submission is settled',
    );
  });

  test('preventConcurrency=false allows submission to be fired concurrently', async function (assert) {
    let deferredSubmitAction = defer();
    let submitActionExecutionCounter = 0;

    let beforeActionFake = sinon.fake();
    let validateFake = sinon.fake();

    this.set('submitAction', () => {
      submitActionExecutionCounter++;
      return deferredSubmitAction.promise;
    });
    this.set('beforeAction', beforeActionFake);
    this.set('validate', validateFake);

    this.set('form', ensureSafeComponent(ValidatingForm, this));

    await render(hbs`<this.form
  @preventConcurrency={{false}}
  @onSubmit={{this.submitAction}}
  @onBefore={{this.beforeAction}}
  @validate={{this.validate}}
/>`);

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
      hbs`<BsForm @model={{this}} @disabled={{true}} as |form|>
  <form.element @property='dummy' data-test-form-element />
</BsForm>`,
    );

    assert.dom('[data-test-form-element] input').hasAttribute('disabled');
  });

  test('readOnly property propagates to all its elements', async function (assert) {
    await render(
      hbs`<BsForm @model={{this}} @readonly={{true}} as |form|>
  <form.element @property='dummy' data-test-form-element />
</BsForm>`,
    );

    assert.dom('[data-test-form-element] input').hasAttribute('readonly');
  });

  test('it passes accessibility checks', async function (assert) {
    await render(
      hbs`<BsForm @model={{this}} as |form|>
  <form.element @property='dummy' @label='Dummy' />
</BsForm>`,
    );

    await a11yAudit();
    assert.ok(true, 'A11y audit passed');
  });

  module('yielded submitButton', function () {
    test('it yields submitButton component', async function (assert) {
      await render(hbs`<BsForm as |form|>
  <form.submitButton />
</BsForm>`);

      assert
        .dom('form button')
        .exists('yielded submitButton component renders a button element');
      assert
        .dom('form button')
        .hasAttribute('type', 'submit', 'its type is submit');
      assert
        .dom('form button')
        .hasClass('btn-primary', 'its a primary button by default');
    });

    test('click yielded submitButton component submits the form', async function (assert) {
      this.set('submitHandler', () => {
        assert.step('@onSubmit action is exected');
      });

      await render(hbs`<BsForm @onSubmit={{this.submitHandler}} as |form|>
  <form.submitButton />
</BsForm>`);
      await click('button');
      assert.verifySteps(['@onSubmit action is exected']);
    });

    ['submitted via event', 'submitted via yielded submitButton'].forEach(
      (scenario) => {
        async function submitForm() {
          switch (scenario) {
            case 'submitted via event':
              await triggerEvent('form', 'submit');
              break;

            case 'submitted via yielded submitButton':
              await click('button');
              break;

            default:
              throw new Error('scenario is not supported');
          }
        }

        test(`state of yielded submitButton component is bound to form submission state if ${scenario}`, async function (assert) {
          let deferredSubmitAction = defer();

          this.set('resetTrigger', false);
          this.set('submitHandler', () => {
            return deferredSubmitAction.promise;
          });

          await render(hbs`<BsForm @onSubmit={{this.submitHandler}} as |form|>
  <form.submitButton as |button|>
    {{#if button.isPending}}isPending{{/if}}
    {{#if button.isFulfilled}}isFulfilled{{/if}}
    {{#if button.isRejected}}isRejected{{/if}}
    {{#if button.isSettled}}isSettled{{/if}}
  </form.submitButton>
  <button type='button' {{on 'click' form.resetSubmissionState}}>
  </button>
</BsForm>`);
          assert.dom('button[type="submit"]').hasNoText();
          assert.dom('button[type="submit"]').hasNoAttribute('disabled');

          await submitForm();
          assert.dom('button[type="submit"]').hasText('isPending');
          assert.dom('button[type="submit"]').hasAttribute('disabled', '');

          deferredSubmitAction.resolve();
          await settled();
          assert.dom('button[type="submit"]').hasText('isFulfilled isSettled');
          assert.dom('button[type="submit"]').hasNoAttribute('disabled');

          deferredSubmitAction = defer();
          await click('button[type="button"]');
          assert.dom('button[type="submit"]').hasNoText();
          assert.dom('button[type="submit"]').hasNoAttribute('disabled');

          await submitForm();
          assert.dom('button[type="submit"]').hasText('isPending');
          assert.dom('button[type="submit"]').hasAttribute('disabled', '');

          const expectedError = new Error();
          await assert.rejectsErrorNotHandledByEmberOnError(async () => {
            deferredSubmitAction.reject(expectedError);
            await settled();
          }, expectedError);

          assert.dom('button[type="submit"]').hasText('isRejected isSettled');
          assert.dom('button[type="submit"]').hasNoAttribute('disabled');
        });
      },
    );
  });

  test('arguments @onBefore, @onSubmit, @onInvalid can be undefined', async function (assert) {
    assert.expect(0);

    this.set('onBefore', undefined);
    this.set('onSubmit', undefined);
    this.set('onInvalid', undefined);

    await render(hbs`<BsForm
  @onBefore={{this.onBefore}}
  @onSubmit={{this.onSubmit}}
  @onInvalid={{this.onInvalid}}
/>`);
    await triggerEvent('form', 'submit');
  });

  test('it uses default value false for disabled argument if undefined', async function (assert) {
    this.set('disabled', undefined);
    await render(
      hbs`<BsForm @disabled={{this.disabled}} as |form|>
  <form.element />
</BsForm>`,
    );
    assert.dom('input').doesNotHaveAttribute('disabled');
  });

  test('it uses default value for formLayout argument if undefined', async function (assert) {
    this.set('formLayout', undefined);
    await render(hbs`<BsForm @formLayout={{this.formLayout}} />`);
    assert.dom('form').doesNotHaveAttribute('class');
  });

  test('it uses a POJO as model if undefined', async function (assert) {
    this.set('model', undefined);
    this.set('submitHandler', (model) => {
      assert.step('submit action on untouched form');
      assert.strictEqual(typeof model, 'object');
    });
    await render(hbs`<BsForm @model={{this.model}} @onSubmit={{this.submitHandler}} as |form|>
  <form.element @property='name' />
</BsForm>`);
    await triggerEvent('form', 'submit');
    assert.verifySteps(['submit action on untouched form']);

    this.set('submitHandler', (model) => {
      assert.step('submit action after user input');
      assert.deepEqual(model, { name: 'John Doe' });
    });
    await fillIn('input', 'John Doe');
    await triggerEvent('form', 'submit');
    assert.verifySteps(['submit action after user input']);
  });

  test('POJO created for model if undefined does not leak between two instances', async function (assert) {
    this.set('model', undefined);
    this.set('submitHandlerForFirstForm', (model) => {
      assert.step('first form submitted');
      assert.deepEqual(
        model,
        { name: 'John Doe' },
        'name is set on model for first form',
      );
    });
    this.set('submitHandlerForSecondForm', (model) => {
      assert.step('second form submitted');
      assert.deepEqual(model, {}, 'name is not set on model for second form');
    });
    await render(hbs`<BsForm
  @model={{this.model}}
  @onSubmit={{this.submitHandlerForFirstForm}}
  data-test-first-form
  as |form|
>
  <form.element @property='name' />
</BsForm>
<BsForm
  @model={{this.model}}
  @onSubmit={{this.submitHandlerForSecondForm}}
  data-test-second-form
/>`);
    await fillIn('input', 'John Doe');
    await triggerEvent('[data-test-first-form]', 'submit');
    await triggerEvent('[data-test-second-form]', 'submit');
    assert.verifySteps(['first form submitted', 'second form submitted']);
  });

  test('it uses default value false for readonly argument if undefined', async function (assert) {
    this.set('readonly', undefined);
    await render(
      hbs`<BsForm @readonly={{this.readonly}} as |form|>
  <form.element />
</BsForm>`,
    );
    assert.dom('input').doesNotHaveAttribute('readonly');
  });

  /**
   * @see https://github.com/kaliber5/ember-bootstrap/issues/1414
   */
  test('it does not have a showOwnValidation bug', async function (assert) {
    assert.expect(1);
    this.set('submit', ({ name }) => assert.equal(name, 'Zoey'));
    this.set('beforeSubmit', (model) => {
      if (this.user) {
        model.set('name', this.user.name);
      }
    });

    await render(hbs`<BsForm
  @model={{this}}
  @onBefore={{this.beforeSubmit}}
  @onSubmit={{this.submit}}
  as |Form|
>
  {{#unless this.user}}
    <Form.element @property='name' />
  {{/unless}}

  <Form.submitButton @defaultText='Submit' />
</BsForm>`);

    await fillIn('input', 'Tomster');

    this.set('user', { name: 'Zoey' });

    await click('button');
  });

  test('it provides model access inside form object', async function (assert) {
    await render(hbs`<BsForm @model={{this.model}} @onSubmit={{this.submitHandler}} as |form|>
  <form.element @property='name' />
  <label id='name'>{{form.model.name}}</label>
</BsForm>`);

    assert.dom(this.element.querySelector('#name')).hasText('');
    await fillIn('input', 'John Doe');
    assert.dom(this.element.querySelector('#name')).hasText('John Doe');
  });
});
