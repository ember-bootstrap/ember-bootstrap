import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import EmberValidations from 'ember-validations';

moduleForComponent('bs-form-element', 'Integration | Component | bs-form-element', {
  integration: true
});

let formLayouts = ['vertical', 'horizontal', 'inline'];

test('component has form-group bootstrap class', function(assert) {
  this.render(hbs`{{bs-form-element}}`);
  assert.equal(this.$(':first-child').hasClass('form-group'), true, 'component has form-group class');
});

test('setting label property displays label tag', function(assert) {
  this.render(hbs`{{bs-form-element label="myLabel"}}`);

  assert.equal(this.$('label').length, 1, 'component has label tag');
  assert.equal(this.$('label').text().trim(), 'myLabel', 'label has text');
});

function controlTypeSupportTest(assert, controlType, selector, values, getValueFn, componentOptions) {
  componentOptions = componentOptions || {};

  if (!Ember.isArray(values)) {
    values = [values];
  }
  values = Ember.A(values);

  this.set('controlType', controlType);
  if (componentOptions.choices) {
    this.set('choices', componentOptions.choices);
  }
  if (componentOptions.choiceLabelProperty) {
    this.set('choiceLabelProperty', componentOptions.choiceLabelProperty);
  }
  if (componentOptions.choiceValueProperty) {
    this.set('choiceValueProperty', componentOptions.choiceValueProperty);
  }

  formLayouts.forEach((layout) => {
    this.set('formLayout', layout);
    this.render(hbs`{{#bs-form formLayout=formLayout}}{{bs-form-element controlType=controlType choices=choices choiceLabelProperty=choiceLabelProperty choiceValueProperty=choiceValueProperty value=value}}{{/bs-form}}`);

    assert.equal(this.$(selector).length, 1, `component has ${controlType} control for form layout ${layout}`);

    values.forEach((value) => {
      this.set('value', value);
      let hasValue = typeof getValueFn === 'function' ? getValueFn.call(this.$(selector)) : this.$(selector).val();
      assert.equal(hasValue, value, `{controlType} control has correct values for form layout ${layout}`);
    });
  });
}

function labeledControlTest(assert, controlType, selector) {
  this.set('controlType', controlType);

  formLayouts.forEach((layout) => {
    this.set('formLayout', layout);
    this.render(hbs`{{#bs-form formLayout=formLayout}}{{bs-form-element controlType=controlType label="myLabel"}}{{/bs-form}}`);
    assert.equal(this.$(selector).attr('id'), this.$('label').attr('for'), `component and label ids do match for form layout ${layout}`);
  });
}

test('controlType "text" is supported', function(assert) {
  controlTypeSupportTest.call(this, assert, 'text', 'input[type=text]', 'myValue');
  labeledControlTest.call(this, assert, 'text', 'input[type=text]');
});

test('controlType "checkbox" is supported', function(assert) {
  controlTypeSupportTest.call(this, assert, 'checkbox', 'input[type=checkbox]', [true, false], function() {
    return this.is(':checked');
  });
});

test('controlType "textarea" is supported', function(assert) {
  controlTypeSupportTest.call(this, assert, 'textarea', 'textarea', 'myValue');
  labeledControlTest.call(this, assert, 'textarea', 'textarea');
});

test('controlType "select" is supported', function(assert) {
  let options = {
    choices: Ember.A([
      {
        id: 'f',
        label: 'Female'
      },
      {
        id: 'm',
        label: 'Male'
      }
    ]),
    choiceLabelProperty: 'label',
    choiceValueProperty: 'id'
  };
  controlTypeSupportTest.call(this, assert, 'select', 'select', [options.choices[0], options.choices[1]], function() {
    return options.choices.findBy('id', this.val());
  }, options);
  labeledControlTest.call(this, assert, 'select', 'select');
});

