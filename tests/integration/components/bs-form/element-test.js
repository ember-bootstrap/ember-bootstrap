import { moduleForComponent } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  isArray,
  A
} = Ember;

moduleForComponent('bs-form/element', 'Integration | Component | bs-form/element', {
  integration: true
});

const formLayouts = ['vertical', 'horizontal', 'inline'];
const supportedInputAttributes = {
  name: ['dummy', 'dummy'],
  required: [true, 'required'],
  readonly: [true, 'readonly'],
  placeholder: ['dummy', 'dummy'],
  disabled: [true, 'disabled'],
  autofocus: [true, 'autofocus'],
  size: [50, 50],
  tabindex: [50, 50],
  maxlength: [50, 50],
  minlength: [50, 50],
  min: [50, 50],
  max: [50, 50],
  pattern: ['dummy', 'dummy'],
  accept: ['dummy', 'dummy'],
  autocomplete: ['on', 'on'],
  autosave: ['true', 'true'],
  inputmode: ['latin', 'latin'],
  multiple: [true, 'multiple'],
  step: [50, 50],
  form: ['dummy', 'dummy'],
  spellcheck: [true, 'true']
};
const supportedTextareaAttributes = {
  name: ['dummy', 'dummy'],
  rows: [50, 50],
  cols: [50, 50],
  required: [true, 'required'],
  readonly: [true, 'readonly'],
  placeholder: ['dummy', 'dummy'],
  disabled: [true, 'disabled'],
  autofocus: [true, 'autofocus'],
  tabindex: [50, 50],
  maxlength: [50, 50],
  minlength: [50, 50],
  autocomplete: ['on', 'on'],
  form: ['dummy', 'dummy'],
  spellcheck: [true, 'true'],
  wrap: ['hard', 'hard']
};
const supportedCheckboxAttributes = {
  name: ['dummy', 'dummy'],
  required: [true, 'required'],
  readonly: [true, 'readonly'],
  disabled: [true, 'disabled'],
  autofocus: [true, 'autofocus'],
  tabindex: [50, 50],
  form: ['dummy', 'dummy']
};

test('component has form-group bootstrap class', function(assert) {
  this.render(hbs`{{bs-form/element}}`);
  assert.equal(this.$(':first-child').hasClass('form-group'), true, 'component has form-group class');
});

test('setting label property displays label tag', function(assert) {
  this.render(hbs`{{bs-form/element label="myLabel"}}`);

  assert.equal(this.$('label').length, 1, 'component has label tag');
  assert.equal(this.$('label').text().trim(), 'myLabel', 'label has text');
});

function controlTypeLayoutTest(assert, controlType, selector) {
  this.set('controlType', controlType);

  formLayouts.forEach((layout) => {
    this.set('formLayout', layout);
    this.render(hbs`{{bs-form/element controlType=controlType formLayout=formLayout horizontalLabelGridClass="col-md-4"}}`);
    assert.equal(this.$(selector).length, 1, `component has ${controlType} control for form layout ${layout}`);
  });
}

function controlTypeValueTest(assert, controlType, selector, values, getValueFn) {
  if (!isArray(values)) {
    values = [values];
  }
  values = A(values);

  this.set('controlType', controlType);

  formLayouts.forEach((layout) => {
    this.set('formLayout', layout);
    this.render(hbs`{{bs-form/element controlType=controlType formLayout=formLayout horizontalLabelGridClass="col-md-4" value=value}}`);

    values.forEach((value) => {
      this.set('value', value);
      let hasValue = typeof getValueFn === 'function' ? getValueFn.call(this.$(selector)) : this.$(selector).val();
      assert.equal(hasValue, value, `${controlType} control has correct values for form layout ${layout}`);
    });
  });
}

function controlTypeUpdateTest(assert, controlType, selector, value, oldValue = 'foo', setValueFn = null) {
  this.set('controlType', controlType);
  let action = this.spy();
  this.on('change', action);

  formLayouts.forEach((layout) => {
    this.set('formLayout', layout);
    let model = Ember.Object.create({
      name: oldValue
    });
    this.set('model', model);
    this.render(hbs`{{bs-form/element controlType=controlType formLayout=formLayout horizontalLabelGridClass="col-md-4" model=model property="name" onChange=(action "change")}}`);

    if (typeof setValueFn === 'function') {
      setValueFn.call(this.$(selector), value);
    } else {
      this.$(selector).val(value).trigger('input');
    }
    assert.equal(this.get('model.name'), oldValue, `${controlType} value has not changed for form layout ${layout}`);
    assert.ok(action.calledWith(value, model, 'name'), `onChange action of ${controlType} has been called with expected args for form layout ${layout}`);
  });
}

