import Component from '@ember/component';
import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { A, isArray } from '@ember/array';
import {
  click,
  find,
  findAll,
  fillIn,
  triggerEvent,
  focus,
  blur
} from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import {
  formFeedbackClass,
  test,
  testRequiringFocus,
  testBS3,
  validationSuccessClass,
  validationErrorClass,
  validationWarningClass,
  formFeedbackElement,
  formHelpTextClass
} from '../../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-form/element', 'Integration | Component | bs-form/element', {
  integration: true
});

const formLayouts = ['vertical', 'horizontal', 'inline'];
const supportedInputAttributes = {
  name: 'dummy',
  required: true,
  readonly: true,
  placeholder: 'dummy',
  disabled: true,
  autofocus: true,
  size: 50,
  tabindex: 50,
  maxlength: 50,
  minlength: 50,
  min: 50,
  max: 50,
  pattern: 'dummy',
  accept: 'dummy',
  autocomplete: 'on',
  autosave: 'true',
  inputmode: 'latin',
  multiple: true,
  step: 50,
  form: 'dummy',
  spellcheck: true,
  title: 'dummy'
};
const supportedTextareaAttributes = {
  name: 'dummy',
  rows: 50,
  cols: 50,
  required: true,
  readonly: true,
  placeholder: 'dummy',
  disabled: true,
  autofocus: true,
  tabindex: 50,
  maxlength: 50,
  minlength: 50,
  autocomplete: 'on',
  form: 'dummy',
  spellcheck: true,
  wrap: 'hard',
  title: 'dummy'
};
const supportedCheckboxAttributes = {
  name: 'dummy',
  required: true,
  readonly: true,
  disabled: true,
  autofocus: true,
  tabindex: 50,
  form: 'dummy',
  title: 'dummy'
};

test('component has form-group bootstrap class', function(assert) {
  this.render(hbs`{{bs-form/element}}`);
  assert.equal(find(':first-child').classList.contains('form-group'), true, 'component has form-group class');
});

test('setting label property displays label tag', function(assert) {
  this.render(hbs`{{bs-form/element label="myLabel"}}`);

  assert.equal(findAll('label').length, 1, 'component has label tag');
  assert.equal(find('label').textContent.trim(), 'myLabel', 'label has text');
});

function controlTypeLayoutTest(assert, controlType, selector) {
  this.set('controlType', controlType);

  formLayouts.forEach((layout) => {
    this.set('formLayout', layout);
    this.render(hbs`{{bs-form/element controlType=controlType formLayout=formLayout horizontalLabelGridClass="col-md-4"}}`);
    assert.equal(findAll(selector).length, 1, `component has ${controlType} control for form layout ${layout}`);
  });
}

function controlTypeValueTest(assert, controlType, selector, values, getValueFn) {
  if (!isArray(values)) {
    values = [values];
  }
  values = A(values);

  this.set('controlType', controlType);
  let model = EmberObject.create();
  this.set('model', model);

  this.render(hbs`{{#bs-form model=model as |f|}}{{f.element controlType=controlType property="prop"}}{{/bs-form}}`);

  this.set('model.prop', 'foo');

  values.forEach((value) => {
    this.set('model.prop', value);
    let hasValue = typeof getValueFn === 'function' ? getValueFn.call(find(selector)) : find(selector).value;
    let expectedValue = value || '';
    assert.equal(hasValue, expectedValue, `${controlType} control has correct values`);
  });
}

async function controlTypeUpdateTest(assert, controlType, selector, value, oldValue = 'foo', setValueFn = null) {
  this.set('controlType', controlType);
  let action = this.spy();
  this.on('change', action);

  let model = EmberObject.create({
    name: oldValue
  });
  this.set('model', model);
  this.render(hbs`{{bs-form/element controlType=controlType horizontalLabelGridClass="col-md-4" model=model property="name" onChange=(action "change")}}`);

  if (typeof setValueFn === 'function') {
    setValueFn.call(find(selector), value);
  } else {
    await fillIn(selector, value);
    // this.$(selector).val(value).change();
  }
  assert.equal(this.get('model.name'), oldValue, `${controlType} value has not changed`);
  assert.ok(action.calledWith(value, model, 'name'), `onChange action of ${controlType} has been called with expected args`);
}

