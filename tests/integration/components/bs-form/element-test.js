import Component from '@ember/component';
import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { A, isArray } from '@ember/array';
import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn, triggerEvent, focus, blur, settled } from '@ember/test-helpers';
import {
  formFeedbackClass,
  test,
  testBS3,
  testBS4,
  testRequiringFocus,
  testBS3RequiringFocus,
  testBS4RequiringFocus,
  validationSuccessClass,
  validationErrorClass,
  validationWarningClass,
  formFeedbackElement,
  formHelpTextClass,
} from '../../../helpers/bootstrap';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';
import { gte } from 'ember-compatibility-helpers';
import sinon from 'sinon';
import { tracked } from '@glimmer/tracking';

const formLayouts = ['vertical', 'horizontal', 'inline'];

module('Integration | Component | bs-form/element', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('component has form-group bootstrap class', async function (assert) {
    await render(hbs`<BsForm::Element />`);
    assert.dom('.form-group').exists('component has form-group class');
  });

  test('setting label property displays label tag', async function (assert) {
    await render(hbs`<BsForm::Element @label="myLabel" />`);

    assert.dom('label').exists({ count: 1 }, 'component has label tag');
    assert.dom('label').hasText('myLabel', 'label has text');
  });

  async function controlTypeLayoutTest(assert, controlType, selector) {
    this.set('formLayout', 'vertical');
    this.set('controlType', controlType);
    await render(
      hbs`<BsForm::Element @controlType={{controlType}} @formLayout={{formLayout}} @horizontalLabelGridClass="col-md-4" />`
    );

    formLayouts.forEach((layout) => {
      this.set('formLayout', layout);
      assert.dom(selector).exists({ count: 1 }, `component has ${controlType} control for form layout ${layout}`);
    });
  }

  async function controlTypeValueTest(assert, controlType, selector, values, getValueFn) {
    if (!isArray(values)) {
      values = [values];
    }
    values = A(values);

    this.set('controlType', controlType);
    let model = EmberObject.create();
    this.set('model', model);

    await render(
      hbs`<BsForm @model={{model}} as |f|><f.element @controlType={{controlType}} @property="prop" /></BsForm>`
    );

    this.set('model.prop', 'foo');

    values.forEach((value) => {
      this.set('model.prop', value);
      let hasValue =
        typeof getValueFn === 'function'
          ? getValueFn.call(this.element.querySelector(selector))
          : this.element.querySelector(selector).value;
      let expectedValue = value || '';
      assert.equal(hasValue, expectedValue, `${controlType} control has correct values`);
    });
  }

  async function controlTypeUpdateTest(assert, controlType, selector, value, oldValue = 'foo', setValueFn = null) {
    this.set('controlType', controlType);
    let action = sinon.spy();
    this.set('change', action);

    let model = EmberObject.create({
      name: oldValue,
    });
    this.set('model', model);
    await render(
      hbs`<BsForm::Element @controlType={{controlType}} @horizontalLabelGridClass="col-md-4" @model={{model}} @property="name" @onChange={{action change}} />`
    );

    if (typeof setValueFn === 'function') {
      await setValueFn.call(this.element.querySelector(selector), value);
    } else {
      await fillIn(selector, value);
      // somehow this blur was required to make tests pass in Ember 3.22 canary, as the showValidationOnHandler event handler was called (on "focusout")
      // when clearing the render, where the following `this.set('showOwnValidation', true);` would cause an obscure error:
      // ERROR: Uncaught Error: Assertion Failed: You attempted to update `showOwnValidation` on `<FormElement:ember1760>`, but it had already been used previously in the same computation.
      // @todo check if we can remove this again when the upstream issue has been sorted out
      await blur(selector);
    }
    assert.equal(this.model.name, oldValue, `${controlType} value has not changed`);
    assert.ok(
      action.calledWith(value, model, 'name'),
      `onChange action of ${controlType} has been called with expected args`
    );
  }

  async function labeledControlTest(assert, controlType, selector) {
    this.set('controlType', controlType);
    let model = EmberObject.create();
    this.set('model', model);
    await render(
      hbs`<BsForm @model={{model}} @formLayout={{formLayout}} as |form|><form.element @controlType={{controlType}} @property="prop" @label="myLabel" /></BsForm>`
    );

    formLayouts.forEach((layout) => {
      this.set('formLayout', layout);
      assert.equal(
        this.element.querySelector(selector).getAttribute('id'),
        this.element.querySelector('label').getAttribute('for'),
        `component and label ids do match for form layout ${layout}`
      );
    });
  }

  test('controlType "text" is supported', async function (assert) {
    await controlTypeLayoutTest.call(this, assert, 'text', 'input[type=text]');
    await controlTypeValueTest.call(this, assert, 'text', 'input[type=text]', ['myValue', undefined]);
    await controlTypeUpdateTest.call(this, assert, 'text', 'input[type=text]', 'myValue');
    await labeledControlTest.call(this, assert, 'text', 'input[type=text]');
  });

  test('controlType "checkbox" is supported', async function (assert) {
    await controlTypeLayoutTest.call(this, assert, 'checkbox', 'input[type=checkbox]');
    await controlTypeValueTest.call(this, assert, 'checkbox', 'input[type=checkbox]', [true, false], function () {
      return this.checked;
    });
    await controlTypeUpdateTest.call(this, assert, 'checkbox', 'input[type=checkbox]', true, false, function () {
      return click(this);
    });
  });

  test('controlType "textarea" is supported', async function (assert) {
    await controlTypeLayoutTest.call(this, assert, 'textarea', 'textarea', 'myValue');
    await controlTypeValueTest.call(this, assert, 'textarea', 'textarea', ['myValue', undefined]);
    await controlTypeUpdateTest.call(this, assert, 'textarea', 'textarea', 'myValue');
    await labeledControlTest.call(this, assert, 'textarea', 'textarea');
  });

  module('controlType "radio" is supported', function (hooks) {
    const simpleOptions = ['foo', 'bar'];

    const hashOptions = [
      {
        title: 'foo',
      },
      {
        title: 'bar',
      },
    ];

    hooks.beforeEach(function () {
      this.setProperties({
        simpleOptions,
        hashOptions,
      });
    });

    test('controlType "radio" is supported', async function (assert) {
      this.set('formLayout', 'vertical');
      await render(
        hbs`<BsForm::Element @controlType="radio" @formLayout={{formLayout}} @options={{simpleOptions}} @horizontalLabelGridClass="col-md-4" />`
      );

      formLayouts.forEach((layout) => {
        this.set('formLayout', layout);
        assert.dom('input[type=radio]').exists({ count: 2 }, `component has radio control for form layout ${layout}`);
      });
    });

    test('it renders simple options', async function (assert) {
      await render(hbs`<BsForm::Element @controlType="radio" @formLayout="horizontal" @options={{simpleOptions}} />`);

      assert.dom('input[type=radio]').exists({ count: 2 });
      assert.dom('label').exists({ count: 2 });

      assert.dom(this.element.querySelectorAll('label')[0]).hasText('foo');
      assert.dom(this.element.querySelectorAll('label')[1]).hasText('bar');
      assert
        .dom(this.element.querySelectorAll('label')[0])
        .hasAttribute('for', this.element.querySelectorAll('input[type=radio]')[0].getAttribute('id'));
      assert
        .dom(this.element.querySelectorAll('label')[1])
        .hasAttribute('for', this.element.querySelectorAll('input[type=radio]')[1].getAttribute('id'));
    });

    test('it renders hash options', async function (assert) {
      await render(hbs`<BsForm::Element @controlType="radio" @options={{hashOptions}} @optionLabelPath="title" />`);

      assert.dom('input[type=radio]').exists({ count: 2 });
      assert.dom('label').exists({ count: 2 });

      assert.dom(this.element.querySelectorAll('label')[0]).hasText('foo');
      assert.dom(this.element.querySelectorAll('label')[1]).hasText('bar');
      assert
        .dom(this.element.querySelectorAll('label')[0])
        .hasAttribute('for', this.element.querySelectorAll('input[type=radio]')[0].getAttribute('id'));
      assert
        .dom(this.element.querySelectorAll('label')[1])
        .hasAttribute('for', this.element.querySelectorAll('input[type=radio]')[1].getAttribute('id'));
    });

    test('Block mode allows to customize label for each radio input', async function (assert) {
      await render(hbs`
        <BsForm::Element @controlType="radio" @options={{simpleOptions}} as |Element|>
          <Element.control as |option index|>
            {{index}}: {{option}}
          </Element.control>
        </BsForm::Element>
      `);

      assert.dom(this.element.querySelectorAll('label')[0]).hasText('0: foo');
      assert.dom(this.element.querySelectorAll('label')[1]).hasText('1: bar');
    });

    testBS3(
      'Block mode allows to customize label for each radio input if used together with inline',
      async function (assert) {
        await render(hbs`
        <BsForm::Element @controlType="radio" @options={{simpleOptions}} as |Element|>
          <Element.control @inline={{true}} as |option index|>
            {{index}}: {{option}}
          </Element.control>
        </BsForm::Element>
      `);

        assert.dom(this.element.querySelectorAll('label')[0]).hasText('0: foo');
        assert.dom(this.element.querySelectorAll('label')[1]).hasText('1: bar');
      }
    );

    testBS3('has correct markup', async function (assert) {
      await render(hbs`<BsForm::Element @controlType="radio" @options={{simpleOptions}} />`);

      assert.dom('.radio').exists({ count: 2 });
      assert.dom('.radio label').exists({ count: 2 });
      assert.dom('.radio label input[type=radio]').exists({ count: 2 });
    });

    testBS3('supports inline', async function (assert) {
      await render(hbs`
        <BsForm::Element @controlType="radio" @options={{simpleOptions}} as |Element|>
          <Element.control @inline={{true}} />
        </BsForm::Element>
      `);

      assert.dom('.radio').doesNotExist();
      assert.dom('label.radio-inline').exists({ count: 2 });
      assert.dom('label.radio-inline input[type=radio]').exists({ count: 2 });
    });

    testBS3('supports inline for hash options', async function (assert) {
      await render(hbs`
        <BsForm::Element @controlType="radio" @options={{hashOptions}} @optionLabelPath="title" as |Element|>
          <Element.control @inline={{true}} />
        </BsForm::Element>
      `);

      // inline support
      assert.dom('.radio').doesNotExist();
      assert.dom('label.radio-inline').exists({ count: 2 });
      assert.dom('label.radio-inline input[type=radio]').exists({ count: 2 });

      // hash support
      assert.dom(this.element.querySelectorAll('label')[0]).hasText('foo');
      assert.dom(this.element.querySelectorAll('label')[1]).hasText('bar');
      assert
        .dom(this.element.querySelectorAll('label')[0])
        .hasAttribute('for', this.element.querySelectorAll('input[type=radio]')[0].getAttribute('id'));
      assert
        .dom(this.element.querySelectorAll('label')[1])
        .hasAttribute('for', this.element.querySelectorAll('input[type=radio]')[1].getAttribute('id'));
    });

    testBS4('has correct markup', async function (assert) {
      await render(hbs`<BsForm::Element @controlType="radio" @label="my radio group" @options={{simpleOptions}} />`);

      assert.dom('legend').exists({ count: 1 }, 'renders a <legend> instead of a <label> for radio group');
      assert.dom('legend').hasText('my radio group', 'renders value of label argument as text of <legend>');
      assert.dom('legend').doesNotHaveAttribute('for', '<legend> does not have a for attribute');

      assert.dom('.form-check').exists({ count: 2 });
      assert.dom('.form-check input[type=radio]').hasClass('form-check-input');
      assert.dom('.form-check label').hasClass('form-check-label');
    });

    testBS4('supports horizontal from layout', async function (assert) {
      await render(hbs`
        <BsForm @formLayout="horizontal" as |form|>
          <form.element @controlType="radio" @label="my radio group" @options={{simpleOptions}} />
        </BsForm>
      `);

      assert.dom('legend').hasClass('col-form-label');
      assert.dom('legend').hasClass('col-md-4');
      assert.dom('.row > :not(legend)').hasClass('col-md-8');
    });

    testBS4('supports inline', async function (assert) {
      await render(hbs`
        <BsForm::Element @controlType="radio" @options={{simpleOptions}} as |Element|>
          <Element.control @inline={{true}} />
        </BsForm::Element>
      `);

      assert.dom('.form-check.form-check-inline').exists({ count: 2 });
    });

    test('has correct value', async function (assert) {
      let model = EmberObject.create();
      this.set('model', model);

      await render(
        hbs`<BsForm @model={{model}} as |f|><f.element @controlType="radio" @options={{simpleOptions}} @property="prop" /></BsForm>`
      );

      this.set('model.prop', undefined);
      assert.notOk(this.element.querySelector('input[type=radio]').checked);

      this.set('model.prop', 'foo');
      assert.ok(this.element.querySelector('input[type=radio]').checked);
    });

    test('sends updates', async function (assert) {
      let action = sinon.spy();
      this.set('change', action);

      let model = EmberObject.create({
        name: 'foo',
      });
      this.set('model', model);
      await render(
        hbs`<BsForm::Element @controlType="radio" @options={{simpleOptions}} @model={{model}} @property="name" @onChange={{action change}} />`
      );
      await click(this.element.querySelectorAll('input[type=radio]')[1]);

      assert.equal(this.model.name, 'foo', `radio value has not changed`);
      assert.ok(action.calledWith('bar', model, 'name'), `onChange action of radio has been called with expected args`);
    });
  });

  test('using "property" creates binding to model property', async function (assert) {
    let model = EmberObject.create({
      foo: 'bar',
    });
    this.set('model', model);
    await render(hbs`<BsForm::Element @property="foo" @model={{model}} />`);

    assert.dom('input').hasValue('bar', 'input has expected value from model');

    this.set('model.foo', 'baz');
    assert.dom('input').hasValue('baz', 'input updates value from model');
  });

  test('Changing formLayout changes markup', async function (assert) {
    this.set('formLayout', 'vertical');
    await render(
      hbs`<BsForm @horizontalLabelGridClass="col-sm-4" @formLayout={{formLayout}} as |form|><form.element @controlType="text" @label="myLabel" /></BsForm>`
    );
    assert.dom('form > div').hasClass('form-group', 'component has form-group class');
    assert.equal(this.element.querySelector('form > div > :nth-child(1)').tagName, 'LABEL', 'first child is a label');
    assert.equal(this.element.querySelector('form > div > :nth-child(2)').tagName, 'INPUT', 'second child is a input');

    this.set('formLayout', 'horizontal');
    assert.dom('form > div').hasClass('form-group', 'component has form-group class');
    assert.equal(this.element.querySelector('form > div > :nth-child(1)').tagName, 'LABEL', 'first child is a label');
    assert.dom('form > div > :nth-child(1)').hasClass('col-sm-4', 'label has grid class');
    assert.equal(this.element.querySelector('form > div > :nth-child(2)').tagName, 'DIV', 'second child is a div');
    assert.dom('form > div > :nth-child(2)').hasClass('col-sm-8', 'div has grid class');
    assert.equal(
      this.element.querySelector('form > div > :nth-child(2) > :first-child').tagName,
      'INPUT',
      'divs first child is an input'
    );
  });

  test('Custom controls are supported', async function (assert) {
    let model = new (class {
      @tracked gender = 'male';
    })();

    this.set('model', model);
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <form.element
          @controlType="textarea"
          @label="Gender"
          @property="gender"
          @showAllValidations={{true}}
          @hasValidator={{true}}
          as |el|
        >
          <input
            type="text"
            id={{el.id}}
            value={{el.value}}
            class={{el.validation}}
            {{on "input" (action el.setValue value="target.value")}}
          >
          <el.control />
        </form.element>
      </BsForm>
    `);

    assert.dom('input').exists({ count: 1 }, 'block template is rendered');
    assert.dom('input').hasValue('male', 'value is yielded to block template');
    assert.dom('input').hasAttribute('id', { any: true }, 'id is yielded to block template');
    assert.dom('input').hasClass('success', 'validation status is yielded to block template');
    assert.dom('textarea').exists({ count: 1 }, 'control component is yielded');

    await fillIn('input', 'female');
    assert.equal(model.gender, 'female', 'yielded setValue function updates property of model');
    assert.dom('input').hasValue('female', 'yielded value is updated with setValue function');
    assert.dom('textarea').hasValue('female', 'value of yielded control component is updated');

    await fillIn('textarea', 'diverse');
    assert.equal(model.gender, 'diverse', 'yielded control component updates property of model');
    assert.dom('input').hasValue('diverse', 'yielded value is updated if changed through control component');
    assert.dom('textarea').hasValue('diverse', 'value of yielded control component is updated');
  });

  test('required property propagates', async function (assert) {
    await render(hbs`<BsForm::Element @label="myLabel" @required={{true}} />`);
    assert.dom('.form-group').hasClass('is-required', 'component has is-required class');
  });

  test('disabled property propagates', async function (assert) {
    await render(hbs`<BsForm::Element @label="myLabel" @disabled={{true}} />`);
    assert.dom('.form-group').hasClass('disabled', 'component has disabled class');
  });

  test('if invisibleLabel is true sr-only class is added to label', async function (assert) {
    await render(hbs`<BsForm::Element @label="myLabel" />`);
    assert.dom('label').hasNoClass('sr-only', 'sr-only class is not present as defaultText');

    await render(
      hbs`<BsForm @formLayout="vertical"><BsForm::Element @label="myLabel" @invisibleLabel={{true}} /></BsForm>`
    );
    assert.dom('label').hasClass('sr-only', 'sr-only class is present for formLayout vertical');

    await render(
      hbs`<BsForm @formLayout="horizontal"><BsForm::Element @label="myLabel" @invisibleLabel={{true}} /></BsForm>`
    );
    assert.dom('label').hasClass('sr-only', 'sr-only class is present for formLayout horizontal');

    await render(
      hbs`<BsForm @formLayout="inline"><BsForm::Element @label="myLabel" @invisibleLabel={{true}} /></BsForm>`
    );
    assert.dom('label').hasClass('sr-only', 'sr-only class is present for formLayout inline');
  });

  testBS3('adjusts validation icon position if there is an input group', async function (assert) {
    assert.expect(5);
    this.set('errors', A([]));
    this.set('formLayout', 'vertical');
    await render(hbs`
      <BsForm @formLayout={{formLayout}} as |form|>
        <form.element @showAllValidations={{true}} @hasValidator={{true}} @errors={{errors}} @label="adjusts validation icon position" class="addon">
          <div class="input-group">
            <input class="form-control">
            <div class="input-group-addon">
              @example.com
            </div>
          </div>
        </form.element>
        <form.element @showAllValidations={{true}} @hasValidator={{true}} @errors={{errors}} @label="adjusts validation icon position" class="button">
          <div class="input-group">
            <input class="form-control">
            <div class="input-group-btn">
              <button class="btn btn-default" type="button">foo</button>
              <button class="btn btn-default" type="button">bar</button>
            </div>
          </div>
        </form.element>
      </BsForm>
    `);
    // assumption on bootstrap defaults:
    // feedback icons does have right: 0px for vertical forms
    // https://github.com/twbs/bootstrap/blob/v3.3.6/less/forms.less#L400-L403
    assert.equal(
      this.element.querySelector('.addon .form-control-feedback').style.right,
      `${this.element.querySelector('.addon .input-group-addon').offsetWidth}px`,
      'works for addon on init'
    );
    assert.equal(
      this.element.querySelector('.button .form-control-feedback').style.right,
      `${this.element.querySelector('.button .input-group-btn').offsetWidth}px`,
      'works for button on init'
    );
    let expectedRightValue = this.element.querySelector('.addon .form-control-feedback').style.right;

    this.set('errors', A(['Some error']));
    assert.equal(
      this.element.querySelector('.addon .form-control-feedback').style.right,
      expectedRightValue,
      'adjusts correctly after validation changed from null'
    );
    this.set('errors', A([]));
    await fillIn('.addon input', 'foo');
    await blur('.addon input');
    await triggerEvent('.addon input', 'change');
    assert.equal(
      this.element.querySelector('.addon .form-control-feedback').style.right,
      expectedRightValue,
      'adjusts correctly after validation changed form error to success'
    );
    // assumption on bootstrap defaults:
    // feedback icons does have right: 15px for horizontal forms
    // https://github.com/twbs/bootstrap/blob/v3.3.6/less/forms.less#L589-L591
    // https://github.com/twbs/bootstrap/blob/v3.3.6/less/variables.less#L326-L327
    this.set('formLayout', 'horizontal');
    await settled();

    assert.equal(
      this.element.querySelector('.addon .form-control-feedback').style.right,
      `${this.element.querySelector('.addon .input-group-addon').offsetWidth + 15}px`,
      'takes bootstrap default positioning into account'
    );
  });

  testRequiringFocus('shows validation state only when validator is present', async function (assert) {
    this.set(
      'model',
      EmberObject.create({
        name: null,
        validate() {},
      })
    );
    await render(hbs`
        <BsForm::Element @property="name" @model={{model}} />
    `);
    await focus('input');
    await blur('input');
    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationSuccessClass(), "form group isn't shown as having errors if there is no validator");
  });

  test('shows validation success', async function (assert) {
    this.set('model', EmberObject.create({ name: null }));
    await render(hbs`
        <BsForm::Element @property="name" @showAllValidations={{true}} @hasValidator={{true}} @model={{model}} />
    `);
    assert
      .dom(formFeedbackElement())
      .hasClass(validationSuccessClass(), 'validation succcess is shown when form signals to show all validations');
  });

  testRequiringFocus('shows validation errors', async function (assert) {
    this.set('errors', A(['Invalid']));
    this.set('model', EmberObject.create({ name: null }));
    await render(hbs`
        <BsForm::Element @property="name" @hasValidator={{true}} @errors={{errors}} @model={{model}} />
    `);
    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationErrorClass(), "validation errors aren't shown before user interaction");
    await focus('input');
    await blur('input');
    assert
      .dom(formFeedbackElement())
      .hasClass(validationErrorClass(), 'validation errors are shown after user interaction when errors are present');
    assert.dom(`.form-group .${formFeedbackClass()}`).hasText('Invalid');
    run(() => {
      this.set('errors', A());
    });
    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationErrorClass(), "form group isn't shown as having errors if there aren't any");
  });

  testRequiringFocus('shows validation warnings', async function (assert) {
    this.set('warnings', A(['Insecure']));
    this.set('model', EmberObject.create({ name: null }));
    await render(hbs`
        <BsForm::Element @property="name" @hasValidator={{true}} @warnings={{warnings}} @model={{model}} />
    `);
    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationWarningClass(), "validation warnings aren't shown before user interaction");
    await focus('input');
    await blur('input');
    assert
      .dom(formFeedbackElement())
      .hasClass(
        validationWarningClass(),
        'validation warnings are shown after user interaction when warnings are present'
      );
    assert.dom(`.form-group .${formFeedbackClass()}`).hasText('Insecure');
    run(() => {
      this.set('warnings', A());
    });
    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationWarningClass(), "form group isn't shown as having warnings if there are't any");
  });

  test('shows custom error immediately', async function (assert) {
    this.set('model', EmberObject.create({ name: null }));
    this.set('error', 'some error');
    await render(hbs`
        <BsForm::Element @property="name" @hasValidator={{true}} @customError={{error}} @model={{model}} />
    `);
    assert.dom(formFeedbackElement()).hasClass(validationErrorClass(), 'custom error is shown immediately');
    assert.dom(`.form-group .${formFeedbackClass()}`).hasText('some error');
    run(() => {
      this.set('error', null);
    });
    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationErrorClass(), "form group isn't shown as having errors if there aren't any");
  });

  test('shows custom warning immediately', async function (assert) {
    this.set('model', EmberObject.create({ name: null }));
    this.set('warning', 'some warning');
    await render(hbs`
        <BsForm::Element @property="name" @hasValidator={{true}} @customWarning={{warning}} @model={{model}} />
    `);
    assert.dom(formFeedbackElement()).hasClass(validationWarningClass(), 'custom warning is shown immediately');
    assert.dom(`.form-group .${formFeedbackClass()}`).hasText('some warning');
    run(() => {
      this.set('warning', null);
    });
    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationWarningClass(), "form group isn't shown as having warning if there aren't any");
  });

  testRequiringFocus('shows validation errors in preference to custom warning', async function (assert) {
    this.set('errors', A(['Invalid']));
    this.set('warning', 'some warning');
    this.set('model', EmberObject.create({ name: null }));
    await render(hbs`
        <BsForm::Element @property="name" @hasValidator={{true}} @errors={{errors}} @customWarning={{warning}} @model={{model}} />
    `);
    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationErrorClass(), "validation errors aren't shown before user interaction");
    assert.dom(formFeedbackElement()).hasClass(validationWarningClass(), 'custom warning is shown immediately');
    assert.dom(`.form-group .${formFeedbackClass()}`).hasText('some warning', 'Custom Warning is shown');
    await focus('input');
    await blur('input');
    assert
      .dom(formFeedbackElement())
      .hasClass(validationErrorClass(), 'validation errors are shown after user interaction when errors are present');
    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationWarningClass(), 'custom warning is removed when errors are shown');
    assert.dom(`.form-group .${formFeedbackClass()}`).hasText('Invalid', 'Validation error is shown');
    run(() => {
      this.set('errors', A());
    });
    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationErrorClass(), "form group isn't shown as having errors if there aren't any");
    assert
      .dom(formFeedbackElement())
      .hasClass(validationWarningClass(), 'custom warning is shown when errors are removed');
  });

  testRequiringFocus(
    'events enabling validation rendering are configurable per `showValidationOn` (array)',
    async function (assert) {
      this.set('errors', A(['Invalid']));
      this.set('model', EmberObject.create({ name: null }));
      this.set('showValidationOn', ['change']);
      await render(hbs`
        <BsForm::Element @property="name" @hasValidator={{true}} @errors={{errors}} @model={{model}} @showValidationOn={{showValidationOn}} />
    `);
      assert
        .dom(formFeedbackElement())
        .hasNoClass(validationErrorClass(), "validation warnings aren't shown before user interaction");
      await focus('input');
      await blur('input');
      assert
        .dom(formFeedbackElement())
        .hasNoClass(validationErrorClass(), 'events not present in `showValidationOn` are ignored');
      await fillIn('input', 'foo');
      await triggerEvent('input', 'change');
      assert
        .dom(formFeedbackElement())
        .hasClass(validationErrorClass(), 'events present in `showValidationOn` trigger validation');
    }
  );

  testRequiringFocus(
    'events enabling validation rendering are configurable per `showValidationOn` (string)',
    async function (assert) {
      this.set('errors', A(['Invalid']));
      this.set('model', EmberObject.create({ name: null }));
      await render(hbs`
        <BsForm::Element @property="name" @hasValidator={{true}} @errors={{errors}} @model={{model}} @showValidationOn="change" />
    `);
      assert
        .dom(formFeedbackElement())
        .hasNoClass(validationErrorClass(), "validation warnings aren't shown before user interaction");
      await focus('input');
      await blur('input');
      assert
        .dom(formFeedbackElement())
        .hasNoClass(validationErrorClass(), 'events not present in `showValidationOn` are ignored');
      await triggerEvent('input', 'change');
      assert
        .dom(formFeedbackElement())
        .hasClass(validationErrorClass(), 'events present in `showValidationOn` trigger validation');
    }
  );

  testBS3RequiringFocus('event triggered on input group button does not enable validation', async function (assert) {
    this.set('errors', A(['Invalid']));
    this.set('model', EmberObject.create({ name: null }));
    await render(hbs`
      <BsForm as |form|>
        <form.element @property="name" @hasValidator={{true}} @errors={{errors}} @model={{model}} as |el|>
          <div class="input-group">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button">Button</button>
            </span>
            {{el.control}}
          </div>
        </form.element>
      </BsForm>
    `);
    await click('button');
    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationErrorClass(), "validation warnings aren't shown before user interaction");
  });

  testBS4RequiringFocus('event triggered on input group button does not enable validation', async function (assert) {
    this.set('errors', A(['Invalid']));
    this.set('model', EmberObject.create({ name: null }));
    await render(hbs`
      <BsForm as |form|>
        <form.element @property="name" @hasValidator={{true}} @errors={{errors}} @model={{model}} as |el|>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <button class="btn btn-outline-secondary" type="button">Button</button>
            </div>
            {{el.control}}
          </div>
        </form.element>
      </BsForm>
    `);
    await click('button');
    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationErrorClass(), "validation warnings aren't shown before user interaction");
  });

  testRequiringFocus(
    'event targets not enabling validation are configurable per `doNotShowValidationForEventTargets`',
    async function (assert) {
      this.set('doNotShowValidationForEventTargets', ['[data-trigger-validation="false"]']);
      this.set('errors', A(['Invalid']));
      this.set('model', EmberObject.create({ name: null }));
      await render(hbs`
      <BsForm as |form|>
        <form.element @property="name" @hasValidator={{true}} @errors={{errors}} @model={{model}} @doNotShowValidationForEventTargets={{doNotShowValidationForEventTargets}} as |el|>
          {{el.control}}
          <button type="button" data-trigger-validation="false">Test</button>
        </form.element>
      </BsForm>
    `);
      await click('button');
      assert.dom(formFeedbackElement()).hasNoClass(validationErrorClass());

      this.set('doNotShowValidationForEventTargets', []);
      await click('button');
      assert.dom(formFeedbackElement()).hasNoClass(validationErrorClass());
    }
  );

  test('it uses custom control component when registered in DI container', async function (assert) {
    this.owner.register(
      'component:bs-form/element/control/foo',
      class extends Component {
        tagName = '';
        layout = hbs`<div id="foo"></div>`;
      }
    );
    await render(hbs`
        <BsForm::Element @controlType="foo" />
    `);
    assert.dom('#foo').exists({ count: 1 }, 'Custom control is used');
  });

  test('shows help text if available', async function (assert) {
    await render(hbs`
      <BsForm::Element @helpText="foo" />
    `);

    let helpTextClass = `.${formHelpTextClass()}`;
    assert.dom(helpTextClass).exists({ count: 1 }, 'has help text element');
    assert.dom(helpTextClass).hasText('foo', 'shows help text');

    assert.ok(
      this.element.querySelector('input').getAttribute('aria-describedby'),
      'control has aria-describedby attribute'
    );
    assert.equal(
      this.element.querySelector('input').getAttribute('aria-describedby'),
      this.element.querySelector(helpTextClass).getAttribute('id'),
      'aria-describedby matches id'
    );
  });

  // test for size property here to prevent regression of https://github.com/kaliber5/ember-bootstrap/issues/492
  testBS3('support size classes', async function (assert) {
    await render(hbs`<BsForm::Element @size="lg" />`);
    assert.dom('.form-group').hasClass('form-group-lg', 'form-group has large class');

    await render(hbs`<BsForm::Element @size="sm" />`);
    assert.dom('.form-group').hasClass('form-group-sm', 'form-group has small class');
  });

  testBS4('support size classes', async function (assert) {
    await render(hbs`<BsForm::Element @size="lg" @label="foo" @formLayout="horizontal" />`);
    assert.dom('.form-group').hasNoClass('form-group-lg', 'form-group has not large class');
    assert.dom('input').hasClass('form-control-lg', 'input has large class');
    assert.dom('label').hasClass('col-form-label-lg', 'label has large class');

    await render(hbs`<BsForm::Element @size="sm" @label="foo" @formLayout="horizontal" />`);
    assert.dom('.form-group').hasNoClass('form-group-sm', 'form-group has not small class');
    assert.dom('input').hasClass('form-control-sm', 'input has small class');
    assert.dom('label').hasClass('col-form-label-sm', 'label has large class');
  });

  (gte('3.4.0')
    ? test
    : skip)('supports setting HTML attributes to form group w/ angle brackets', async function (assert) {
    await render(hbs`<BsForm::element data-test-foo />`);

    assert.dom('.form-group').hasAttribute('data-test-foo');
    assert.dom('[data-test-foo]').exists({ count: 1 });
  });
});
