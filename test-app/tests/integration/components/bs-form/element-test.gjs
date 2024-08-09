import { run } from '@ember/runloop';
import { A, isArray } from '@ember/array';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  blur,
  click,
  fillIn,
  focus,
  render,
  settled,
  triggerEvent,
} from '@ember/test-helpers';
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
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';
import sinon from 'sinon';
import { tracked } from '@glimmer/tracking';
import Form from 'ember-bootstrap/components/bs-form';
import FormElement from 'ember-bootstrap/components/bs-form/element';
import { ensureSafeComponent } from '@embroider/util';
import BsForm from 'ember-bootstrap/components/bs-form';
import BsFormElement from 'ember-bootstrap/components/bs-form/element';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';

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
    await render(<template><BsFormElement data-test-form-element /></template>);
    assert
      .dom('[data-test-form-element]')
      .hasClass('form-group', 'component has form-group class');
  });

  testBS5(
    'component has no form-group bootstrap class',
    async function (assert) {
      await render(
        <template><BsFormElement data-test-form-element /></template>,
      );
      assert
        .dom('[data-test-form-element]')
        .doesNotHaveClass('form-group', 'component has no form-group class');
    },
  );

  test('supports vertical form layout', async function (assert) {
    await render(
      <template>
        <BsForm @formLayout='vertical' as |form|>
          <form.element @label='some label' data-test-form-element />
        </BsForm>
      </template>,
    );

    if (isBootstrap(4)) {
      assert
        .dom('[data-test-form-element]')
        .hasClass('form-group', 'component has form-group class');
    } else {
      assert.dom('[data-test-form-element]').hasClass('mb-3');
    }
    assert.equal(
      this.element.querySelector('[data-test-form-element] > :nth-child(1)')
        .tagName,
      'LABEL',
      'first child is a label',
    );
    assert.equal(
      this.element.querySelector('[data-test-form-element] > :nth-child(2)')
        .tagName,
      'INPUT',
      'second child is a input',
    );
  });

  test('supports horizontal form layout', async function (assert) {
    await render(
      <template>
        <BsForm @formLayout='horizontal' as |form|>
          <form.element @label='some label' data-test-form-element />
        </BsForm>
      </template>,
    );

    if (isBootstrap(4)) {
      assert
        .dom('[data-test-form-element]')
        .hasClass('form-group', 'component has form-group class');
    } else {
      assert.dom('[data-test-form-element]').hasClass('row').hasClass('mb-3');
    }
    assert.equal(
      this.element.querySelector('[data-test-form-element] > :nth-child(1)')
        .tagName,
      'LABEL',
      'first child is a label',
    );
    assert
      .dom('[data-test-form-element] > :nth-child(1)')
      .hasClass('col-md-4', 'label has grid class');
    assert.equal(
      this.element.querySelector('[data-test-form-element] > :nth-child(2)')
        .tagName,
      'DIV',
      'second child is a div',
    );
    assert
      .dom('[data-test-form-element] > :nth-child(2)')
      .hasClass('col-md-8', 'div has grid class');
    assert.equal(
      this.element.querySelector(
        '[data-test-form-element] > :nth-child(2) > :first-child',
      ).tagName,
      'INPUT',
      'divs first child is an input',
    );
  });

  test('setting label property displays label tag', async function (assert) {
    await render(<template><BsFormElement @label='myLabel' /></template>);

    assert.dom('label').exists({ count: 1 }, 'component has label tag');
    assert.dom('label').hasText('myLabel', 'label has text');
  });

  async function controlTypeLayoutTest(assert, controlType, selector) {
    class State {
      @tracked formLayout = 'vertical';
    }
    const state = new State();
    await render(
      <template>
        <BsFormElement
          @controlType={{controlType}}
          @formLayout={{state.formLayout}}
          @horizontalLabelGridClass='col-md-4'
        />
      </template>,
    );

    formLayouts.forEach((layout) => {
      state.formLayout = layout;
      assert
        .dom(selector)
        .exists(
          { count: 1 },
          `component has ${controlType} control for form layout ${layout}`,
        );
    });
  }

  async function controlTypeValueTest(
    assert,
    controlType,
    selector,
    values,
    getValueFn,
  ) {
    if (!isArray(values)) {
      values = [values];
    }
    values = A(values);

    class Model {
      @tracked prop;
    }
    class State {
      @tracked model = new Model();
    }
    const state = new State();

    await render(
      <template>
        <BsForm @model={{state.model}} as |f|><f.element
            @controlType={{controlType}}
            @property='prop'
          /></BsForm>
      </template>,
    );

    state.model.prop = 'foo';
    await settled();

    for (const value of values) {
      state.model.prop = value;
      await settled();

      let hasValue =
        typeof getValueFn === 'function'
          ? getValueFn.call(this.element.querySelector(selector))
          : this.element.querySelector(selector).value;
      let expectedValue = value || '';
      assert.equal(
        hasValue,
        expectedValue,
        `${controlType} control has correct values`,
      );
    }
  }

  async function controlTypeUpdateTest(
    assert,
    controlType,
    selector,
    value,
    oldValue = 'foo',
    setValueFn = null,
  ) {
    class Model {
      @tracked name = oldValue;
    }
    const model = new Model();
    class State {
      @tracked controlType = controlType;
    }
    const state = new State();
    const changeAction = sinon.spy();

    await render(
      <template>
        <BsFormElement
          @controlType={{state.controlType}}
          @horizontalLabelGridClass='col-md-4'
          @model={{model}}
          @property='name'
          @onChange={{changeAction}}
        />
      </template>,
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
    assert.equal(model.name, oldValue, `${controlType} value has not changed`);
    assert.ok(
      changeAction.calledWith(value, model, 'name'),
      `onChange action of ${controlType} has been called with expected args`,
    );
  }

  async function labeledControlTest(assert, controlType, selector) {
    class State {
      @tracked formLayout;
    }
    const state = new State();

    class Model {
      @tracked prop;
    }
    const model = new Model();
    await render(
      <template>
        <BsForm
          @model={{model}}
          @formLayout={{state.formLayout}}
          as |form|
        ><form.element
            @controlType={{controlType}}
            @property='prop'
            @label='myLabel'
          /></BsForm>
      </template>,
    );

    formLayouts.forEach((layout) => {
      state.formLayout = layout;
      assert.equal(
        this.element.querySelector(selector).getAttribute('id'),
        this.element.querySelector('label').getAttribute('for'),
        `component and label ids do match for form layout ${layout}`,
      );
    });
  }

  module('controlType "text" is supported', function () {
    test('controlType "text" is supported', async function (assert) {
      await controlTypeLayoutTest.call(
        this,
        assert,
        'text',
        'input[type=text]',
      );
      await controlTypeValueTest.call(
        this,
        assert,
        'text',
        'input[type=text]',
        ['myValue', undefined],
      );
      await controlTypeUpdateTest.call(
        this,
        assert,
        'text',
        'input[type=text]',
        'myValue',
      );
      await labeledControlTest.call(this, assert, 'text', 'input[type=text]');
    });

    test('supports horizontal form layout', async function (assert) {
      await render(
        <template>
          <BsForm @formLayout='horizontal' as |form|>
            <form.element
              @controlType='text'
              @label='some label'
              @options={{this.simpleOptions}}
              data-test-form-element
            />
          </BsForm>
        </template>,
      );

      assert.dom('[data-test-form-element] > label').hasClass('col-md-4');
      assert.dom('[data-test-form-element] > div').hasClass('col-md-8');
    });

    test('supports horizontal form layout with custom grid class', async function (assert) {
      await render(
        <template>
          <BsForm @formLayout='horizontal' as |form|>
            <form.element
              @controlType='text'
              @label='some label'
              @options={{this.simpleOptions}}
              @horizontalLabelGridClass='col-md-3'
              data-test-form-element
            />
          </BsForm>
        </template>,
      );

      assert.dom('[data-test-form-element] > label').hasClass('col-md-3');
      assert.dom('[data-test-form-element] > div').hasClass('col-md-9');
    });

    test('supports horizontal form layout with multiple custom grid classes', async function (assert) {
      await render(
        <template>
          <BsForm @formLayout='horizontal' as |form|>
            <form.element
              @controlType='text'
              @label='some label'
              @options={{this.simpleOptions}}
              @horizontalLabelGridClass='col-md-3 col-lg-2'
              data-test-form-element
            />
          </BsForm>
        </template>,
      );

      assert
        .dom('[data-test-form-element] > label')
        .hasClass('col-md-3')
        .hasClass('col-lg-2');
      assert
        .dom('[data-test-form-element] > div')
        .hasClass('col-md-9')
        .hasClass('col-lg-10');
    });
  });

  module('controlType "textarea" is supported', function () {
    test('controlType "textarea" is supported', async function (assert) {
      await controlTypeLayoutTest.call(
        this,
        assert,
        'textarea',
        'textarea',
        'myValue',
      );
      await controlTypeValueTest.call(this, assert, 'textarea', 'textarea', [
        'myValue',
        undefined,
      ]);
      await controlTypeUpdateTest.call(
        this,
        assert,
        'textarea',
        'textarea',
        'myValue',
      );
      await labeledControlTest.call(this, assert, 'textarea', 'textarea');
    });

    test('supports horizontal form layout', async function (assert) {
      await render(
        <template>
          <BsForm @formLayout='horizontal' as |form|>
            <form.element
              @controlType='textarea'
              @label='some label'
              @options={{this.simpleOptions}}
              data-test-form-element
            />
          </BsForm>
        </template>,
      );

      assert.dom('[data-test-form-element] > label').hasClass('col-md-4');
      assert.dom('[data-test-form-element] > div').hasClass('col-md-8');
    });

    test('supports horizontal form layout with custom grid class', async function (assert) {
      await render(
        <template>
          <BsForm @formLayout='horizontal' as |form|>
            <form.element
              @controlType='textarea'
              @label='some label'
              @options={{this.simpleOptions}}
              @horizontalLabelGridClass='col-md-3'
              data-test-form-element
            />
          </BsForm>
        </template>,
      );

      assert.dom('[data-test-form-element] > label').hasClass('col-md-3');
      assert.dom('[data-test-form-element] > div').hasClass('col-md-9');
    });

    test('supports horizontal form layout with multiple custom grid classes', async function (assert) {
      await render(
        <template>
          <BsForm @formLayout='horizontal' as |form|>
            <form.element
              @controlType='textarea'
              @label='some label'
              @options={{this.simpleOptions}}
              @horizontalLabelGridClass='col-md-3 col-lg-2'
              data-test-form-element
            />
          </BsForm>
        </template>,
      );

      assert
        .dom('[data-test-form-element] > label')
        .hasClass('col-md-3')
        .hasClass('col-lg-2');
      assert
        .dom('[data-test-form-element] > div')
        .hasClass('col-md-9')
        .hasClass('col-lg-10');
    });
  });

  module('controlType "checkbox" is supported', function () {
    test('controlType "checkbox" is supported', async function (assert) {
      await controlTypeLayoutTest.call(
        this,
        assert,
        'checkbox',
        'input[type=checkbox]',
      );
      await controlTypeValueTest.call(
        this,
        assert,
        'checkbox',
        'input[type=checkbox]',
        [true, false],
        function () {
          return this.checked;
        },
      );
      await controlTypeUpdateTest.call(
        this,
        assert,
        'checkbox',
        'input[type=checkbox]',
        true,
        false,
        function () {
          return click(this);
        },
      );
    });

    test('supports horizontal form layout', async function (assert) {
      await render(
        <template>
          <BsForm @formLayout='horizontal' as |form|>
            <form.element
              @controlType='checkbox'
              @label='some label'
              @options={{this.simpleOptions}}
              data-test-form-element
            />
          </BsForm>
        </template>,
      );

      assert
        .dom('[data-test-form-element] > div')
        .hasClass('col-md-8')
        .hasClass('offset-md-4');
    });

    test('supports horizontal form layout with custom grid class', async function (assert) {
      await render(
        <template>
          <BsForm @formLayout='horizontal' as |form|>
            <form.element
              @controlType='checkbox'
              @label='some label'
              @options={{this.simpleOptions}}
              @horizontalLabelGridClass='col-md-3'
              data-test-form-element
            />
          </BsForm>
        </template>,
      );

      assert
        .dom('[data-test-form-element] > div')
        .hasClass('col-md-9')
        .hasClass('offset-md-3');
    });

    test('supports horizontal form layout with multiple custom grid classes', async function (assert) {
      await render(
        <template>
          <BsForm @formLayout='horizontal' as |form|>
            <form.element
              @controlType='checkbox'
              @label='some label'
              @options={{this.simpleOptions}}
              @horizontalLabelGridClass='col-md-3 col-lg-2'
              data-test-form-element
            />
          </BsForm>
        </template>,
      );

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
      await render(
        <template>
          <BsForm as |form|>
            <form.element @controlType='switch' />
          </BsForm>
        </template>,
      );

      assert
        .dom(
          'div.custom-control.custom-switch > input[type="checkbox"].custom-control-input',
        )
        .exists({ count: 1 });
      assert
        .dom('div.custom-control.custom-switch > label.custom-control-label')
        .exists({ count: 1 });
      assert
        .dom('div.custom-control.custom-switch')
        .doesNotHaveClass('form-check');

      await controlTypeLayoutTest.call(
        this,
        assert,
        'switch',
        'input[type=checkbox]',
      );
      await controlTypeValueTest.call(
        this,
        assert,
        'switch',
        'input[type=checkbox]',
        [true, false],
        function () {
          return this.checked;
        },
      );
      await controlTypeUpdateTest.call(
        this,
        assert,
        'switch',
        'input[type=checkbox]',
        true,
        false,
        function () {
          return click(this);
        },
      );
    });

    testBS5('controlType "switch" is supported', async function (assert) {
      await render(
        <template>
          <BsForm as |form|>
            <form.element @controlType='switch' />
          </BsForm>
        </template>,
      );

      assert
        .dom(
          'div.form-check.form-switch > input[type="checkbox"].form-check-input',
        )
        .exists({ count: 1 });
      assert
        .dom('div.form-check.form-switch > label.form-check-label')
        .exists({ count: 1 });

      await controlTypeLayoutTest.call(
        this,
        assert,
        'switch',
        'input[type=checkbox]',
      );
      await controlTypeValueTest.call(
        this,
        assert,
        'switch',
        'input[type=checkbox]',
        [true, false],
        function () {
          return this.checked;
        },
      );
      await controlTypeUpdateTest.call(
        this,
        assert,
        'switch',
        'input[type=checkbox]',
        true,
        false,
        function () {
          return click(this);
        },
      );
    });

    test('supports horizontal form layout', async function (assert) {
      await render(
        <template>
          <BsForm @formLayout='horizontal' as |form|>
            <form.element
              @controlType='switch'
              @label='some label'
              @options={{this.simpleOptions}}
              data-test-form-element
            />
          </BsForm>
        </template>,
      );

      assert
        .dom('[data-test-form-element] > div')
        .hasClass('col-md-8')
        .hasClass('offset-md-4');
    });

    test('supports horizontal form layout with custom grid class', async function (assert) {
      await render(
        <template>
          <BsForm @formLayout='horizontal' as |form|>
            <form.element
              @controlType='switch'
              @label='some label'
              @options={{this.simpleOptions}}
              @horizontalLabelGridClass='col-md-3'
              data-test-form-element
            />
          </BsForm>
        </template>,
      );

      assert
        .dom('[data-test-form-element] > div')
        .hasClass('col-md-9')
        .hasClass('offset-md-3');
    });

    test('supports horizontal form layout with multiple custom grid classes', async function (assert) {
      await render(
        <template>
          <BsForm @formLayout='horizontal' as |form|>
            <form.element
              @controlType='switch'
              @label='some label'
              @options={{this.simpleOptions}}
              @horizontalLabelGridClass='col-md-3 col-lg-2'
              data-test-form-element
            />
          </BsForm>
        </template>,
      );

      assert
        .dom('[data-test-form-element] > div')
        .hasClass('col-md-9')
        .hasClass('col-lg-10')
        .hasClass('offset-md-3')
        .hasClass('offset-lg-2');
    });
  });

  module('controlType "radio" is supported', function () {
    const simpleOptions = ['foo', 'bar'];

    const hashOptions = [
      {
        title: 'foo',
      },
      {
        title: 'bar',
      },
    ];

    test('controlType "radio" is supported', async function (assert) {
      class State {
        @tracked formLayout = 'vertical';
      }
      const state = new State();
      await render(
        <template>
          <BsFormElement
            @controlType='radio'
            @formLayout={{state.formLayout}}
            @options={{simpleOptions}}
            @horizontalLabelGridClass='col-md-4'
          />
        </template>,
      );

      formLayouts.forEach((layout) => {
        state.formLayout = layout;
        assert
          .dom('input[type=radio]')
          .exists(
            { count: 2 },
            `component has radio control for form layout ${layout}`,
          );
      });
    });

    test('it renders simple options', async function (assert) {
      await render(
        <template>
          <BsFormElement
            @controlType='radio'
            @formLayout='horizontal'
            @options={{simpleOptions}}
          />
        </template>,
      );

      assert.dom('input[type=radio]').exists({ count: 2 });
      assert.dom('label').exists({ count: 2 });

      assert.dom(this.element.querySelectorAll('label')[0]).hasText('foo');
      assert.dom(this.element.querySelectorAll('label')[1]).hasText('bar');
      assert
        .dom(this.element.querySelectorAll('label')[0])
        .hasAttribute(
          'for',
          this.element
            .querySelectorAll('input[type=radio]')[0]
            .getAttribute('id'),
        );
      assert
        .dom(this.element.querySelectorAll('label')[1])
        .hasAttribute(
          'for',
          this.element
            .querySelectorAll('input[type=radio]')[1]
            .getAttribute('id'),
        );
    });

    test('it renders hash options', async function (assert) {
      await render(
        <template>
          <BsFormElement
            @controlType='radio'
            @options={{hashOptions}}
            @optionLabelPath='title'
          />
        </template>,
      );

      assert.dom('input[type=radio]').exists({ count: 2 });
      assert.dom('label').exists({ count: 2 });

      assert.dom(this.element.querySelectorAll('label')[0]).hasText('foo');
      assert.dom(this.element.querySelectorAll('label')[1]).hasText('bar');
      assert
        .dom(this.element.querySelectorAll('label')[0])
        .hasAttribute(
          'for',
          this.element
            .querySelectorAll('input[type=radio]')[0]
            .getAttribute('id'),
        );
      assert
        .dom(this.element.querySelectorAll('label')[1])
        .hasAttribute(
          'for',
          this.element
            .querySelectorAll('input[type=radio]')[1]
            .getAttribute('id'),
        );
    });

    test('Block mode allows to customize label for each radio input', async function (assert) {
      await render(
        <template>
          <BsFormElement
            @controlType='radio'
            @options={{simpleOptions}}
            as |Element|
          >
            <Element.control as |option index|>
              {{index}}:
              {{option}}
            </Element.control>
          </BsFormElement>
        </template>,
      );

      assert.dom(this.element.querySelectorAll('label')[0]).hasText('0: foo');
      assert.dom(this.element.querySelectorAll('label')[1]).hasText('1: bar');
    });

    test('has correct markup', async function (assert) {
      await render(
        <template>
          <BsFormElement
            @controlType='radio'
            @label='some label'
            @options={{simpleOptions}}
          />
        </template>,
      );

      assert
        .dom('legend')
        .exists(
          { count: 1 },
          'renders a <legend> instead of a <label> for radio group',
        );
      assert
        .dom('legend')
        .hasText(
          'some label',
          'renders value of label argument as text of <legend>',
        );
      assert
        .dom('legend')
        .doesNotHaveAttribute('for', '<legend> does not have a for attribute');

      assert.dom('.form-check').exists({ count: 2 });
      assert.dom('.form-check input[type=radio]').hasClass('form-check-input');
      assert.dom('.form-check label').hasClass('form-check-label');
    });

    test('supports horizontal form layout', async function (assert) {
      await render(
        <template>
          <BsForm @formLayout='horizontal' as |form|>
            <form.element
              @controlType='radio'
              @label='some label'
              @options={{simpleOptions}}
            />
          </BsForm>
        </template>,
      );

      assert.dom('legend').hasClass('col-form-label');
      assert.dom('legend').hasClass('col-md-4');
      assert.dom('.row > :not(legend)').hasClass('col-md-8');
    });

    test('supports inline', async function (assert) {
      await render(
        <template>
          <BsFormElement
            @controlType='radio'
            @options={{simpleOptions}}
            as |Element|
          >
            <Element.control @inline={{true}} />
          </BsFormElement>
        </template>,
      );

      assert.dom('.form-check.form-check-inline').exists({ count: 2 });
    });

    test('has correct value', async function (assert) {
      class Model {
        @tracked prop;
      }
      const model = new Model();

      await render(
        <template>
          <BsForm @model={{model}} as |f|><f.element
              @controlType='radio'
              @options={{simpleOptions}}
              @property='prop'
            /></BsForm>
        </template>,
      );

      model.prop = undefined;
      await settled();

      assert.notOk(this.element.querySelector('input[type=radio]').checked);

      model.prop = 'foo';
      await settled();
      assert.ok(this.element.querySelector('input[type=radio]').checked);
    });

    test('sends updates', async function (assert) {
      const changeAction = sinon.spy();

      class Model {
        @tracked name = 'foo';
      }
      const model = new Model();
      await render(
        <template>
          <BsFormElement
            @controlType='radio'
            @options={{simpleOptions}}
            @model={{model}}
            @property='name'
            @onChange={{changeAction}}
          />
        </template>,
      );
      await click(this.element.querySelectorAll('input[type=radio]')[1]);

      assert.equal(model.name, 'foo', `radio value has not changed`);
      assert.ok(
        changeAction.calledWith('bar', model, 'name'),
        `onChange action of radio has been called with expected args`,
      );
    });
  });

  test('using "property" creates binding to model property', async function (assert) {
    class Model {
      @tracked foo = 'bar';
    }
    const model = new Model();
    await render(
      <template><BsFormElement @property='foo' @model={{model}} /></template>,
    );

    assert.dom('input').hasValue('bar', 'input has expected value from model');

    model.foo = 'baz';
    await settled();
    assert.dom('input').hasValue('baz', 'input updates value from model');
  });

  test('Custom controls are supported', async function (assert) {
    class Model {
      @tracked gender = 'male';
    }
    const model = new Model();

    const formElement = ensureSafeComponent(ValidatingFormElement, this);
    const setTargetValue = (el, event) => {
      el.setValue(event.target.value);
    };

    await render(
      <template>
        <ValidatingForm
          @elementComponent={{formElement}}
          @model={{model}}
          as |form|
        >
          <form.element
            @controlType='textarea'
            @label='Gender'
            @property='gender'
            @showAllValidations={{true}}
            as |el|
          >
            <input
              type='text'
              id={{el.id}}
              value={{el.value}}
              class={{el.validation}}
              {{on 'input' (fn setTargetValue el)}}
            />
            <el.control />
          </form.element>
        </ValidatingForm>
      </template>,
    );

    assert.dom('input').exists({ count: 1 }, 'block template is rendered');
    assert.dom('input').hasValue('male', 'value is yielded to block template');
    assert
      .dom('input')
      .hasAttribute('id', { any: true }, 'id is yielded to block template');
    assert
      .dom('input')
      .hasClass('success', 'validation status is yielded to block template');
    assert.dom('textarea').exists({ count: 1 }, 'control component is yielded');

    await fillIn('input', 'female');
    assert.equal(
      model.gender,
      'female',
      'yielded setValue function updates property of model',
    );
    assert
      .dom('input')
      .hasValue('female', 'yielded value is updated with setValue function');
    assert
      .dom('textarea')
      .hasValue('female', 'value of yielded control component is updated');

    await fillIn('textarea', 'diverse');
    assert.equal(
      model.gender,
      'diverse',
      'yielded control component updates property of model',
    );
    assert
      .dom('input')
      .hasValue(
        'diverse',
        'yielded value is updated if changed through control component',
      );
    assert
      .dom('textarea')
      .hasValue('diverse', 'value of yielded control component is updated');
  });

  test('if invisibleLabel is true visually hidden class is added to label', async function (assert) {
    await render(<template><BsFormElement @label='myLabel' /></template>);
    assert
      .dom('label')
      .hasNoClass(
        visuallyHiddenClass(),
        'sr-only class is not present as defaultText',
      );

    await render(
      <template>
        <BsForm @formLayout='vertical'><BsFormElement
            @label='myLabel'
            @invisibleLabel={{true}}
          /></BsForm>
      </template>,
    );
    assert
      .dom('label')
      .hasClass(
        visuallyHiddenClass(),
        'sr-only class is present for formLayout vertical',
      );

    await render(
      <template>
        <BsForm @formLayout='horizontal'><BsFormElement
            @label='myLabel'
            @invisibleLabel={{true}}
          /></BsForm>
      </template>,
    );
    assert
      .dom('label')
      .hasClass(
        visuallyHiddenClass(),
        'sr-only class is present for formLayout horizontal',
      );

    await render(
      <template>
        <BsForm @formLayout='inline'><BsFormElement
            @label='myLabel'
            @invisibleLabel={{true}}
          /></BsForm>
      </template>,
    );
    assert
      .dom('label')
      .hasClass(
        visuallyHiddenClass(),
        'sr-only class is present for formLayout inline',
      );
  });

  testRequiringFocus(
    'shows validation state only when validator is present',
    async function (assert) {
      class Model {
        @tracked name = null;
        validate = () => {};
      }
      const model = new Model();

      await render(
        <template>
          <BsFormElement @property='name' @model={{model}} />
        </template>,
      );
      await focus('input');
      await blur('input');
      assert
        .dom(formFeedbackElement())
        .hasNoClass(
          validationSuccessClass(),
          "form group isn't shown as having errors if there is no validator",
        );
    },
  );

  test('shows validation success', async function (assert) {
    class Model {
      @tracked name = null;
    }
    const model = new Model();

    await render(
      <template>
        <ValidatingFormElement
          @property='name'
          @showAllValidations={{true}}
          @model={{model}}
        />
      </template>,
    );
    assert
      .dom(formFeedbackElement())
      .hasClass(
        validationSuccessClass(),
        'validation succcess is shown when form signals to show all validations',
      );
  });

  testRequiringFocus('shows validation errors', async function (assert) {
    class State {
      @tracked errors = A(['Invalid']);
    }
    const state = new State();
    class Model {
      @tracked name = null;
    }
    const model = new Model();

    await render(
      <template>
        <ValidatingFormElement
          @property='name'
          @errors={{state.errors}}
          @model={{model}}
          data-test-form-element
        />
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
    assert
      .dom(formFeedbackElement())
      .hasClass(
        validationErrorClass(),
        'validation errors are shown after user interaction when errors are present',
      );
    assert
      .dom(`[data-test-form-element] .${formFeedbackClass()}`)
      .hasText('Invalid');
    /* eslint-disable-next-line ember/no-runloop */
    run(() => {
      state.errors = A();
    });
    assert
      .dom(formFeedbackElement())
      .hasNoClass(
        validationErrorClass(),
        "form group isn't shown as having errors if there aren't any",
      );
  });

  testRequiringFocus('shows validation warnings', async function (assert) {
    class State {
      @tracked warnings = A(['Insecure']);
    }
    const state = new State();
    class Model {
      @tracked name = null;
    }
    const model = new Model();

    await render(
      <template>
        <ValidatingFormElement
          @property='name'
          @warnings={{state.warnings}}
          @model={{model}}
          data-test-form-element
        />
      </template>,
    );
    assert
      .dom(formFeedbackElement())
      .hasNoClass(
        validationWarningClass(),
        "validation warnings aren't shown before user interaction",
      );
    await focus('input');
    await blur('input');
    assert
      .dom(formFeedbackElement())
      .hasClass(
        validationWarningClass(),
        'validation warnings are shown after user interaction when warnings are present',
      );
    assert
      .dom(`[data-test-form-element] .${formFeedbackClass()}`)
      .hasText('Insecure');
    /* eslint-disable-next-line ember/no-runloop */
    run(() => {
      state.warnings = A();
    });
    assert
      .dom(formFeedbackElement())
      .hasNoClass(
        validationWarningClass(),
        "form group isn't shown as having warnings if there are't any",
      );
  });

  testRequiringFocus(
    'does not throw when focusout is triggered twice',
    async function (assert) {
      // This covers a very rare edge case scenario:
      // A form element contains its input *and* some other focusable element, here a submit button
      // The input is focused, then the button clicked. This triggers a focusout event, which renders validations
      // by setting `this.showOwnValidation=true`. In the same event loop, this causes disabling the button, which
      // causes the button to again loose focus, thus triggering a focusout event again
      // Setting showOwnValidation again will then cause a Glimmer assertion like
      // `You attempted to update showOwnValidation on ..., but it had already been used previously in the same computation.`

      const model = { name: null };
      const formElement = ensureSafeComponent(ValidatingFormElement, this);

      await render(
        <template>
          <ValidatingForm @elementComponent={{formElement}} as |form|>
            <form.element
              @property='name'
              @model={{model}}
              data-test-form-element
              as |el|
            >
              <el.control data-test-first />
              <button
                type='submit'
                disabled={{if el.validation true false}}
              >Send</button>
            </form.element>
          </ValidatingForm>
        </template>,
      );

      focus('input');
      click('button');

      await settled();

      // test that no Glimmer assertion is thrown
      assert.ok(true);
    },
  );

  test('shows custom error immediately', async function (assert) {
    class State {
      @tracked error = 'some error';
    }
    const state = new State();
    class Model {
      @tracked name = null;
    }
    const model = new Model();
    await render(
      <template>
        <BsForm @model={{model}} as |form|>
          <form.element
            @property='name'
            @customError={{state.error}}
            data-test-form-element
          />
        </BsForm>
      </template>,
    );
    assert
      .dom(formFeedbackElement())
      .hasClass(validationErrorClass(), 'custom error is shown immediately');
    assert
      .dom(`[data-test-form-element] .${formFeedbackClass()}`)
      .hasText('some error');
    /* eslint-disable-next-line ember/no-runloop */
    run(() => {
      state.error = null;
    });
    assert
      .dom(formFeedbackElement())
      .hasNoClass(
        validationErrorClass(),
        "form group isn't shown as having errors if there aren't any",
      );
  });

  test('shows custom warning immediately', async function (assert) {
    class State {
      @tracked warning = 'some warning';
    }
    const state = new State();
    class Model {
      @tracked name = null;
    }
    const model = new Model();
    await render(
      <template>
        <BsForm @model={{model}} as |form|>
          <form.element
            @property='name'
            @customWarning={{state.warning}}
            data-test-form-element
          />
        </BsForm>
      </template>,
    );
    assert
      .dom(formFeedbackElement())
      .hasClass(
        validationWarningClass(),
        'custom warning is shown immediately',
      );
    assert
      .dom(`[data-test-form-element] .${formFeedbackClass()}`)
      .hasText('some warning');
    /* eslint-disable-next-line ember/no-runloop */
    run(() => {
      state.warning = null;
    });
    assert
      .dom(formFeedbackElement())
      .hasNoClass(
        validationWarningClass(),
        "form group isn't shown as having warning if there aren't any",
      );
  });

  testRequiringFocus(
    'shows validation errors in preference to custom warning',
    async function (assert) {
      class State {
        @tracked errors = A(['Invalid']);
        @tracked warning = 'some warning';
      }
      const state = new State();
      class Model {
        @tracked name = null;
      }
      const model = new Model();

      await render(
        <template>
          <ValidatingFormElement
            @property='name'
            @errors={{state.errors}}
            @customWarning={{state.warning}}
            @model={{model}}
            data-test-form-element
          />
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
        .hasClass(
          validationWarningClass(),
          'custom warning is shown immediately',
        );
      assert
        .dom(`[data-test-form-element] .${formFeedbackClass()}`)
        .hasText('some warning', 'Custom Warning is shown');
      await focus('input');
      await blur('input');
      assert
        .dom(formFeedbackElement())
        .hasClass(
          validationErrorClass(),
          'validation errors are shown after user interaction when errors are present',
        );
      assert
        .dom(formFeedbackElement())
        .hasNoClass(
          validationWarningClass(),
          'custom warning is removed when errors are shown',
        );
      assert
        .dom(`[data-test-form-element] .${formFeedbackClass()}`)
        .hasText('Invalid', 'Validation error is shown');
      /* eslint-disable-next-line ember/no-runloop */
      run(() => {
        state.errors = A();
      });
      assert
        .dom(formFeedbackElement())
        .hasNoClass(
          validationErrorClass(),
          "form group isn't shown as having errors if there aren't any",
        );
      assert
        .dom(formFeedbackElement())
        .hasClass(
          validationWarningClass(),
          'custom warning is shown when errors are removed',
        );
    },
  );

  testRequiringFocus(
    'events enabling validation rendering are configurable per `showValidationOn` (array)',
    async function (assert) {
      class State {
        @tracked errors = A(['Invalid']);
      }
      const state = new State();
      class Model {
        @tracked name = null;
      }
      const model = new Model();
      const showValidationOn = ['change'];

      await render(
        <template>
          <ValidatingFormElement
            @property='name'
            @errors={{state.errors}}
            @model={{model}}
            @showValidationOn={{showValidationOn}}
          />
        </template>,
      );
      assert
        .dom(formFeedbackElement())
        .hasNoClass(
          validationErrorClass(),
          "validation warnings aren't shown before user interaction",
        );
      await focus('input');
      await blur('input');
      assert
        .dom(formFeedbackElement())
        .hasNoClass(
          validationErrorClass(),
          'events not present in `showValidationOn` are ignored',
        );
      await fillIn('input', 'foo');
      await triggerEvent('input', 'change');
      assert
        .dom(formFeedbackElement())
        .hasClass(
          validationErrorClass(),
          'events present in `showValidationOn` trigger validation',
        );
    },
  );

  testRequiringFocus(
    'events enabling validation rendering are configurable per `showValidationOn` (string)',
    async function (assert) {
      class State {
        @tracked errors = A(['Invalid']);
      }
      const state = new State();
      class Model {
        @tracked name = null;
      }
      const model = new Model();

      await render(
        <template>
          <ValidatingFormElement
            @property='name'
            @errors={{state.errors}}
            @model={{model}}
            @showValidationOn='change'
          />
        </template>,
      );
      assert
        .dom(formFeedbackElement())
        .hasNoClass(
          validationErrorClass(),
          "validation warnings aren't shown before user interaction",
        );
      await focus('input');
      await blur('input');
      assert
        .dom(formFeedbackElement())
        .hasNoClass(
          validationErrorClass(),
          'events not present in `showValidationOn` are ignored',
        );
      await triggerEvent('input', 'change');
      assert
        .dom(formFeedbackElement())
        .hasClass(
          validationErrorClass(),
          'events present in `showValidationOn` trigger validation',
        );
    },
  );

  testRequiringFocus(
    'event triggered on input group button does not enable validation',
    async function (assert) {
      class State {
        @tracked errors = A(['Invalid']);
      }
      const state = new State();
      class Model {
        @tracked name = null;
      }
      const model = new Model();

      const formElement = ensureSafeComponent(ValidatingFormElement, this);

      await render(
        <template>
          <ValidatingForm @elementComponent={{formElement}} as |form|>
            <form.element
              @property='name'
              @errors={{state.errors}}
              @model={{model}}
              as |el|
            >
              <div class='input-group mb-3'>
                <div class='input-group-prepend'>
                  <button
                    class='btn btn-outline-secondary'
                    type='button'
                  >Button</button>
                </div>
                {{el.control}}
              </div>
            </form.element>
          </ValidatingForm>
        </template>,
      );
      await click('button');
      assert
        .dom(formFeedbackElement())
        .hasNoClass(
          validationErrorClass(),
          "validation warnings aren't shown before user interaction",
        );
    },
  );

  testRequiringFocus(
    'event targets not enabling validation are configurable per `doNotShowValidationForEventTargets`',
    async function (assert) {
      class State {
        @tracked errors = A(['Invalid']);
        @tracked doNotShowValidationForEventTargets = [
          '[data-trigger-validation="false"]',
        ];
      }
      const state = new State();
      class Model {
        @tracked name = null;
      }
      const model = new Model();

      const formElement = ensureSafeComponent(ValidatingFormElement, this);

      await render(
        <template>
          <ValidatingForm @elementComponent={{formElement}} as |form|>
            <form.element
              @property='name'
              @errors={{state.errors}}
              @model={{model}}
              @doNotShowValidationForEventTargets={{state.doNotShowValidationForEventTargets}}
              as |el|
            >
              {{el.control}}
              <button
                type='button'
                data-trigger-validation='false'
              >Test</button>
            </form.element>
          </ValidatingForm>
        </template>,
      );
      await click('button');
      assert.dom(formFeedbackElement()).hasNoClass(validationErrorClass());

      state.doNotShowValidationForEventTargets = [];
      await click('button');
      assert.dom(formFeedbackElement()).hasNoClass(validationErrorClass());
    },
  );

  test('it uses custom control component when registered in DI container', async function (assert) {
    const testComponent = <template><div id='foo' /></template>;
    this.owner.register('component:bs-form/element/control/foo', testComponent);

    await render(<template><BsFormElement @controlType='foo' /></template>);
    assert.dom('#foo').exists({ count: 1 }, 'Custom control is used');
  });

  test('shows help text if available', async function (assert) {
    await render(<template><BsFormElement @helpText='foo' /></template>);

    let helpTextClass = `.${formHelpTextClass()}`;
    assert.dom(helpTextClass).exists({ count: 1 }, 'has help text element');
    assert.dom(helpTextClass).hasText('foo', 'shows help text');

    assert.ok(
      this.element.querySelector('input').getAttribute('aria-describedby'),
      'control has aria-describedby attribute',
    );
    assert.equal(
      this.element.querySelector('input').getAttribute('aria-describedby'),
      this.element.querySelector(helpTextClass).getAttribute('id'),
      'aria-describedby matches id',
    );
  });

  test('it can change a value instead of a property', async function (assert) {
    class State {
      @tracked name = 'Tomster';
    }
    const state = new State();
    const update = (name) => (state.name = name);

    await render(
      <template>
        <BsFormElement @onChange={{update}} @value={{state.name}} />
      </template>,
    );

    assert.dom('input').hasValue('Tomster');

    await fillIn('input', 'Zoey');

    assert.dom('input').hasValue('Zoey');
    assert.equal(state.name, 'Zoey');
  });

  test('support size classes', async function (assert) {
    await render(
      <template>
        <BsFormElement
          @size='lg'
          @label='foo'
          @formLayout='horizontal'
          data-test-form-element
        />
      </template>,
    );
    assert
      .dom('[data-test-form-element]')
      .hasNoClass('form-group-lg', 'form-group has not large class');
    assert.dom('input').hasClass('form-control-lg', 'input has large class');
    assert.dom('label').hasClass('col-form-label-lg', 'label has large class');

    await render(
      <template>
        <BsFormElement
          @size='sm'
          @label='foo'
          @formLayout='horizontal'
          data-test-form-element
        />
      </template>,
    );
    assert
      .dom('[data-test-form-element]')
      .hasNoClass('form-group-sm', 'form-group has not small class');
    assert.dom('input').hasClass('form-control-sm', 'input has small class');
    assert.dom('label').hasClass('col-form-label-sm', 'label has large class');
  });

  test('supports setting HTML attributes to form group w/ angle brackets', async function (assert) {
    await render(
      <template>
        <BsFormElement data-test-foo data-test-form-element />
      </template>,
    );

    assert.dom('[data-test-form-element]').hasAttribute('data-test-foo');
    assert.dom('[data-test-foo]').exists({ count: 1 });
  });
});