function labeledControlTest(assert, controlType, selector) {
  this.set('controlType', controlType);
  let model = EmberObject.create();
  this.set('model', model);

  formLayouts.forEach((layout) => {
    this.set('formLayout', layout);
    this.render(hbs`{{#bs-form model=model formLayout=formLayout as |form|}}{{form.element controlType=controlType property="prop" label="myLabel"}}{{/bs-form}}`);
    assert.equal(find(selector).getAttribute('id'), find('label').getAttribute('for'), `component and label ids do match for form layout ${layout}`);
  });
}

test('controlType "text" is supported', async function(assert) {
  controlTypeLayoutTest.call(this, assert, 'text', 'input[type=text]');
  controlTypeValueTest.call(this, assert, 'text', 'input[type=text]', ['myValue', undefined]);
  await controlTypeUpdateTest.call(this, assert, 'text', 'input[type=text]', 'myValue');
  labeledControlTest.call(this, assert, 'text', 'input[type=text]');
});

test('controlType "checkbox" is supported', async function(assert) {
  controlTypeLayoutTest.call(this, assert, 'checkbox', 'input[type=checkbox]');
  controlTypeValueTest.call(this, assert, 'checkbox', 'input[type=checkbox]', [true, false], function() {
    return this.checked;
  });
  await controlTypeUpdateTest.call(this, assert, 'checkbox', 'input[type=checkbox]', true, false, function() {
    return click(this);
  });
});

test('controlType "textarea" is supported', async function(assert) {
  controlTypeLayoutTest.call(this, assert, 'textarea', 'textarea', 'myValue');
  controlTypeValueTest.call(this, assert, 'textarea', 'textarea', ['myValue', undefined]);
  await controlTypeUpdateTest.call(this, assert, 'textarea', 'textarea', 'myValue');
  labeledControlTest.call(this, assert, 'textarea', 'textarea');
});

test('using "property" creates binding to model property', function(assert) {
  let model = EmberObject.create({
    foo: 'bar'
  });
  this.set('model', model);
  this.render(hbs`{{bs-form/element property="foo" model=model}}`);

  assert.equal(find('input').value, 'bar', 'input has expected value from model');

  this.set('model.foo', 'baz');
  assert.equal(find('input').value, 'baz', 'input updates value from model');
});

test('Changing formLayout changes markup', function(assert) {
  this.set('formLayout', 'vertical');
  this.render(hbs`{{#bs-form horizontalLabelGridClass="col-sm-4" formLayout=formLayout as |form|}}{{form.element controlType="text" label="myLabel"}}{{/bs-form}}`);
  assert.equal(find('form > div').classList.contains('form-group'), true, 'component has form-group class');
  assert.equal(find('form > div > :nth-child(1)').tagName, 'LABEL', 'first child is a label');
  assert.equal(find('form > div > :nth-child(2)').tagName, 'INPUT', 'second child is a input');

  this.set('formLayout', 'horizontal');
  assert.equal(find('form > div').classList.contains('form-group'), true, 'component has form-group class');
  assert.equal(find('form > div > :nth-child(1)').tagName, 'LABEL', 'first child is a label');
  assert.ok(find('form > div > :nth-child(1)').classList.contains('col-sm-4'), 'label has grid class');
  assert.equal(find('form > div > :nth-child(2)').tagName, 'DIV', 'second child is a div');
  assert.ok(find('form > div > :nth-child(2)').classList.contains('col-sm-8'), 'div has grid class');
  assert.equal(find('form > div > :nth-child(2) > :first-child').tagName, 'INPUT', 'divs first child is an input');
});

test('Custom controls are supported', function(assert) {
  this.set('model',
    EmberObject.create({
      gender: 'male'
    })
  );
  this.render(hbs`
    {{#bs-form model=model as |form|}}
      {{#form.element label="Gender" property="gender" validation="success" as |el|}}
        <div id="value">{{el.value}}</div>
        <div id="id">{{el.id}}</div>
        <div id="validation">{{el.validation}}</div>
        <div id="control">{{el.control}}</div>
      {{/form.element}}
    {{/bs-form}}
  `);

  assert.equal(findAll('#value').length, 1, 'block template is rendered');
  assert.equal(find('#value').textContent.trim(), 'male', 'value is yielded to block template');
  assert.equal(find('#id').textContent.trim(), `${find('.form-group').getAttribute('id')}-field`, 'id is yielded to block template');
  assert.equal(find('#validation').textContent.trim(), 'success');
  assert.equal(findAll('#control input[type=text]').length, 1, 'control component is yielded');
});

