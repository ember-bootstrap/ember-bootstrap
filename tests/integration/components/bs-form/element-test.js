import Component from '@ember/component';
import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { A, isArray } from '@ember/array';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { blur, click, fillIn, focus, render, settled, triggerEvent } from '@ember/test-helpers';
import {
  formFeedbackClass,
  formFeedbackElement,
  formHelpTextClass,
  isBootstrap,
  test,
  testBS4,
  testBS5,
  testRequiringFocus,
  validationErrorClass,
  validationSuccessClass,
  validationWarningClass,
  visuallyHiddenClass,
} from '../../../helpers/bootstrap';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';
import sinon from 'sinon';
import { tracked } from '@glimmer/tracking';
import Form from 'ember-bootstrap/components/bs-form';
import FormElement from 'ember-bootstrap/components/bs-form/element';
import { ensureSafeComponent } from '@embroider/util';

const formLayouts = ['vertical', 'horizontal', 'inline'];

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

module('Integration | Component | bs-form/element', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  testBS4('component has form-group bootstrap class', async function (assert) {
    await render(hbs`<BsForm::Element data-test-form-element />`);
    assert.dom('[data-test-form-element]').hasClass('form-group', 'component has form-group class');
  });

  testBS5('component has no form-group bootstrap class', async function (assert) {
    await render(hbs`<BsForm::Element data-test-form-element />`);
    assert.dom('[data-test-form-element]').doesNotHaveClass('form-group', 'component has no form-group class');
  });

  test('supports vertical form layout', async function (assert) {
    await render(hbs`
      <BsForm @formLayout="vertical" as |form|>
        <form.element @label="some label" data-test-form-element />
      </BsForm>
    `);

    if (isBootstrap(4)) {
      assert.dom('[data-test-form-element]').hasClass('form-group', 'component has form-group class');
    } else {
      assert.dom('[data-test-form-element]').hasClass('mb-3');
    }
    assert.equal(
      this.element.querySelector('[data-test-form-element] > :nth-child(1)').tagName,
      'LABEL',
      'first child is a label'
    );
    assert.equal(
      this.element.querySelector('[data-test-form-element] > :nth-child(2)').tagName,
      'INPUT',
      'second child is a input'
    );
  });

  test('supports horizontal form layout', async function (assert) {
    await render(hbs`
      <BsForm @formLayout="horizontal" as |form|>
        <form.element @label="some label" data-test-form-element />
      </BsForm>
    `);

    if (isBootstrap(4)) {
      assert.dom('[data-test-form-element]').hasClass('form-group', 'component has form-group class');
    } else {
      assert.dom('[data-test-form-element]').hasClass('row').hasClass('mb-3');
    }
    assert.equal(
      this.element.querySelector('[data-test-form-element] > :nth-child(1)').tagName,
      'LABEL',
      'first child is a label'
    );
    assert.dom('[data-test-form-element] > :nth-child(1)').hasClass('col-md-4', 'label has grid class');
    assert.equal(
      this.element.querySelector('[data-test-form-element] > :nth-child(2)').tagName,
      'DIV',
      'second child is a div'
    );
    assert.dom('[data-test-form-element] > :nth-child(2)').hasClass('col-md-8', 'div has grid class');
    assert.equal(
      this.element.querySelector('[data-test-form-element] > :nth-child(2) > :first-child').tagName,
      'INPUT',
      'divs first child is an input'
    );
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
      hbs`<BsForm::Element @controlType={{this.controlType}} @formLayout={{this.formLayout}} @horizontalLabelGridClass="col-md-4" />`
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
      hbs`<BsForm @model={{this.model}} as |f|><f.element @controlType={{this.controlType}} @property="prop" /></BsForm>`
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
      hbs`<BsForm::Element @controlType={{this.controlType}} @horizontalLabelGridClass="col-md-4" @model={{this.model}} @property="name" @onChange={{action this.change}} />`
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
      hbs`<BsForm @model={{this.model}} @formLayout={{this.formLayout}} as |form|><form.element @controlType={{this.controlType}} @property="prop" @label="myLabel" /></BsForm>`
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

  module('controlType "text" is supported', function () {
    test('controlType "text" is supported', async function (assert) {
      await controlTypeLayoutTest.call(this, assert, 'text', 'input[type=text]');
      await controlTypeValueTest.call(this, assert, 'text', 'input[type=text]', ['myValue', undefined]);
      await controlTypeUpdateTest.call(this, assert, 'text', 'input[type=text]', 'myValue');
      await labeledControlTest.call(this, assert, 'text', 'input[type=text]');
    });

    test('supports horizontal form layout', async function (assert) {
      await render(hbs`
        <BsForm @formLayout="horizontal" as |form|>
          <form.element @controlType="text" @label="some label" @options={{this.simpleOptions}} data-test-form-element />
        </BsForm>
      `);

      assert.dom('[data-test-form-element] > label').hasClass('col-md-4');
      assert.dom('[data-test-form-element] > div').hasClass('col-md-8');
    });

    test('supports horizontal form layout with custom grid class', async function (assert) {
      await render(hbs`
        <BsForm @formLayout="horizontal" as |form|>
          <form.element @controlType="text" @label="some label" @options={{this.simpleOptions}} @horizontalLabelGridClass="col-md-3" data-test-form-element />
        </BsForm>
      `);

      assert.dom('[data-test-form-element] > label').hasClass('col-md-3');
      assert.dom('[data-test-form-element] > div').hasClass('col-md-9');
    });

    test('supports horizontal form layout with multiple custom grid classes', async function (assert) {
      await render(hbs`
        <BsForm @formLayout="horizontal" as |form|>
          <form.element @controlType="text" @label="some label" @options={{this.simpleOptions}} @horizontalLabelGridClass="col-md-3 col-lg-2" data-test-form-element />
        </BsForm>
      `);

      assert.dom('[data-test-form-element] > label').hasClass('col-md-3').hasClass('col-lg-2');
      assert.dom('[data-test-form-element] > div').hasClass('col-md-9').hasClass('col-lg-10');
    });
  });

  module('controlType "textarea" is supported', function () {
    test('controlType "textarea" is supported', async function (assert) {
      await controlTypeLayoutTest.call(this, assert, 'textarea', 'textarea', 'myValue');
      await controlTypeValueTest.call(this, assert, 'textarea', 'textarea', ['myValue', undefined]);
      await controlTypeUpdateTest.call(this, assert, 'textarea', 'textarea', 'myValue');
      await labeledControlTest.call(this, assert, 'textarea', 'textarea');
    });

    test('supports horizontal form layout', async function (assert) {
      await render(hbs`
        <BsForm @formLayout="horizontal" as |form|>
          <form.element @controlType="textarea" @label="some label" @options={{this.simpleOptions}} data-test-form-element />
        </BsForm>
      `);

      assert.dom('[data-test-form-element] > label').hasClass('col-md-4');
      assert.dom('[data-test-form-element] > div').hasClass('col-md-8');
    });

    test('supports horizontal form layout with custom grid class', async function (assert) {
      await render(hbs`
        <BsForm @formLayout="horizontal" as |form|>
          <form.element @controlType="textarea" @label="some label" @options={{this.simpleOptions}} @horizontalLabelGridClass="col-md-3" data-test-form-element />
        </BsForm>
      `);

      assert.dom('[data-test-form-element] > label').hasClass('col-md-3');
      assert.dom('[data-test-form-element] > div').hasClass('col-md-9');
    });

    test('supports horizontal form layout with multiple custom grid classes', async function (assert) {
      await render(hbs`
        <BsForm @formLayout="horizontal" as |form|>
          <form.element @controlType="textarea" @label="some label" @options={{this.simpleOptions}} @horizontalLabelGridClass="col-md-3 col-lg-2" data-test-form-element />
        </BsForm>
      `);

      assert.dom('[data-test-form-element] > label').hasClass('col-md-3').hasClass('col-lg-2');
      assert.dom('[data-test-form-element] > div').hasClass('col-md-9').hasClass('col-lg-10');
    });
  });

  module('controlType "checkbox" is supported', function () {
    test('controlType "checkbox" is supported', async function (assert) {
      await controlTypeLayoutTest.call(this, assert, 'checkbox', 'input[type=checkbox]');
      await controlTypeValueTest.call(this, assert, 'checkbox', 'input[type=checkbox]', [true, false], function () {
        return this.checked;
      });
      await controlTypeUpdateTest.call(this, assert, 'checkbox', 'input[type=checkbox]', true, false, function () {
        return click(this);
      });
    });

    test('supports horizontal form layout', async function (assert) {
      await render(hbs`
        <BsForm @formLayout="horizontal" as |form|>
          <form.element @controlType="checkbox" @label="some label" @options={{this.simpleOptions}} data-test-form-element />
        </BsForm>
      `);

      assert.dom('[data-test-form-element] > div').hasClass('col-md-8').hasClass('offset-md-4');
    });

    test('supports horizontal form layout with custom grid class', async function (assert) {
      await render(hbs`
        <BsForm @formLayout="horizontal" as |form|>
          <form.element @controlType="checkbox" @label="some label" @options={{this.simpleOptions}} @horizontalLabelGridClass="col-md-3" data-test-form-element />
        </BsForm>
      `);

      assert.dom('[data-test-form-element] > div').hasClass('col-md-9').hasClass('offset-md-3');
    });

    test('supports horizontal form layout with multiple custom grid classes', async function (assert) {
      await render(hbs`
        <BsForm @formLayout="horizontal" as |form|>
          <form.element @controlType="checkbox" @label="some label" @options={{this.simpleOptions}} @horizontalLabelGridClass="col-md-3 col-lg-2" data-test-form-element />
        </BsForm>
      `);

      assert
        .dom('[data-test-form-element] > div')
        .hasClass('col-md-9')
        .hasClass('col-lg-10')
        .hasClass('offset-md-3')
        .hasClass('offset-lg-2');
    });
  });

  module('controlType "switch" is supported', function () {
    testBS4('controlType "switch" is supported', async function (assert) {
      await render(hbs`
      <BsForm as |form|>
        <form.element @controlType="switch" />
      </BsForm>
    `);

      assert.dom('div.custom-control.custom-switch > input[type="checkbox"].custom-control-input').exists({ count: 1 });
      assert.dom('div.custom-control.custom-switch > label.custom-control-label').exists({ count: 1 });
      assert.dom('div.custom-control.custom-switch').doesNotHaveClass('form-check');

      await controlTypeLayoutTest.call(this, assert, 'switch', 'input[type=checkbox]');
      await controlTypeValueTest.call(this, assert, 'switch', 'input[type=checkbox]', [true, false], function () {
        return this.checked;
      });
      await controlTypeUpdateTest.call(this, assert, 'switch', 'input[type=checkbox]', true, false, function () {
        return click(this);
      });
    });

    testBS5('controlType "switch" is supported', async function (assert) {
      await render(hbs`
      <BsForm as |form|>
        <form.element @controlType="switch" />
      </BsForm>
    `);

      assert.dom('div.form-check.form-switch > input[type="checkbox"].form-check-input').exists({ count: 1 });
      assert.dom('div.form-check.form-switch > label.form-check-label').exists({ count: 1 });

      await controlTypeLayoutTest.call(this, assert, 'switch', 'input[type=checkbox]');
      await controlTypeValueTest.call(this, assert, 'switch', 'input[type=checkbox]', [true, false], function () {
        return this.checked;
      });
      await controlTypeUpdateTest.call(this, assert, 'switch', 'input[type=checkbox]', true, false, function () {
        return click(this);
      });
    });

    test('supports horizontal form layout', async function (assert) {
      await render(hbs`
        <BsForm @formLayout="horizontal" as |form|>
          <form.element @controlType="switch" @label="some label" @options={{this.simpleOptions}} data-test-form-element />
        </BsForm>
      `);

      assert.dom('[data-test-form-element] > div').hasClass('col-md-8').hasClass('offset-md-4');
    });

    test('supports horizontal form layout with custom grid class', async function (assert) {
      await render(hbs`
        <BsForm @formLayout="horizontal" as |form|>
          <form.element @controlType="switch" @label="some label" @options={{this.simpleOptions}} @horizontalLabelGridClass="col-md-3" data-test-form-element />
        </BsForm>
      `);

      assert.dom('[data-test-form-element] > div').hasClass('col-md-9').hasClass('offset-md-3');
    });

    test('supports horizontal form layout with multiple custom grid classes', async function (assert) {
      await render(hbs`
        <BsForm @formLayout="horizontal" as |form|>
          <form.element @controlType="switch" @label="some label" @options={{this.simpleOptions}} @horizontalLabelGridClass="col-md-3 col-lg-2" data-test-form-element />
        </BsForm>
      `);

      assert
        .dom('[data-test-form-element] > div')
        .hasClass('col-md-9')
        .hasClass('col-lg-10')
        .hasClass('offset-md-3')
        .hasClass('offset-lg-2');
    });
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
        hbs`<BsForm::Element @controlType="radio" @formLayout={{this.formLayout}} @options={{this.simpleOptions}} @horizontalLabelGridClass="col-md-4" />`
      );

      formLayouts.forEach((layout) => {
        this.set('formLayout', layout);
        assert.dom('input[type=radio]').exists({ count: 2 }, `component has radio control for form layout ${layout}`);
      });
    });

    test('it renders simple options', async function (assert) {
      await render(
        hbs`<BsForm::Element @controlType="radio" @formLayout="horizontal" @options={{this.simpleOptions}} />`
      );

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
      await render(
        hbs`<BsForm::Element @controlType="radio" @options={{this.hashOptions}} @optionLabelPath="title" />`
      );

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
        <BsForm::Element @controlType="radio" @options={{this.simpleOptions}} as |Element|>
          <Element.control as |option index|>
            {{index}}: {{option}}
          </Element.control>
        </BsForm::Element>
      `);

      assert.dom(this.element.querySelectorAll('label')[0]).hasText('0: foo');
      assert.dom(this.element.querySelectorAll('label')[1]).hasText('1: bar');
    });

    test('has correct markup', async function (assert) {
      await render(hbs`<BsForm::Element @controlType="radio" @label="some label" @options={{this.simpleOptions}} />`);

      assert.dom('legend').exists({ count: 1 }, 'renders a <legend> instead of a <label> for radio group');
      assert.dom('legend').hasText('some label', 'renders value of label argument as text of <legend>');
      assert.dom('legend').doesNotHaveAttribute('for', '<legend> does not have a for attribute');

      assert.dom('.form-check').exists({ count: 2 });
      assert.dom('.form-check input[type=radio]').hasClass('form-check-input');
      assert.dom('.form-check label').hasClass('form-check-label');
    });

    test('supports horizontal form layout', async function (assert) {
      await render(hbs`
        <BsForm @formLayout="horizontal" as |form|>
          <form.element @controlType="radio" @label="some label" @options={{this.simpleOptions}} />
        </BsForm>
      `);

      assert.dom('legend').hasClass('col-form-label');
      assert.dom('legend').hasClass('col-md-4');
      assert.dom('.row > :not(legend)').hasClass('col-md-8');
    });

    test('supports inline', async function (assert) {
      await render(hbs`
        <BsForm::Element @controlType="radio" @options={{this.simpleOptions}} as |Element|>
          <Element.control @inline={{true}} />
        </BsForm::Element>
      `);

      assert.dom('.form-check.form-check-inline').exists({ count: 2 });
    });

    test('has correct value', async function (assert) {
      let model = EmberObject.create();
      this.set('model', model);

      await render(
        hbs`<BsForm @model={{this.model}} as |f|><f.element @controlType="radio" @options={{this.simpleOptions}} @property="prop" /></BsForm>`
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
        hbs`<BsForm::Element @controlType="radio" @options={{this.simpleOptions}} @model={{this.model}} @property="name" @onChange={{action this.change}} />`
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
    await render(hbs`<BsForm::Element @property="foo" @model={{this.model}} />`);

    assert.dom('input').hasValue('bar', 'input has expected value from model');

    this.set('model.foo', 'baz');
    assert.dom('input').hasValue('baz', 'input updates value from model');
  });

  test('Custom controls are supported', async function (assert) {
    let model = new (class {
      @tracked gender = 'male';
    })();

    this.set('form', ensureSafeComponent(ValidatingForm, this));
    this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

    this.set('model', model);
    await render(hbs`
      <this.form @elementComponent={{this.formElement}} @model={{this.model}} as |form|>
        <form.element
          @controlType="textarea"
          @label="Gender"
          @property="gender"
          @showAllValidations={{true}}
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
      </this.form>
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

  test('if invisibleLabel is true visually hidden class is added to label', async function (assert) {
    await render(hbs`<BsForm::Element @label="myLabel" />`);
    assert.dom('label').hasNoClass(visuallyHiddenClass(), 'sr-only class is not present as defaultText');

    await render(
      hbs`<BsForm @formLayout="vertical"><BsForm::Element @label="myLabel" @invisibleLabel={{true}} /></BsForm>`
    );
    assert.dom('label').hasClass(visuallyHiddenClass(), 'sr-only class is present for formLayout vertical');

    await render(
      hbs`<BsForm @formLayout="horizontal"><BsForm::Element @label="myLabel" @invisibleLabel={{true}} /></BsForm>`
    );
    assert.dom('label').hasClass(visuallyHiddenClass(), 'sr-only class is present for formLayout horizontal');

    await render(
      hbs`<BsForm @formLayout="inline"><BsForm::Element @label="myLabel" @invisibleLabel={{true}} /></BsForm>`
    );
    assert.dom('label').hasClass(visuallyHiddenClass(), 'sr-only class is present for formLayout inline');
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
        <BsForm::Element @property="name" @model={{this.model}} />
    `);
    await focus('input');
    await blur('input');
    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationSuccessClass(), "form group isn't shown as having errors if there is no validator");
  });

  test('shows validation success', async function (assert) {
    this.set('model', EmberObject.create({ name: null }));
    this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

    await render(hbs`
        <this.formElement @property="name" @showAllValidations={{true}} @model={{this.model}} />
    `);
    assert
      .dom(formFeedbackElement())
      .hasClass(validationSuccessClass(), 'validation succcess is shown when form signals to show all validations');
  });

  testRequiringFocus('shows validation errors', async function (assert) {
    this.set('errors', A(['Invalid']));
    this.set('model', EmberObject.create({ name: null }));
    this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

    await render(hbs`
        <this.formElement @property="name" @errors={{this.errors}} @model={{this.model}} data-test-form-element />
    `);
    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationErrorClass(), "validation errors aren't shown before user interaction");
    await focus('input');
    await blur('input');
    assert
      .dom(formFeedbackElement())
      .hasClass(validationErrorClass(), 'validation errors are shown after user interaction when errors are present');
    assert.dom(`[data-test-form-element] .${formFeedbackClass()}`).hasText('Invalid');
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
    this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

    await render(hbs`
        <this.formElement @property="name" @warnings={{this.warnings}} @model={{this.model}} data-test-form-element />
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
    assert.dom(`[data-test-form-element] .${formFeedbackClass()}`).hasText('Insecure');
    run(() => {
      this.set('warnings', A());
    });
    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationWarningClass(), "form group isn't shown as having warnings if there are't any");
  });

  testRequiringFocus('does not throw when focusout is triggered twice', async function (assert) {
    // This covers a very rare edge case scenario:
    // A form element contains its input *and* some other focusable element, here a submit button
    // The input is focused, then the button clicked. This triggers a focusout event, which renders validations
    // by setting `this.showOwnValidation=true`. In the same event loop, this causes disabling the button, which
    // causes the button to again loose focus, thus triggering a focusout event again
    // Setting showOwnValidation again will then cause a Glimmer assertion like
    // `You attempted to update showOwnValidation on ..., but it had already been used previously in the same computation.`

    this.set('model', { name: null });
    this.set('form', ensureSafeComponent(ValidatingForm, this));
    this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

    await render(hbs`
      <this.form @elementComponent={{this.formElement}} as |form|>
        <form.element @property="name" @model={{this.model}} data-test-form-element as |el|>
          <el.control data-test-first/>
          <button type="submit" disabled={{if el.validation true false}}>Send</button>
        </form.element>
      </this.form>
    `);

    focus('input');
    click('button');

    await settled();

    // test that no Glimmer assertion is thrown
    assert.ok(true);
  });

  test('shows custom error immediately', async function (assert) {
    this.set('model', EmberObject.create({ name: null }));
    this.set('error', 'some error');
    await render(hbs`
        <BsForm @model={{this.model}} as |form|>
          <form.element @property="name" @customError={{this.error}} data-test-form-element />
        </BsForm>
    `);
    assert.dom(formFeedbackElement()).hasClass(validationErrorClass(), 'custom error is shown immediately');
    assert.dom(`[data-test-form-element] .${formFeedbackClass()}`).hasText('some error');
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
        <BsForm @model={{this.model}} as |form|>
          <form.element @property="name" @customWarning={{this.warning}} data-test-form-element />
        </BsForm>
    `);
    assert.dom(formFeedbackElement()).hasClass(validationWarningClass(), 'custom warning is shown immediately');
    assert.dom(`[data-test-form-element] .${formFeedbackClass()}`).hasText('some warning');
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
    this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

    await render(hbs`
        <this.formElement @property="name" @errors={{this.errors}} @customWarning={{this.warning}} @model={{this.model}} data-test-form-element />
    `);
    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationErrorClass(), "validation errors aren't shown before user interaction");
    assert.dom(formFeedbackElement()).hasClass(validationWarningClass(), 'custom warning is shown immediately');
    assert.dom(`[data-test-form-element] .${formFeedbackClass()}`).hasText('some warning', 'Custom Warning is shown');
    await focus('input');
    await blur('input');
    assert
      .dom(formFeedbackElement())
      .hasClass(validationErrorClass(), 'validation errors are shown after user interaction when errors are present');
    assert
      .dom(formFeedbackElement())
      .hasNoClass(validationWarningClass(), 'custom warning is removed when errors are shown');
    assert.dom(`[data-test-form-element] .${formFeedbackClass()}`).hasText('Invalid', 'Validation error is shown');
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
      this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

      await render(hbs`
        <this.formElement @property="name" @errors={{this.errors}} @model={{this.model}} @showValidationOn={{this.showValidationOn}} />
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
      this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

      await render(hbs`
        <this.formElement @property="name" @errors={{this.errors}} @model={{this.model}} @showValidationOn="change" />
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

  testRequiringFocus('event triggered on input group button does not enable validation', async function (assert) {
    this.set('errors', A(['Invalid']));
    this.set('model', EmberObject.create({ name: null }));
    this.set('form', ensureSafeComponent(ValidatingForm, this));
    this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

    await render(hbs`
      <this.form @elementComponent={{this.formElement}} as |form|>
        <form.element @property="name" @errors={{this.errors}} @model={{this.model}} as |el|>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <button class="btn btn-outline-secondary" type="button">Button</button>
            </div>
            {{el.control}}
          </div>
        </form.element>
      </this.form>
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
      this.set('form', ensureSafeComponent(ValidatingForm, this));
      this.set('formElement', ensureSafeComponent(ValidatingFormElement, this));

      await render(hbs`
        <this.form @elementComponent={{this.formElement}} as |form|>
          <form.element @property="name" @errors={{this.errors}} @model={{this.model}} @doNotShowValidationForEventTargets={{this.doNotShowValidationForEventTargets}} as |el|>
            {{el.control}}
            <button type="button" data-trigger-validation="false">Test</button>
          </form.element>
        </this.form>
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

  test('it can change a value instead of a property', async function (assert) {
    this.set('update', (name) => this.set('name', name));
    this.set('name', 'Tomster');

    await render(hbs`
      <BsForm::Element @onChange={{this.update}} @value={{this.name}} />
    `);

    assert.dom('input').hasValue('Tomster');

    await fillIn('input', 'Zoey');

    assert.dom('input').hasValue('Zoey');
    assert.equal(this.name, 'Zoey');
  });

  test('support size classes', async function (assert) {
    await render(hbs`<BsForm::Element @size="lg" @label="foo" @formLayout="horizontal" data-test-form-element />`);
    assert.dom('[data-test-form-element]').hasNoClass('form-group-lg', 'form-group has not large class');
    assert.dom('input').hasClass('form-control-lg', 'input has large class');
    assert.dom('label').hasClass('col-form-label-lg', 'label has large class');

    await render(hbs`<BsForm::Element @size="sm" @label="foo" @formLayout="horizontal" data-test-form-element />`);
    assert.dom('[data-test-form-element]').hasNoClass('form-group-sm', 'form-group has not small class');
    assert.dom('input').hasClass('form-control-sm', 'input has small class');
    assert.dom('label').hasClass('col-form-label-sm', 'label has large class');
  });

  test('supports setting HTML attributes to form group w/ angle brackets', async function (assert) {
    await render(hbs`<BsForm::element data-test-foo data-test-form-element />`);

    assert.dom('[data-test-form-element]').hasAttribute('data-test-foo');
    assert.dom('[data-test-foo]').exists({ count: 1 });
  });
});