function labeledControlTest(assert, controlType, selector) {
  this.set('controlType', controlType);

  formLayouts.forEach((layout) => {
    this.set('formLayout', layout);
    this.render(hbs`{{#bs-form formLayout=formLayout as |form|}}{{form.element controlType=controlType label="myLabel"}}{{/bs-form}}`);
    assert.equal(this.$(selector).attr('id'), this.$('label').attr('for'), `component and label ids do match for form layout ${layout}`);
  });
}

test('controlType "text" is supported', function(assert) {
  controlTypeLayoutTest.call(this, assert, 'text', 'input[type=text]');
  controlTypeValueTest.call(this, assert, 'text', 'input[type=text]', 'myValue');
  controlTypeUpdateTest.call(this, assert, 'text', 'input[type=text]', 'myValue');
  labeledControlTest.call(this, assert, 'text', 'input[type=text]');
});

test('controlType "checkbox" is supported', function(assert) {
  controlTypeLayoutTest.call(this, assert, 'checkbox', 'input[type=checkbox]');
  controlTypeValueTest.call(this, assert, 'checkbox', 'input[type=checkbox]', [true, false], function() {
    return this.is(':checked');
  });
  controlTypeUpdateTest.call(this, assert, 'checkbox', 'input[type=checkbox]', true, false, function() {
    return this.click();
  });
});

test('controlType "textarea" is supported', function(assert) {
  controlTypeLayoutTest.call(this, assert, 'textarea', 'textarea', 'myValue');
  controlTypeValueTest.call(this, assert, 'textarea', 'textarea', 'myValue');
  controlTypeUpdateTest.call(this, assert, 'textarea', 'textarea', 'myValue');
  labeledControlTest.call(this, assert, 'textarea', 'textarea');
});

test('using "property" creates binding to model property', function(assert) {
  let model = Ember.Object.create({
    foo: 'bar'
  });
  this.set('model', model);
  this.render(hbs`{{bs-form/element property="foo" model=model}}`);

  assert.equal(this.$('input').val(), 'bar', 'input has expected value from model');

  this.set('model.foo', 'baz');
  assert.equal(this.$('input').val(), 'baz', 'input updates value from model');
});

test('Changing formLayout changes markup', function(assert) {
  this.set('formLayout', 'vertical');
  this.render(hbs`{{#bs-form horizontalLabelGridClass="col-sm-4" formLayout=formLayout as |form|}}{{form.element controlType="text" label="myLabel"}}{{/bs-form}}`);
  assert.equal(this.$(':first-child').hasClass('form-group'), true, 'component has form-group class');
  assert.equal(this.$(':first-child').children().eq(1).prop('tagName'), 'LABEL', 'first child is a label');
  assert.equal(this.$(':first-child').children().eq(2).prop('tagName'), 'INPUT', 'second child is a input');

  this.set('formLayout', 'horizontal');
  assert.equal(this.$(':first-child').hasClass('form-group'), true, 'component has form-group class');
  assert.equal(this.$(':first-child').children().eq(1).prop('tagName'), 'LABEL', 'first child is a label');
  assert.ok(this.$(':first-child').children().eq(1).hasClass('col-sm-4'), 'label has grid class');
  assert.equal(this.$(':first-child').children().eq(2).prop('tagName'), 'DIV', 'second child is a div');
  assert.ok(this.$(':first-child').children().eq(2).hasClass('col-sm-8'), 'div has grid class');
  assert.equal(this.$(':first-child').children().eq(2).find(':first-child').prop('tagName'), 'INPUT', 'divs first child is an input');
});

