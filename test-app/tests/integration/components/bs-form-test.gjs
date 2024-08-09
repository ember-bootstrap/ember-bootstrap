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
import { next, run } from '@ember/runloop';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import sinon from 'sinon';
import Form from 'ember-bootstrap/components/bs-form';
import FormElement from 'ember-bootstrap/components/bs-form/element';
import { ensureSafeComponent } from '@embroider/util';
import { setupAssertionsForErrorsNotHandledByEmberOnError } from '../../helpers/assert-errors';
import Component from '@glimmer/component';
import BsForm from 'ember-bootstrap/components/bs-form';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

const nextRunloop = function () {
  return new Promise((resolve) => {
    // eslint-disable-next-line ember/no-runloop
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

  testBS4('form has correct markup', async function (assert) {
    let classSpec = {
      vertical: ['form', false],
      horizontal: ['form-horizontal', false],
      inline: ['form-inline', true],
    };

    for (const layout in classSpec) {
      await render(
        <template>
          <BsForm @formLayout={{layout}}>Test</BsForm>
        </template>,
      );

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
      <template>
        <BsForm as |form|><form.element data-test-form-element /></BsForm>
      </template>,
    );

    assert
      .dom('[data-test-form-element]')
      .exists({ count: 1 }, 'form has element');
  });

  test('Submitting the form calls onBeforeSubmit and onSubmit action', async function (assert) {
    const submit = sinon.spy();
    const before = sinon.spy();
    const invalid = sinon.spy();
    const model = {};
    await render(
      <template>
        <BsForm
          @model={{model}}
          @onBefore={{before}}
          @onSubmit={{submit}}
          @onInvalid={{invalid}}
        >Test</BsForm>
      </template>,
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
    const submit = sinon.spy();
    await render(
      <template>
        <BsForm @onSubmit={{submit}}><button
            type='submit'
          >Submit</button></BsForm>
      </template>,
    );

    await click('button');
    assert.ok(submit.calledOnce, 'onSubmit action has been called');
  });

  test('Submit event bubbles', async function (assert) {
    const submitAction = () => assert.step('bubbles');

    // Enable again when hbs plugin works again _eslint-disable-next-line hbs/check-hbs-template-literals
    await render(
      <template>
        <div {{on 'submit' submitAction}}>
          <BsForm>
            <button type='submit'>submit</button>
          </BsForm>
        </div>
      </template>,
    );
    await click('button');

    assert.verifySteps(['bubbles']);
  });

  test('form that supports validation calls validate hook when submitting', async function (assert) {
    const model = {};

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

    await render(
      <template>
        <ValidatingForm @model={{model}}>Test</ValidatingForm>
      </template>,
    );
    await triggerEvent('form', 'submit');

    assert.verifySteps(['validate'], 'validate has been called');
  });

  test('form that supports validation calls validate hook when calling submit action', async function (assert) {
    const model = {};

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

    await render(
      <template>
        <ValidatingForm @model={{model}} as |form|>
          <button type='button' {{on 'click' form.submit}}>Submit</button>
        </ValidatingForm>
      </template>,
    );
    await click('button');

    assert.verifySteps(['validate'], 'validate has been called');
  });

  test('Submitting the form with valid validation calls onBeforeSubmit and onSubmit action', async function (assert) {
    const submit = sinon.spy();
    const before = sinon.spy();
    const invalid = sinon.spy();
    const model = {};

    await render(
      <template>
        <ValidatingForm
          @model={{model}}
          @onBefore={{before}}
          @onSubmit={{submit}}
          @onInvalid={{invalid}}
        >
          Test
        </ValidatingForm>
      </template>,
    );

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
    const submit = sinon.spy();
    const before = sinon.spy();
    const invalid = sinon.spy();
    const model = {};

    await render(
      <template>
        <ValidatingForm
          @model={{model}}
          @validate={{false}}
          @onBefore={{before}}
          @onSubmit={{submit}}
          @onInvalid={{invalid}}
        >Test</ValidatingForm>
      </template>,
    );

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
    const model = {};
    const errors = ['There is an error'];
    const formElement = ensureSafeComponent(ValidatingFormElement, this);

    await render(
      <template>
        <ValidatingForm
          @elementComponent={{formElement}}
          @model={{model}}
          @validate={{false}}
          as |form|
        ><form.element @errors={{errors}} /></ValidatingForm>
      </template>,
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
    const model = {};
    const errors = ['There is an error'];
    const deferredInvalidAction = defer();
    const invalid = () => deferredInvalidAction.promise;

    const formElement = ensureSafeComponent(ValidatingFormElement, this);

    await render(
      <template>
        <ValidatingForm
          @elementComponent={{formElement}}
          @model={{model}}
          @onInvalid={{invalid}}
          @validate={{false}}
          as |form|
        ><form.element @errors={{errors}} /></ValidatingForm>
      </template>,
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
    const model = {};
    const errors = A(['There is an error']);
    const formElement = ensureSafeComponent(ValidatingFormElement, this);

    await render(
      <template>
        <ValidatingForm
          @elementComponent={{formElement}}
          @model={{model}}
          @validate={{false}}
          @showValidations={{true}}
          as |form|
        ><form.element @errors={{errors}} /></ValidatingForm>
      </template>,
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
    const model = {};
    const errors = [];
    const formElement = ensureSafeComponent(ValidatingFormElement, this);

    await render(
      <template>
        <ValidatingForm
          @elementComponent={{formElement}}
          @model={{model}}
          @validate={{false}}
          @showValidations={{true}}
          as |form|
        ><form.element @errors={{errors}} /></ValidatingForm>
      </template>,
    );

    assert
      .dom(formFeedbackElement())
      .hasClass(
        validationSuccessClass(),
        'validation success is shown when @showValidations is true',
      );
  });

  test('Form with invalid validation does not show validation success or errors when @showValidations is false', async function (assert) {
    const model = {};
    const errors = ['There is an error'];
    const formElement = ensureSafeComponent(ValidatingFormElement, this);

    await render(
      <template>
        <ValidatingForm
          @elementComponent={{formElement}}
          @model={{model}}
          @validate={{false}}
          @showValidations={{false}}
          as |form|
        ><form.element @errors={{errors}} /></ValidatingForm>
      </template>,
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
    const model = {};
    const errors = A([]);
    const formElement = ensureSafeComponent(ValidatingFormElement, this);

    await render(
      <template>
        <ValidatingForm
          @elementComponent={{formElement}}
          @model={{model}}
          @validate={{false}}
          @showValidations={{false}}
          as |form|
        ><form.element @errors={{errors}} /></ValidatingForm>
      </template>,
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
    const onErrorStub = sinon.stub();
    const expectedError = new Error();

    const submitAction = () => {
      throw expectedError;
    };
    setupOnerror(onErrorStub);

    await render(
      <template>
        <BsForm @onSubmit={{submitAction}}>
          <button type='submit'>submit</button>
        </BsForm>
      </template>,
    );
    await click('button');
    assert.ok(onErrorStub.calledOnceWith(expectedError));
  });

  skip('it does not catch errors thrown by async @onSubmit action', async function (assert) {
    const onErrorStub = sinon.stub();
    const expectedError = new Error();

    const submitAction = async () => {
      throw expectedError;
    };
    setupOnerror(onErrorStub);

    await render(
      <template>
        <BsForm @onSubmit={{submitAction}}>
          <button type='submit'>submit</button>
        </BsForm>
      </template>,
    );
    await click('button');
    assert.ok(onErrorStub.calledOnceWith(expectedError));
  });

  test('form with validation has novalidate attribute', async function (assert) {
    const model = {};
    await render(
      <template>
        <ValidatingForm @model={{model}}>Test</ValidatingForm>
      </template>,
    );

    assert.dom('form').hasAttribute('novalidate');
  });

  test('form with validation allows overriding novalidate attribute', async function (assert) {
    const model = {};
    await render(
      <template>
        <ValidatingForm
          @model={{model}}
          novalidate={{false}}
        >Test</ValidatingForm>
      </template>,
    );

    assert.dom('form').doesNotHaveAttribute('novalidate');
  });

  testRequiringFocus(
    'Submitting a form continues to show validations',
    async function (assert) {
      class State {
        @tracked errors = A([]);
      }
      const state = new State();

      const model = {};
      const deferredSubmitAction = defer();
      const submitAction = () => {
        return deferredSubmitAction.promise;
      };

      const formElement = ensureSafeComponent(ValidatingFormElement, this);

      await render(
        <template>
          <ValidatingForm
            @elementComponent={{formElement}}
            @model={{model}}
            @onSubmit={{submitAction}}
            as |form|
          >
            <form.element @property='dummy' @errors={{state.errors}} />
          </ValidatingForm>
        </template>,
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
      // eslint-disable-next-line ember/no-runloop
      run(() => state.errors.pushObject('There is an error'));
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
      class State {
        @tracked errors = A([]);
      }
      const state = new State();
      const model = {};
      const validateStub = () =>
        state.errors.length > 0 ? Promise.reject() : Promise.resolve();
      const deferredSubmitAction = defer();
      const submitAction = () => {
        return deferredSubmitAction.promise;
      };

      const formElement = ensureSafeComponent(ValidatingFormElement, this);

      await render(
        <template>
          <ValidatingForm
            @elementComponent={{formElement}}
            @hideValidationsOnSubmit={{true}}
            @model={{model}}
            @onSubmit={{submitAction}}
            @validate={{validateStub}}
            as |form|
          >
            <form.element @property='dummy' @errors={{state.errors}} />
          </ValidatingForm>
        </template>,
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
      // eslint-disable-next-line ember/no-runloop
      run(() => state.errors.pushObject('There is an error'));
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
      class State {
        @tracked errors = A([]);
      }
      const state = new State();
      const model = {};
      const validateStub = () =>
        state.errors.length > 0 ? Promise.reject() : Promise.resolve();
      const submitAction = () => {};
      const formElement = ensureSafeComponent(ValidatingFormElement, this);

      await render(
        <template>
          <ValidatingForm
            @elementComponent={{formElement}}
            @hideValidationsOnSubmit={{true}}
            @model={{model}}
            @onSubmit={{submitAction}}
            @validate={{validateStub}}
            as |form|
          >
            <form.element @property='dummy' @errors={{state.errors}} />
          </ValidatingForm>
        </template>,
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
      // eslint-disable-next-line ember/no-runloop
      run(() => state.errors.pushObject('There is an error'));
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
    const submitAction = function (model) {
      assert.step('submit');
      assert.equal(model.name, 'Moritz');
    };

    await render(
      <template>
        <BsForm @model={{hash name='Max'}} @onSubmit={{submitAction}} as |form|>
          <form.element @property='name' />
        </BsForm>
      </template>,
    );

    await fillIn('input', 'Moritz');
    await triggerEvent('form', 'submit');

    assert.verifySteps(['submit']);
  });

  test('it yields submit action', async function (assert) {
    const submit = sinon.spy();
    await render(
      <template>
        <BsForm @onSubmit={{submit}} as |form|>
          <a href='#' role='button' {{on 'click' form.submit}}>submit</a>
        </BsForm>
      </template>,
    );

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

      <template><button type='button' {{on 'click' this.click}} /></template>
    }

    await render(
      <template>
        <BsForm as |form|>
          <TestComponent @onClick={{form.submit}} />
        </BsForm>
      </template>,
    );
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

      <template><button type='button' {{on 'click' this.click}} /></template>
    }

    class ValidForm extends Form {
      get hasValidator() {
        return true;
      }

      validate() {
        return this.args.resolve ? Promise.resolve() : undefined;
      }
    }

    assert.expect(scenarios.length * 2);

    for (let i = 0; i < scenarios.length; i++) {
      const scenario = scenarios[i];
      await render(
        <template>
          <ValidForm
            @onSubmit={{scenario.onSubmit}}
            @resolve={{scenario.resolve}}
            as |form|
          >
            <TestComponent @onClick={{form.submit}} />
          </ValidForm>
        </template>,
      );
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

      <template><button type='button' {{on 'click' this.click}} /></template>
    }

    class ValidatingForm extends Form {
      get hasValidator() {
        return true;
      }

      validate() {
        return this.args.validate();
      }
    }

    assert.expect(scenarios.length);

    for (let i = 0; i < scenarios.length; i++) {
      const scenario = scenarios[i];
      await render(
        <template>
          <ValidatingForm
            @onSubmit={{scenario.onSubmit}}
            @validate={{scenario.validate}}
            as |form|
          >
            <TestComponent @onSubmit={{form.submit}} />
          </ValidatingForm>
        </template>,
      );
      await click('button');
    }
  });

  test('Yields #isSubmitting', async function (assert) {
    let deferredSubmitAction = defer();
    const submitAction = () => {
      return deferredSubmitAction.promise;
    };
    await render(
      <template>
        <BsForm @onSubmit={{submitAction}} as |form|>
          <div class='state {{if form.isSubmitting "is-submitting"}}'></div>
        </BsForm>
      </template>,
    );

    assert.dom('form .state').doesNotHaveClass('is-submitting');

    triggerEvent('form', 'submit');

    await waitFor('form .state.is-submitting');

    deferredSubmitAction.resolve();
    await settled();
    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitting is never true if neither validate nor onSubmit returns Promise', async function (assert) {
    const submitAction = () => {};
    const validate = () => {};
    const hasValidator = true;
    await render(
      <template>
        <BsForm
          @onSubmit={{submitAction}}
          @validate={{validate}}
          @hasValidator={{hasValidator}}
          as |form|
        >
          <div class='state {{if form.isSubmitting "is-submitting"}}'></div>
        </BsForm>
      </template>,
    );

    assert.dom('form .state').doesNotHaveClass('is-submitting');
    triggerEvent('form', 'submit');
    await nextRunloop();

    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitting is true as long as Promise returned by onSubmit is pending', async function (assert) {
    const deferredSubmitAction = defer();
    const submitAction = () => {
      return deferredSubmitAction.promise;
    };
    await render(
      <template>
        <BsForm @onSubmit={{submitAction}} as |form|>
          <div class='state {{if form.isSubmitting "is-submitting"}}'></div>
        </BsForm>
      </template>,
    );

    assert.dom('form .state').doesNotHaveClass('is-submitting');

    triggerEvent('form', 'submit');
    await waitFor('form .state.is-submitting');

    deferredSubmitAction.resolve();
    await settled();
    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitting is true as long as Promise returned by onInvalid is pending', async function (assert) {
    const deferredSubmitAction = defer();
    const submitAction = () => {
      return deferredSubmitAction.promise;
    };

    await render(
      <template>
        <ValidatingForm
          @onInvalid={{submitAction}}
          @validate={{false}}
          as |form|
        >
          <div class='state {{if form.isSubmitting "is-submitting"}}'></div>
        </ValidatingForm>
      </template>,
    );

    assert.dom('form .state').doesNotHaveClass('is-submitting');

    triggerEvent('form', 'submit');
    await waitFor('form .state.is-submitting');

    deferredSubmitAction.resolve();
    await settled();
    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitting is true as long as Promise returned by validate is pending', async function (assert) {
    let deferredValidateAction = defer();
    const validateAction = () => {
      return deferredValidateAction.promise;
    };

    await render(
      <template>
        <ValidatingForm @validate={{validateAction}} as |form|>
          <div class='state {{if form.isSubmitting "is-submitting"}}'></div>
        </ValidatingForm>
      </template>,
    );

    assert.dom('form .state').doesNotHaveClass('is-submitting');

    triggerEvent('form', 'submit');
    await waitFor('form .state.is-submitting');

    deferredValidateAction.resolve();
    await settled();
    assert.dom('form .state').doesNotHaveClass('is-submitting');
  });

  test('Yielded #isSubmitting is true as long as Promises returned by onSubmit and validate are pending', async function (assert) {
    const deferredSubmitAction = defer();
    const deferredValidateAction = defer();
    const submitAction = () => {
      return deferredSubmitAction.promise;
    };
    const validateAction = () => {
      return deferredValidateAction.promise;
    };

    await render(
      <template>
        <ValidatingForm
          @onSubmit={{submitAction}}
          @validate={{validateAction}}
          as |form|
        >
          <div class='state {{if form.isSubmitting "is-submitting"}}'></div>
        </ValidatingForm>
      </template>,
    );

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
    const deferredSubmitActions = [];
    const submitAction = () => {
      let deferred = defer();
      deferredSubmitActions.push(deferred);
      return deferred.promise;
    };
    await render(
      <template>
        <BsForm
          @onSubmit={{submitAction}}
          @preventConcurrency={{false}}
          as |form|
        >
          <div class='state {{if form.isSubmitting "is-submitting"}}'></div>
        </BsForm>
      </template>,
    );

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
    const submit = sinon.fake.resolves();
    await render(
      <template>
        <BsForm @onSubmit={{submit}} as |form|>
          <button
            type='submit'
            class={{if form.isSubmitted 'is-submitted'}}
          >submit</button>
        </BsForm>
      </template>,
    );

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted');
  });

  test('Yielded #isSubmitted is true if onSubmit is undefined', async function (assert) {
    await render(
      <template>
        <BsForm as |form|>
          <button
            type='submit'
            class={{if form.isSubmitted 'is-submitted'}}
          >submit</button>
        </BsForm>
      </template>,
    );

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted');
  });

  test('Yielded #isSubmitted is true if validation passes', async function (assert) {
    const validate = sinon.fake.resolves();
    await render(
      <template>
        <BsForm @validate={{validate}} as |form|>
          <button
            type='submit'
            class={{if form.isSubmitted 'is-submitted'}}
          >submit</button>
        </BsForm>
      </template>,
    );

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted');
  });

  test('A change to a form elements resets yielded #isSubmitted', async function (assert) {
    const model = {};
    const submit = sinon.fake.resolves();
    await render(
      <template>
        <BsForm @onSubmit={{submit}} @model={{model}} as |form|>
          <form.element @property='foo' />
          <button
            type='submit'
            class={{if form.isSubmitted 'is-submitted'}}
          >submit</button>
        </BsForm>
      </template>,
    );

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-submitted', 'assumption');

    await fillIn('input', 'bar');
    assert.dom('form button').doesNotHaveClass('is-submitted');
  });

  test('Yielded #isRejected is true if onSubmit action rejects', async function (assert) {
    // tests fail by default on unhandled errors
    let expectedError = new Error();

    const submit = sinon.fake.rejects(expectedError);
    await render(
      <template>
        <BsForm @onSubmit={{submit}} as |form|>
          <button
            type='submit'
            class={{if form.isRejected 'is-rejected'}}
          >submit</button>
        </BsForm>
      </template>,
    );

    await assert.rejectsErrorNotHandledByEmberOnError(async () => {
      await triggerEvent('form', 'submit');
    }, expectedError);

    assert.dom('form button').hasClass('is-rejected');
  });

  test('Yielded #isRejected is true if validation fails', async function (assert) {
    await render(
      <template>
        <ValidatingForm @validate={{false}} as |form|>
          <button
            type='submit'
            class={{if form.isRejected 'is-rejected'}}
          >submit</button>
        </ValidatingForm>
      </template>,
    );

    await triggerEvent('form', 'submit');
    assert.dom('form button').hasClass('is-rejected');
  });

  test('A change to a form elements resets yielded #isRejected', async function (assert) {
    // tests fail by default on unhandled errors
    const expectedError = new Error();

    const model = {};
    const submit = sinon.fake.rejects(expectedError);
    await render(
      <template>
        <BsForm @onSubmit={{submit}} @model={{model}} as |form|>
          <form.element @property='foo' />
          <button
            type='submit'
            class={{if form.isRejected 'is-rejected'}}
          >submit</button>
        </BsForm>
      </template>,
    );

    await assert.rejectsErrorNotHandledByEmberOnError(async () => {
      await triggerEvent('form', 'submit');
    }, expectedError);

    assert.dom('form button').hasClass('is-rejected', 'assumption');

    await fillIn('input', 'bar');
    assert.dom('form button').doesNotHaveClass('is-rejected');
  });

  test('Triggering resetSubmissionState resets submission state of form', async function (assert) {
    const model = {};
    const submit = sinon.fake.resolves();
    await render(
      <template>
        <BsForm @onSubmit={{submit}} @model={{model}} as |form|>
          <input onchange={{form.resetSubmissionState}} />
          {{#if form.isSubmitting}}isSubmitting{{/if}}
          {{#if form.isSubmitted}}isSubmitted{{/if}}
          {{#if form.isRejected}}isRejected{{/if}}
        </BsForm>
      </template>,
    );

    await triggerEvent('form', 'submit');
    assert.dom('form').hasText('isSubmitted');

    await fillIn('input', 'bar');
    assert.dom('form').hasNoText();
  });

  test("Adds default onChange action to form elements that updates model's property", async function (assert) {
    const model = EmberObject.create({
      name: 'foo',
    });

    await render(
      <template>
        <BsForm @model={{model}} as |form|>
          <form.element @property='name' />
        </BsForm>
      </template>,
    );

    assert.dom('input').hasValue('foo', 'input has model property value');

    await fillIn('input', 'bar');
    await triggerEvent('input', 'input');
    assert.equal(model.get('name'), 'bar', 'model property was updated');
  });

  testRequiringFocus(
    'Pressing enter on a form with submitOnEnter submits the form',
    async function (assert) {
      const submit = sinon.spy();
      await render(
        <template>
          <BsForm @onSubmit={{submit}} @submitOnEnter={{true}} />
        </template>,
      );
      await triggerKeyEvent('form', 'keypress', 13);
      assert.ok(submit.calledOnce, 'onSubmit action has been called');
    },
  );

  testRequiringFocus(
    'Pressing enter on a form with multiple input elements and submitOnEnter submits the form',
    async function (assert) {
      const submit = sinon.spy();
      await render(
        <template>
          <BsForm @onSubmit={{submit}} @submitOnEnter={{true}} as |form|>
            <form.element @property='input1' />
            <form.element @property='input2' />
          </BsForm>
        </template>,
      );
      await triggerKeyEvent('input', 'keypress', 13);
      assert.ok(submit.calledOnce, 'onSubmit action has been called');
    },
  );

  test('prevents submission to be fired concurrently', async function (assert) {
    let deferredSubmitAction = defer();
    let submitActionHasBeenExecuted = false;

    class State {
      @tracked submitAction = () => {
        submitActionHasBeenExecuted = true;
        return deferredSubmitAction.promise;
      };
      @tracked beforeAction = () => {};
      @tracked validate = () => {};
    }
    const state = new State();

    await render(
      <template>
        <BsForm
          @onSubmit={{state.submitAction}}
          @onBefore={{state.beforeAction}}
          @validate={{state.validate}}
        />
      </template>,
    );

    triggerEvent('form', 'submit');
    await waitUntil(() => submitActionHasBeenExecuted);

    state.submitAction = () => {
      assert.ok(false, 'onSubmit action is not executed concurrently');
    };
    state.beforeAction = () => {
      assert.ok(
        false,
        'onBefore action is not executed if concurrent submission has been dropped',
      );
    };
    state.validate = () => {
      assert.ok(
        false,
        'validate is not executed if concurrent submission has been dropped',
      );
    };
    await triggerEvent('form', 'submit');

    deferredSubmitAction.resolve();
    await settled();
    state.submitAction = () => {
      assert.step('onSubmit action');
    };
    state.beforeAction = () => {};
    state.validate = () => {
      return Promise.resolve();
    };
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

    const submitAction = () => {
      submitActionExecutionCounter++;
      return deferredSubmitAction.promise;
    };
    const beforeAction = beforeActionFake;
    const validate = validateFake;

    await render(
      <template>
        <ValidatingForm
          @preventConcurrency={{false}}
          @onSubmit={{submitAction}}
          @onBefore={{beforeAction}}
          @validate={{validate}}
        />
      </template>,
    );

    await triggerEvent('form', 'submit');
    assert.equal(submitActionExecutionCounter, 1);

    await triggerEvent('form', 'submit');
    assert.equal(submitActionExecutionCounter, 2);

    assert.ok(beforeActionFake.calledTwice);
    assert.ok(validateFake.calledTwice);

    deferredSubmitAction.resolve();
  });

  test('supports novalidate attribute', async function (assert) {
    await render(<template><BsForm /></template>);
    assert.dom('form').doesNotHaveAttribute('novalidate');

    await render(<template><BsForm novalidate={{true}} /></template>);
    assert.dom('form').hasAttribute('novalidate');
  });

  test('disabled property propagates to all its elements', async function (assert) {
    await render(
      <template>
        <BsForm @model={{this}} @disabled={{true}} as |form|>
          <form.element @property='dummy' data-test-form-element />
        </BsForm>
      </template>,
    );

    assert.dom('[data-test-form-element] input').hasAttribute('disabled');
  });

  test('readOnly property propagates to all its elements', async function (assert) {
    await render(
      <template>
        <BsForm @model={{this}} @readonly={{true}} as |form|>
          <form.element @property='dummy' data-test-form-element />
        </BsForm>
      </template>,
    );

    assert.dom('[data-test-form-element] input').hasAttribute('readonly');
  });

  test('it passes accessibility checks', async function (assert) {
    await render(
      <template>
        <BsForm @model={{this}} as |form|>
          <form.element @property='dummy' @label='Dummy' />
        </BsForm>
      </template>,
    );

    await a11yAudit();
    assert.ok(true, 'A11y audit passed');
  });

  module('yielded submitButton', function () {
    test('it yields submitButton component', async function (assert) {
      await render(
        <template>
          <BsForm as |form|>
            <form.submitButton />
          </BsForm>
        </template>,
      );

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
      const submitHandler = () => {
        assert.step('@onSubmit action is exected');
      };

      await render(
        <template>
          <BsForm @onSubmit={{submitHandler}} as |form|>
            <form.submitButton />
          </BsForm>
        </template>,
      );
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

          const submitHandler = () => {
            return deferredSubmitAction.promise;
          };

          await render(
            <template>
              <BsForm @onSubmit={{submitHandler}} as |form|>
                <form.submitButton as |button|>
                  {{#if button.isPending}}isPending{{/if}}
                  {{#if button.isFulfilled}}isFulfilled{{/if}}
                  {{#if button.isRejected}}isRejected{{/if}}
                  {{#if button.isSettled}}isSettled{{/if}}
                </form.submitButton>
                <button type='button' {{on 'click' form.resetSubmissionState}}>
                </button>
              </BsForm>
            </template>,
          );
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

    const onBefore = undefined;
    const onSubmit = undefined;
    const onInvalid = undefined;

    await render(
      <template>
        <BsForm
          @onBefore={{onBefore}}
          @onSubmit={{onSubmit}}
          @onInvalid={{onInvalid}}
        />
      </template>,
    );
    await triggerEvent('form', 'submit');
  });

  test('it uses default value false for disabled argument if undefined', async function (assert) {
    const disabled = undefined;
    await render(
      <template>
        <BsForm @disabled={{disabled}} as |form|>
          <form.element />
        </BsForm>
      </template>,
    );
    assert.dom('input').doesNotHaveAttribute('disabled');
  });

  test('it uses default value for formLayout argument if undefined', async function (assert) {
    const formLayout = undefined;
    await render(<template><BsForm @formLayout={{formLayout}} /></template>);
    assert.dom('form').doesNotHaveAttribute('class');
  });

  test('it uses a POJO as model if undefined', async function (assert) {
    class State {
      @tracked submitHandler = (model) => {
        assert.step('submit action on untouched form');
        assert.strictEqual(typeof model, 'object');
      };
    }
    const state = new State();
    const model = undefined;
    await render(
      <template>
        <BsForm @model={{model}} @onSubmit={{state.submitHandler}} as |form|>
          <form.element @property='name' />
        </BsForm>
      </template>,
    );
    await triggerEvent('form', 'submit');
    assert.verifySteps(['submit action on untouched form']);

    state.submitHandler = (model) => {
      assert.step('submit action after user input');
      assert.deepEqual(model, { name: 'John Doe' });
    };
    await fillIn('input', 'John Doe');
    await triggerEvent('form', 'submit');
    assert.verifySteps(['submit action after user input']);
  });

  test('POJO created for model if undefined does not leak between two instances', async function (assert) {
    const model = undefined;
    const submitHandlerForFirstForm = (model) => {
      assert.step('first form submitted');
      assert.deepEqual(
        model,
        { name: 'John Doe' },
        'name is set on model for first form',
      );
    };
    const submitHandlerForSecondForm = (model) => {
      assert.step('second form submitted');
      assert.deepEqual(model, {}, 'name is not set on model for second form');
    };
    await render(
      <template>
        <BsForm
          @model={{model}}
          @onSubmit={{submitHandlerForFirstForm}}
          data-test-first-form
          as |form|
        >
          <form.element @property='name' />
        </BsForm>
        <BsForm
          @model={{model}}
          @onSubmit={{submitHandlerForSecondForm}}
          data-test-second-form
        />
      </template>,
    );
    await fillIn('input', 'John Doe');
    await triggerEvent('[data-test-first-form]', 'submit');
    await triggerEvent('[data-test-second-form]', 'submit');
    assert.verifySteps(['first form submitted', 'second form submitted']);
  });

  test('it uses default value false for readonly argument if undefined', async function (assert) {
    const readonlyValue = undefined;
    await render(
      <template>
        <BsForm @readonly={{readonlyValue}} as |form|>
          <form.element />
        </BsForm>
      </template>,
    );
    assert.dom('input').doesNotHaveAttribute('readonly');
  });

  /**
   * @see https://github.com/kaliber5/ember-bootstrap/issues/1414
   */
  test('it does not have a showOwnValidation bug', async function (assert) {
    assert.expect(1);
    class State {
      @tracked name;
      @tracked user;
    }
    const state = new State();

    const submit = ({ name }) => assert.equal(name, 'Zoey');
    const beforeSubmit = (model) => {
      if (state.user) {
        model.name = state.user.name;
      }
    };

    await render(
      <template>
        <BsForm
          @model={{state}}
          @onBefore={{beforeSubmit}}
          @onSubmit={{submit}}
          as |Form|
        >
          {{#unless state.user}}
            <Form.element @property='name' />
          {{/unless}}

          <Form.submitButton @defaultText='Submit' />
        </BsForm>
      </template>,
    );

    await fillIn('input', 'Tomster');

    state.user = { name: 'Zoey' };
    await settled();

    await click('button');
  });

  test('it provides model access inside form object', async function (assert) {
    await render(
      <template>
        <BsForm
          @model={{this.model}}
          @onSubmit={{this.submitHandler}}
          as |form|
        >
          <form.element @property='name' />
          <label id='name'>{{form.model.name}}</label>
        </BsForm>
      </template>,
    );

    assert.dom(this.element.querySelector('#name')).hasText('');
    await fillIn('input', 'John Doe');
    assert.dom(this.element.querySelector('#name')).hasText('John Doe');
  });
});