test('supported input attributes propagate', function(assert) {
  formLayouts.forEach((formLayout) => {
    this.set('formLayout', formLayout);
    let resetProps = Object.keys(supportedInputAttributes).reduce((prev, key) => {
      prev[key] = undefined;
      return prev;
    }, {});
    this.setProperties(resetProps);
    this.render(hbs`{{bs-form/element formLayout=formLayout
      name=name
      required=required
      readonly=readonly
      placeholder=placeholder
      disabled=disabled
      autofocus=autofocus
      size=size
      tabindex=tabindex
      minlength=minlength
      maxlength=maxlength
      min=min
      max=max
      pattern=pattern
      accept=accept
      autocomplete=autocomplete
      autosave=autosave
      inputmode=inputmode
      multiple=multiple
      step=step
      form=form
      spellcheck=spellcheck
      title=title
    }}`);

    for (let attribute in supportedInputAttributes) {
      assert.equal(find('input').getAttribute(attribute), undefined, `input attribute ${attribute} is undefined [${formLayout}]`);
      let value = supportedInputAttributes[attribute];
      this.set(attribute, value);
      if (value === true) {
        assert.ok(find('input').hasAttribute(attribute), `input has attribute ${attribute} [${formLayout}]`);
      } else {
        assert.equal(find('input').getAttribute(attribute), value, `input attribute ${attribute} is ${value} [${formLayout}]`);
      }
    }
    this.render(hbs``); // hack to prevent browser exception when setting size to undefined
  });
});

test('supported textarea attributes propagate', function(assert) {
  formLayouts.forEach((formLayout) => {
    this.set('formLayout', formLayout);
    let resetProps = Object.keys(supportedTextareaAttributes).reduce((prev, key) => {
      prev[key] = undefined;
      return prev;
    }, {});
    this.setProperties(resetProps);
    this.render(hbs`{{bs-form/element formLayout=formLayout controlType="textarea"
      name=name
      rows=rows
      cols=cols
      required=required
      readonly=readonly
      placeholder=placeholder
      disabled=disabled
      autofocus=autofocus
      tabindex=tabindex
      minlength=minlength
      maxlength=maxlength
      autocomplete=autocomplete
      form=form
      spellcheck=spellcheck
      wrap=wrap
      title=title
    }}`);

    for (let attribute in supportedTextareaAttributes) {
      assert.equal(find('textarea').getAttribute(attribute), undefined, `textarea attribute ${attribute} is undefined [${formLayout}]`);
      let value = supportedTextareaAttributes[attribute];
      this.set(attribute, value);
      if (value === true) {
        assert.ok(find('textarea').hasAttribute(attribute), `textarea has attribute ${attribute} [${formLayout}]`);
      } else {
        assert.equal(find('textarea').getAttribute(attribute), value, `textarea attribute ${attribute} is ${value} [${formLayout}]`);
      }
    }

    // Without this MSEdge will fail with an invalid argument exception in Glimmer!??
    this.clearRender();
  });
});

test('supported checkbox attributes propagate', function(assert) {
  formLayouts.forEach((formLayout) => {
    this.set('formLayout', formLayout);
    let resetProps = Object.keys(supportedCheckboxAttributes).reduce((prev, key) => {
      prev[key] = undefined;
      return prev;
    }, {});
    this.setProperties(resetProps);
    this.render(hbs`{{bs-form/element controlType="checkbox" formLayout=formLayout
      name=name
      required=required
      readonly=readonly
      disabled=disabled
      autofocus=autofocus
      tabindex=tabindex
      form=form
      title=title
    }}`);

    for (let attribute in supportedCheckboxAttributes) {
      assert.equal(find('input').getAttribute(attribute), undefined, `checkbox attribute ${attribute} is undefined [${formLayout}]`);
      let value = supportedCheckboxAttributes[attribute];
      this.set(attribute, value);
      if (value === true) {
        assert.ok(find('input').hasAttribute(attribute), `input has attribute ${attribute} [${formLayout}]`);
      } else {
        assert.equal(find('input').getAttribute(attribute), value, `input attribute ${attribute} is ${value} [${formLayout}]`);
      }
    }
  });
});