test('Custom controls are supported', function(assert) {
  this.set('model',
    Ember.Object.create({
      gender: 'male'
    })
  );
  this.render(hbs`
    {{#bs-form model=model as |form|}}
      {{#form.element label="Gender" property="gender" validation="success" as |el|}}
        <div id="value">{{el.value}}</div>
        <div id="id">{{el.id}}</div>
        <div id="validation">{{el.validation}}</div>
      {{/form.element}}
    {{/bs-form}}
  `);

  assert.equal(this.$('#value').length, 1, 'block template is rendered');
  assert.equal(this.$('#value').text().trim(), 'male', 'value is yielded to block template');
  assert.equal(this.$('#id').text().trim(), `${this.$('.form-group').attr('id')}-field`, 'id is yielded to block template');
  assert.equal(this.$('#validation').text().trim(), 'success');
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
    }}`);

    for (let attribute in supportedInputAttributes) {
      assert.equal(this.$('input').attr(attribute), undefined, `input attribute ${attribute} is undefined [${formLayout}]`);
      let [value, expectedValue] = supportedInputAttributes[attribute];
      this.set(attribute, value);
      assert.equal(this.$('input').attr(attribute), expectedValue, `input attribute ${attribute} is ${expectedValue} [${formLayout}]`);
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
    }}`);

    for (let attribute in supportedTextareaAttributes) {
      assert.equal(this.$('textarea').attr(attribute), undefined, `textarea attribute ${attribute} is undefined [${formLayout}]`);
      let [value, expectedValue] = supportedTextareaAttributes[attribute];
      this.set(attribute, value);
      assert.equal(this.$('textarea').attr(attribute), expectedValue, `textarea attribute ${attribute} is ${expectedValue} [${formLayout}]`);
    }
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
    }}`);

    for (let attribute in supportedCheckboxAttributes) {
      assert.equal(this.$('input').attr(attribute), undefined, `checkbox attribute ${attribute} is undefined [${formLayout}]`);
      let [value, expectedValue] = supportedCheckboxAttributes[attribute];
      this.set(attribute, value);
      assert.equal(this.$('input').attr(attribute), expectedValue, `input attribute ${attribute} is ${expectedValue} [${formLayout}]`);
    }
  });
});

test('required property propagates', function(assert) {
  this.render(hbs`{{bs-form/element label="myLabel" required=true}}`);
  assert.ok(this.$('.form-group').hasClass('is-required'), 'component has is-required class');
});

test('disabled property propagates', function(assert) {
  this.render(hbs`{{bs-form/element label="myLabel" disabled=true}}`);
  assert.ok(this.$('.form-group').hasClass('is-disabled'), 'component has is-disabled class');
});

test('if invisibleLabel is true sr-only class is added to label', function(assert) {
  let formLayouts = [
    'vertical',
    'horizontal',
    'inline'
  ];
  this.render(hbs`{{bs-form/element label="myLabel"}}`);
  assert.notOk(this.$('label').hasClass('sr-only'), 'sr-only class is not present as defaultText');
  formLayouts.forEach((formLayout) => {
    this.render(hbs`{{#bs-form formLayout=formLayout }}{{bs-form/element label="myLabel" invisibleLabel=true}}{{/bs-form}}`);
    assert.ok(this.$('label').hasClass('sr-only'), `sr-only class is present for formLayout ${formLayout}`);
  });
});