test('Changing formLayout changes markup', function(assert) {
  this.set('formLayout', 'vertical');
  this.render(hbs`{{#bs-form horizontalLabelGridClass="col-sm-4" formLayout=formLayout}}{{bs-form-element controlType="text" label="myLabel"}}{{/bs-form}}`);
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
    Ember.Object.extend(EmberValidations, {
      gender: 'male',
      validations: {
        name: {
          presence: true
        }
      }
    }).create({
      container: this.get('container')
    })
  );
  this.render(hbs`
    {{#bs-form formLayout=formLayout model=model}}
      {{#bs-form-element label="Gender" property="gender" as |value id validation|}}
        <div id="value">{{value}}</div>
        <div id="id">{{id}}</div>
        <div id="validation">{{validation}}</div>
      {{/bs-form-element}}
    {{/bs-form}}
  `);

  assert.equal(this.$('#value').length, 1, 'block template is rendered');
  assert.equal(this.$('#value').text().trim(), 'male', 'value is yielded to block template');
  assert.equal(this.$('#id').text().trim(), `${$('.form-group').attr('id')}-field`, 'id is yielded to block template');
  assert.equal(this.$('#validation').text().trim(), '');

  this.$('form').submit();
  assert.ok(this.$('.form-group').hasClass('has-success'), 'assumption');
  assert.equal(this.$('#validation').text().trim(), 'success');
});

test('required property propagates', function(assert) {
  this.set('model', Ember.Object.create());

  this.render(hbs`{{bs-form-element label="myLabel" property="foo" required=true}}`);

  assert.ok(this.$('.form-group').hasClass('is-required'), 'component has is-required class');
  assert.equal(this.$('input').attr('required'), 'required', 'input html5 required is true');
});

test('required property propagates - select', function(assert) {
  this.set('model', Ember.Object.create());

  this.render(hbs`{{bs-form-element controlType="select" label="myLabel" property="foo" required=true}}`);

  assert.ok(this.$('.form-group').hasClass('is-required'), 'component has is-required class');
  assert.equal(this.$('select').attr('required'), 'required', 'input html5 required is true');
});

test('disabled property propagates', function(assert) {
  this.set('model', Ember.Object.create());

  this.render(hbs`{{bs-form-element label="myLabel" property="foo" disabled=true}}`);

  assert.ok(this.$('.form-group').hasClass('is-disabled'), 'component has is-disabled class');
  assert.equal(this.$('input').attr('disabled'), 'disabled', 'input html5 disabled is true');
});

test('disabled property propagates - select', function(assert) {
  this.set('model', Ember.Object.create());

  this.render(hbs`{{bs-form-element controlType="select" label="myLabel" property="foo" disabled=true}}`);

  assert.ok(this.$('.form-group').hasClass('is-disabled'), 'component has is-disabled class');
  assert.equal(this.$('select').attr('disabled'), 'disabled', 'input html5 disabled is true');
});

test('if invisibleLabel is true sr-only class is added to label', function(assert) {
  let formLayouts = [
    'vertical',
    'horizontal',
    'inline'
  ];
  this.render(hbs`{{bs-form-element label="myLabel"}}`);
  assert.notOk(this.$('label').hasClass('sr-only'), `sr-only class is not present as defaultText`);
  formLayouts.forEach((formLayout) => {
    this.render(hbs`{{#bs-form formLayout=formLayout }}{{bs-form-element label="myLabel" invisibleLabel=true}}{{/bs-form}}`);
    assert.ok(this.$('label').hasClass('sr-only'), `sr-only class is present for formLayout ${formLayout}`);
  });
});

test('adjusts validation icon position if there is an input group', function(assert) {
  assert.expect(6);
  this.set('validation', 'success');
  this.set('formLayout', 'vertical');
  this.render(hbs`
    {{#bs-form formLayout=formLayout}}
      {{#bs-form-element validation=validation label='ajusts validation icon position' classNames='addon'}}
        <div class="input-group">
          {{bs-input}}
          <div class="input-group-addon">
            @example.com
          </div>
        </div>
      {{/bs-form-element}}
      {{#bs-form-element validation=validation label='ajusts validation icon position' classNames='button'}}
        <div class="input-group">
          {{bs-input}}
          <div class="input-group-btn">
            <button class="btn btn-default" type="button">foo</button>
            <button class="btn btn-default" type="button">bar</button>
          </div>
        </div>
      {{/bs-form-element}}
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
  let gap = parseInt(this.$('.addon .form-control-feedback').css('right')) -
            this.$('.addon .input-group-addon').outerWidth() - 15;
  assert.ok(
    gap === 0 || gap === -1,
    'takes bootstrap default positioning into account'
  );
});