test('required property propagates', function(assert) {
  this.render(hbs`{{bs-form/element label="myLabel" required=true}}`);
  assert.ok(find('.form-group').classList.contains('is-required'), 'component has is-required class');
});

test('disabled property propagates', function(assert) {
  this.render(hbs`{{bs-form/element label="myLabel" disabled=true}}`);
  assert.ok(find('.form-group').classList.contains('disabled'), 'component has disabled class');
});

test('if invisibleLabel is true sr-only class is added to label', function(assert) {
  this.render(hbs`{{bs-form/element label="myLabel"}}`);
  assert.notOk(find('label').classList.contains('sr-only'), 'sr-only class is not present as defaultText');

  this.render(hbs`{{#bs-form formLayout="vertical" }}{{bs-form/element label="myLabel" invisibleLabel=true}}{{/bs-form}}`);
  assert.ok(find('label').classList.contains('sr-only'), 'sr-only class is present for formLayout vertical');

  this.render(hbs`{{#bs-form formLayout="horizontal" }}{{bs-form/element label="myLabel" invisibleLabel=true}}{{/bs-form}}`);
  assert.ok(find('label').classList.contains('sr-only'), 'sr-only class is present for formLayout horizontal');

  this.render(hbs`{{#bs-form formLayout="inline" }}{{bs-form/element label="myLabel" invisibleLabel=true}}{{/bs-form}}`);
  assert.ok(find('label').classList.contains('sr-only'), 'sr-only class is present for formLayout inline');
});

testBS3('adjusts validation icon position if there is an input group', async function(assert) {
  assert.expect(6);
  this.set('validation', 'success');
  this.set('formLayout', 'vertical');
  this.render(hbs`
    {{#bs-form formLayout=formLayout as |form|}}
      {{#form.element validation=validation label='adjusts validation icon position' classNames='addon'}}
        <div class="input-group">
          <input class="form-control">
          <div class="input-group-addon">
            @example.com
          </div>
        </div>
      {{/form.element}}
      {{#form.element validation=validation label='adjusts validation icon position' classNames='button'}}
        <div class="input-group">
          <input class="form-control">
          <div class="input-group-btn">
            <button class="btn btn-default" type="button">foo</button>
            <button class="btn btn-default" type="button">bar</button>
          </div>
        </div>
      {{/form.element}}
    {{/bs-form}}
  `);
  // assumption on bootstrap defaults:
  // feedback icons does have right: 0px for vertical forms
  // https://github.com/twbs/bootstrap/blob/v3.3.6/less/forms.less#L400-L403
  assert.equal(
    find('.addon .form-control-feedback').style.right,
    `${find('.addon .input-group-addon').offsetWidth}px`,
    'works for addon on init'
  );
  assert.equal(
    find('.button .form-control-feedback').style.right,
    `${find('.button .input-group-btn').offsetWidth}px`,
    'works for button on init'
  );
  let expectedRightValue = find('.addon .form-control-feedback').style.right;
  this.set('validation', null);
  assert.ok(
    findAll('.form-control-feedback').length === 0,
    'assumption'
  );
  this.set('validation', 'error');
  assert.equal(
    find('.addon .form-control-feedback').style.right,
    expectedRightValue,
    'adjusts correctly after validation changed from null'
  );
  this.set('validation', 'success');
  await fillIn('.addon input', 'foo');
  await triggerEvent('.addon input', 'change');
  assert.equal(
    find('.addon .form-control-feedback').style.right,
    expectedRightValue,
    'adjusts correctly after validation changed form error to success'
  );
  // assumption on bootstrap defaults:
  // feedback icons does have right: 15px for horizontal forms
  // https://github.com/twbs/bootstrap/blob/v3.3.6/less/forms.less#L589-L591
  // https://github.com/twbs/bootstrap/blob/v3.3.6/less/variables.less#L326-L327
  this.set('formLayout', 'horizontal');

  assert.equal(
    find('.addon .form-control-feedback').style.right,
    `${find('.addon .input-group-addon').offsetWidth + 15}px`,
    'takes bootstrap default positioning into account'
  );
});