test('adjusts validation icon position if there is an input group', function(assert) {
  assert.expect(6);
  this.set('validation', 'success');
  this.set('formLayout', 'vertical');
  this.render(hbs`
    {{#bs-form formLayout=formLayout as |form|}}
      {{#form.element validation=validation label='ajusts validation icon position' classNames='addon'}}
        <div class="input-group">
          <input class="form-control">
          <div class="input-group-addon">
            @example.com
          </div>
        </div>
      {{/form.element}}
      {{#form.element validation=validation label='ajusts validation icon position' classNames='button'}}
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
    this.$('.addon .form-control-feedback').css('right'),
    `${this.$('.addon .input-group-addon').outerWidth()}px`,
    'works for addon on init'
  );
  assert.equal(
    this.$('.button .form-control-feedback').css('right'),
    `${this.$('.button .input-group-btn').outerWidth()}px`,
    'works for button on init'
  );
  let expectedRightValue = this.$('.addon .form-control-feedback').css('right');
  this.set('validation', null);
  assert.ok(
    this.$().has('.form-control-feedback').length === 0,
    'assumption'
  );
  this.set('validation', 'error');
  assert.equal(
    this.$('.addon .form-control-feedback').css('right'),
    expectedRightValue,
    'adjusts correctly after validation changed from null'
  );
  this.set('validation', 'success');
  this.$('.addon input').val('foo').trigger('change');
  assert.equal(
    this.$('.addon .form-control-feedback').css('right'),
    expectedRightValue,
    'adjusts correctly after validation changed form error to success'
  );
  // assumption on bootstrap defaults:
  // feedback icons does have right: 15px for horizontal forms
  // https://github.com/twbs/bootstrap/blob/v3.3.6/less/forms.less#L589-L591
  // https://github.com/twbs/bootstrap/blob/v3.3.6/less/variables.less#L326-L327
  this.set('formLayout', 'horizontal');
  /* PhantomJS 1.9 used by travis fails test due to a positioning or rounding issue.
   * PhantomJS 2.x and all major browsers are fine.
   * Replace test above by the strict one after travis upgraded PhantomJS finally.
   assert.equal(
   this.$('.addon .form-control-feedback').css('right'),
   `${this.$('.addon .input-group-addon').outerWidth() + 15}px`,
   'takes bootstrap default positioning into account'
   );
   */
  let gap = parseInt(this.$('.addon .form-control-feedback').css('right'))
    - this.$('.addon .input-group-addon').outerWidth() - 15;
  assert.ok(
    gap === 0 || gap === -1,
    'takes bootstrap default positioning into account'
  );
});

test('shows validation errors', function(assert) {
  this.set('errors', Ember.A(['Invalid']));
  this.set('model', Ember.Object.create({ name: null }));
  this.render(hbs`
      {{bs-form/element property='name' elementId='child' hasValidator=true errors=errors model=model}}
  `);
  assert.notOk(
    this.$('.form-group').hasClass('has-error'),
    'validation errors aren\'t shown before user interaction'
  );
  Ember.run(() => {
    this.$('input').trigger('focusout');
  });
  assert.ok(
    this.$('.form-group').hasClass('has-error'),
    'validation errors are shown after user interaction when errors are present (child)'
  );
  assert.equal(this.$('.form-group .help-block').text().trim(), 'Invalid');
  Ember.run(() => {
    this.set('errors', Ember.A());
  });
  assert.notOk(
    this.$('.form-group').hasClass('has-error'),
    'form group isn\'t shown as having errors if there aren\'t any'
  );
});

test('shows validation warnings', function(assert) {
  this.set('warnings', Ember.A(['Insecure']));
  this.set('model', Ember.Object.create({ name: null }));
  this.render(hbs`
      {{bs-form/element property='name' elementId='child' hasValidator=true warnings=warnings model=model}}
  `);
  assert.notOk(
    this.$('.form-group').hasClass('has-warning'),
    'validation warnings aren\'t shown before user interaction'
  );
  Ember.run(() => {
    this.$('input').trigger('focusout');
  });
  assert.ok(
    this.$('.form-group').hasClass('has-warning'),
    'validation warnings are shown after user interaction when warnings are present'
  );
  assert.equal(this.$('.form-group .help-block').text().trim(), 'Insecure');
  Ember.run(() => {
    this.set('warnings', Ember.A());
  });
  assert.notOk(
    this.$('.form-group').hasClass('has-warning'),
    'form group isn\'t shown as having warnings if there are\'t any'
  );
});

test('events enabling validation rendering are configurable per `showValidationOn` (array)', function(assert) {
  this.set('errors', Ember.A(['Invalid']));
  this.set('model', Ember.Object.create({ name: null }));
  this.set('showValidationOn', ['change']);
  this.render(hbs`
      {{bs-form/element property='name' elementId='child' hasValidator=true errors=errors model=model showValidationOn=showValidationOn}}
  `);
  assert.notOk(
    this.$('.form-group').hasClass('has-error'),
    'validation warnings aren\'t shown before user interaction'
  );
  Ember.run(() => {
    this.$('input').trigger('focusout');
  });
  assert.notOk(
    this.$('.form-group').hasClass('has-error'),
    'events not present in `showValidationOn` are ignored'
  );
  Ember.run(() => {
    this.$('input').trigger('change');
  });
  assert.ok(
    this.$('.form-group').hasClass('has-error'),
    'events present in `showValidationOn` trigger validation'
  );
});

test('events enabling validation rendering are configurable per `showValidationOn` (string)', function(assert) {
  this.set('errors', Ember.A(['Invalid']));
  this.set('model', Ember.Object.create({ name: null }));
  this.render(hbs`
      {{bs-form/element property='name' elementId='child' hasValidator=true errors=errors model=model showValidationOn='change'}}
  `);
  assert.notOk(
    this.$('.form-group').hasClass('has-error'),
    'validation warnings aren\'t shown before user interaction'
  );
  Ember.run(() => {
    this.$('input').trigger('focusout');
  });
  assert.notOk(
    this.$('.form-group').hasClass('has-error'),
    'events not present in `showValidationOn` are ignored'
  );
  Ember.run(() => {
    this.$('input').trigger('change');
  });
  assert.ok(
    this.$('.form-group').hasClass('has-error'),
    'events present in `showValidationOn` trigger validation'
  );
});