testRequiringFocus('shows validation state only when validator is present', async function(assert) {
  this.set('model', EmberObject.create({
    name: null, validate() {
    }
  }));
  this.render(hbs`
      {{bs-form/element property='name' model=model}}
  `);
  await focus('input');
  await blur('input');
  assert.notOk(
    find(formFeedbackElement()).classList.contains(validationSuccessClass()),
    'form group isn\'t shown as having errors if there is no validator'
  );
});

test('shows validation success', async function(assert) {
  this.set('model', EmberObject.create({ name: null }));
  this.render(hbs`
      {{bs-form/element property='name' showAllValidations=true hasValidator=true model=model}}
  `);
  assert.ok(
    find(formFeedbackElement()).classList.contains(validationSuccessClass()),
    'validation succcess is shown when form signals to show all validations'
  );
});

testRequiringFocus('shows validation errors', async function(assert) {
  this.set('errors', A(['Invalid']));
  this.set('model', EmberObject.create({ name: null }));
  this.render(hbs`
      {{bs-form/element property='name' hasValidator=true errors=errors model=model}}
  `);
  assert.notOk(
    find(formFeedbackElement()).classList.contains(validationErrorClass()),
    'validation errors aren\'t shown before user interaction'
  );
  await focus('input');
  await blur('input');
  assert.ok(
    find(formFeedbackElement()).classList.contains(validationErrorClass()),
    'validation errors are shown after user interaction when errors are present'
  );
  assert.equal(find(`.form-group .${formFeedbackClass()}`).textContent.trim(), 'Invalid');
  run(() => {
    this.set('errors', A());
  });
  assert.notOk(
    find(formFeedbackElement()).classList.contains(validationErrorClass()),
    'form group isn\'t shown as having errors if there aren\'t any'
  );
});

testRequiringFocus('shows validation warnings', async function(assert) {
  this.set('warnings', A(['Insecure']));
  this.set('model', EmberObject.create({ name: null }));
  this.render(hbs`
      {{bs-form/element property='name' hasValidator=true warnings=warnings model=model}}
  `);
  assert.notOk(
    find(formFeedbackElement()).classList.contains(validationWarningClass()),
    'validation warnings aren\'t shown before user interaction'
  );
  await focus('input');
  await blur('input');
  assert.ok(
    find(formFeedbackElement()).classList.contains(validationWarningClass()),
    'validation warnings are shown after user interaction when warnings are present'
  );
  assert.equal(find(`.form-group .${formFeedbackClass()}`).textContent.trim(), 'Insecure');
  run(() => {
    this.set('warnings', A());
  });
  assert.notOk(
    find(formFeedbackElement()).classList.contains(validationWarningClass()),
    'form group isn\'t shown as having warnings if there are\'t any'
  );
});

test('shows custom error immediately', function(assert) {
  this.set('model', EmberObject.create({ name: null }));
  this.set('error', 'some error');
  this.render(hbs`
      {{bs-form/element property='name' hasValidator=true customError=error model=model}}
  `);
  assert.ok(
    find(formFeedbackElement()).classList.contains(validationErrorClass()),
    'custom error is shown immediately'
  );
  assert.equal(find(`.form-group .${formFeedbackClass()}`).textContent.trim(), 'some error');
  run(() => {
    this.set('error', null);
  });
  assert.notOk(
    find(formFeedbackElement()).classList.contains(validationErrorClass()),
    'form group isn\'t shown as having errors if there aren\'t any'
  );
});

test('shows custom warning immediately', function(assert) {
  this.set('model', EmberObject.create({ name: null }));
  this.set('warning', 'some warning');
  this.render(hbs`
      {{bs-form/element property='name' hasValidator=true customWarning=warning model=model}}
  `);
  assert.ok(
    find(formFeedbackElement()).classList.contains(validationWarningClass()),
    'custom warning is shown immediately'
  );
  assert.equal(find(`.form-group .${formFeedbackClass()}`).textContent.trim(), 'some warning');
  run(() => {
    this.set('warning', null);
  });
  assert.notOk(
    find(formFeedbackElement()).classList.contains(validationWarningClass()),
    'form group isn\'t shown as having warning if there aren\'t any'
  );
});

testRequiringFocus('shows validation errors in preference to custom warning', async function(assert) {
  this.set('errors', A(['Invalid']));
  this.set('warning', 'some warning');
  this.set('model', EmberObject.create({ name: null }));
  this.render(hbs`
      {{bs-form/element property='name' hasValidator=true errors=errors customWarning=warning model=model}}
  `);
  assert.notOk(
    find(formFeedbackElement()).classList.contains(validationErrorClass()),
    'validation errors aren\'t shown before user interaction'
  );
  assert.ok(
    find(formFeedbackElement()).classList.contains(validationWarningClass()),
    'custom warning is shown immediately'
  );
  assert.equal(find(`.form-group .${formFeedbackClass()}`).textContent.trim(), 'some warning', 'Custom Warning is shown');
  await focus('input');
  await blur('input');
  assert.ok(
    find(formFeedbackElement()).classList.contains(validationErrorClass()),
    'validation errors are shown after user interaction when errors are present'
  );
  assert.notOk(
    find(formFeedbackElement()).classList.contains(validationWarningClass()),
    'custom warning is removed when errors are shown'
  );
  assert.equal(find(`.form-group .${formFeedbackClass()}`).textContent.trim(), 'Invalid', 'Validation error is shown');
  run(() => {
    this.set('errors', A());
  });
  assert.notOk(
    find(formFeedbackElement()).classList.contains(validationErrorClass()),
    'form group isn\'t shown as having errors if there aren\'t any'
  );
  assert.ok(
    find(formFeedbackElement()).classList.contains(validationWarningClass()),
    'custom warning is shown when errors are removed'
  );
});

testRequiringFocus('events enabling validation rendering are configurable per `showValidationOn` (array)', async function(assert) {
  this.set('errors', A(['Invalid']));
  this.set('model', EmberObject.create({ name: null }));
  this.set('showValidationOn', ['change']);
  this.render(hbs`
      {{bs-form/element property='name' hasValidator=true errors=errors model=model showValidationOn=showValidationOn}}
  `);
  assert.notOk(
    find(formFeedbackElement()).classList.contains(validationErrorClass()),
    'validation warnings aren\'t shown before user interaction'
  );
  await focus('input');
  await blur('input');
  assert.notOk(
    find(formFeedbackElement()).classList.contains(validationErrorClass()),
    'events not present in `showValidationOn` are ignored'
  );
  await fillIn('input', 'foo');
  await triggerEvent('input', 'change');
  assert.ok(
    find(formFeedbackElement()).classList.contains(validationErrorClass()),
    'events present in `showValidationOn` trigger validation'
  );
});

testRequiringFocus('events enabling validation rendering are configurable per `showValidationOn` (string)', async function(assert) {
  this.set('errors', A(['Invalid']));
  this.set('model', EmberObject.create({ name: null }));
  this.render(hbs`
      {{bs-form/element property='name' hasValidator=true errors=errors model=model showValidationOn='change'}}
  `);
  assert.notOk(
    find(formFeedbackElement()).classList.contains(validationErrorClass()),
    'validation warnings aren\'t shown before user interaction'
  );
  await focus('input');
  await blur('input');
  assert.notOk(
    find(formFeedbackElement()).classList.contains(validationErrorClass()),
    'events not present in `showValidationOn` are ignored'
  );
  await triggerEvent('input', 'change');
  assert.ok(
    find(formFeedbackElement()).classList.contains(validationErrorClass()),
    'events present in `showValidationOn` trigger validation'
  );
});

test('it uses custom control component when registered in DI container', function(assert) {
  this.register('component:bs-form/element/control/foo', Component.extend({
    layout: hbs`<div id="foo"></div>`
  }));
  this.render(hbs`
      {{bs-form/element controlType="foo"}}
  `);
  assert.equal(findAll('#foo').length, 1, 'Custom control is used');
});

test('shows help text if available', function(assert) {
  this.render(hbs`
    {{bs-form/element helpText="foo"}}
  `);

  let helpTextClass = `.${formHelpTextClass()}`;
  assert.equal(findAll(helpTextClass).length, 1, 'has help text element');
  assert.equal(find(helpTextClass).textContent.trim(), 'foo', 'shows help text');

  assert.ok(find('input').getAttribute('aria-describedby'), 'control has aria-describedby attribute');
  assert.equal(find('input').getAttribute('aria-describedby'), find(helpTextClass).getAttribute('id'), 'aria-describedby matches id');
});
