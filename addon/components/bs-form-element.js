import Ember from 'ember';
import FormGroup from 'ember-bootstrap/components/bs-form-group';
import Form from 'ember-bootstrap/components/bs-form';
import ComponentChild from 'ember-bootstrap/mixins/component-child';

const { computed, defineProperty, observer, on, run } = Ember;

const nonTextFieldControlTypes = Ember.A([
  'checkbox',
  'select',
  'textarea'
]);

/**
 Sub class of `Components.FormGroup` that adds automatic form layout markup and form validation features.

 ### Form layout

 The appropriate Bootstrap markup for the given `formLayout` and `controlType` is automatically generated to easily
 create forms without coding the default Bootstrap form markup by hand:

 ```hbs
 {{#bs-form formLayout="horizontal" action="submit"}}
   {{bs-form-element controlType="email" label="Email" placeholder="Email" value=email}}
   {{bs-form-element controlType="password" label="Password" placeholder="Password" value=password}}
   {{bs-form-element controlType="checkbox" label="Remember me" value=rememberMe}}
   {{bs-button defaultText="Submit" type="primary" buttonType="submit"}}
 {{/bs-form}}
 ```

 ### Form validation

 In the following example the control elements of the three form elements value will be bound to the properties
 (given by `property`) of the form's `model`, which in this case is its controller (see `model=this`):

 ```hbs
 {{#bs-form formLayout="horizontal" model=this action="submit"}}
   {{bs-form-element controlType="email" label="Email" placeholder="Email" property="email"}}
   {{bs-form-element controlType="password" label="Password" placeholder="Password" property="password"}}
   {{bs-form-element controlType="checkbox" label="Remember me" property="rememberMe"}}
   {{bs-button defaultText="Submit" type="primary" buttonType="submit"}}
 {{/bs-form}}
 ```

 By using this indirection in comparison to directly binding the `value` property, you get the benefit of automatic
 form validation, given that your `model` has a supported means of validating itself.
 See [Components.Form](Components.Form.html) for details on how to enable form validation.

 In the example above the `model` was our controller itself, so the control elements were bound to the appropriate
 properties of our controller. A controller implementing validations on those properties could look like this:

 ```js
 import Ember from 'ember';
 import EmberValidations from 'ember-validations';

 export default Ember.Controller.extend(EmberValidations,{
   email: null,
   password: null,
   rememberMe: false,
   validations: {
     email: {
       presence: true,
       format: {
         with: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
       }
     },
     password: {
       presence: true,
       length: { minimum: 6, maximum: 10}
     },
     comments: {
       length: { minimum: 5, maximum: 20}
     }
   }
 });
 ```

 If the `showValidation` property is `true` (which is automatically the case if a `focusOut` event is captured from the
 control element or the containing `Components.Form` was submitted with its `model` failing validation) and there are
 validation errors for the `model`'s `property`, the appropriate Bootstrap validation markup (see
 http://getbootstrap.com/css/#forms-control-validation) is applied:

 * `validation` is set to 'error', which will set the `has-error` CSS class
 * the `errorIcon` feedback icon is displayed if `controlType` is a text field
 * the validation messages are displayed as Bootstrap `help-block`s

 The same applies for warning messages, if the used validation library supports this. (Currently only
 [ember-cp-validations](https://github.com/offirgolan/ember-cp-validations))

 As soon as the validation is successful again...

 * `validation` is set to 'success', which will set the `has-success` CSS class
 * the `successIcon` feedback icon is displayed if `controlType` is a text field
 * the validation messages are removed

 ### Custom controls

 Apart from the standard built-in browser controls (see the `controlType` property), you can use any custom control simply
 by invoking the component with a block template. Use whatever control you might want, for example a select-2 component
 (from the [ember-select-2 addon](https://istefo.github.io/ember-select-2)):

 ```hbs
 {{#bs-form formLayout="horizontal" model=this action="submit"}}
   {{#bs-form-element label="Select-2" property="gender" as |value id validationState|}}
     {{select-2 id=id content=genderChoices optionLabelPath="label" value=value searchEnabled=false}}
   {{/bs-form-element}}
 {{/bs-form}}
 ```

 @class FormElement
 @namespace Components
 @extends Components.FormGroup
 @public
 */
export default FormGroup.extend(ComponentChild, {
  classNameBindings: ['disabled:is-disabled', 'required:is-required', 'isValidating'],

  /**
   * Text to display within a `<label>` tag.
   *
   * You should include a label for every form input cause otherwise screen readers
   * will have trouble with your forms. Use `invisibleLabel` property if you want
   * to hide them.
   *
   * @property label
   * @type string
   * @public
   */
  label: null,

  /**
   * Controls label visibilty by adding 'sr-only' class.
   *
   * @property invisibleLabel
   * @type boolean
   * @public
   */
  invisibleLabel: false,

  /**
   * The type of the control widget.
   * Supported types:
   *
   * * 'text'
   * * 'checkbox'
   * * 'select' (deprecated)
   * * 'textarea'
   * * any other type will use an input tag with the `controlType` value as the type attribute (for e.g. HTML5 input
   * types like 'email'), and the same layout as the 'text' type
   *
   * @property controlType
   * @type string
   * @public
   */
  controlType: 'text',

  /**
   * The value of the control element is bound to this property. You can bind it to some controller property to
   * get/set the control element's value:
   *
   * ```hbs
   * {{bs-form-element controlType="email" label="Email" placeholder="Email" value=email}}
   * ```
   *
   * Note: you loose the ability to validate this form element by directly binding to its value. It is recommended
   * to use the `property` feature instead.
   *
   *
   * @property value
   * @public
   */
  value: null,

  /**
   The property name of the form element's `model` (by default the `model` of its parent `Components.Form`) that this
   form element should represent. The control element's value will automatically be bound to the model property's
   value.

   Using this property enables form validation on this element.

   @property property
   @type string
   @public
   */
  property: null,

  /**
   * Control element's HTML5 placeholder attribute
   *
   * @property placeholder
   * @type string
   * @public
   */
  placeholder: null,

  /**
   * Control element's HTML5 disabled attribute
   *
   * @property disabled
   * @type boolean
   * @public
   */
  disabled: false,

  /**
   * Control element's HTML5 required attribute
   *
   * @property required
   * @type boolean
   * @public
   */
  required: false,

  /**
   * Control element's HTML5 autofocus attribute
   *
   * @property autofocus
   * @type boolean
   * @public
   */
  autofocus: false,

  /**
   * Control element's name attribute
   *
   * @property name
   * @type string
   * @public
   */
  name: null,

  /**
   * An array of objects containing the selection of choices for multiple choice style form controls, e.g. select
   * boxes.
   *
   * ```hbs
   * {{bs-form-element controlType="select" choices=countries choiceLabelProperty="name" choiceValueProperty="id" label="Country" value=selectedCountry}}
   * ```
   *
   * Be sure to also set the `choiceValueProperty` and `choiceLabelProperty` properties.
   *
   * @property choices
   * @type array
   * @public
   */
  choices: Ember.A(),

  /**
   * The property of the `choices` array of objects, containing the value of the choice, e.g. the select box option.
   *
   * @property choiceValueProperty
   * @type string
   * @public
   */
  choiceValueProperty: null,

  /**
   * The property of the `choices` array of objects, containing the label of the choice, e.g. the select box option.
   *
   * @property choiceLabelProperty
   * @type string
   * @public
   */
  choiceLabelProperty: null,

  /**
   * Textarea's rows attribute (ignored for other `controlType`s)
   *
   * @property rows
   * @type number
   * @default 5
   * @public
   */
  rows: 5,

  /**
   * Textarea's cols attribute (ignored for other `controlType`s)
   *
   * @property cols
   * @type number
   * @public
   */
  cols: null,

  /**
   * The model used for validation. Defaults to the parent `Components.Form`'s `model`
   *
   * @property model
   * @public
   */
  model: computed.reads('form.model'),

  /**
   * The array of error messages from the `model`'s validation.
   *
   * @property errors
   * @type array
   * @protected
   */
  errors: null,

  /**
   * @property hasErrors
   * @type boolean
   * @readonly
   * @protected
   */
  hasErrors: computed.gt('errors.length', 0),

  /**
   * The array of warning messages from the `model`'s validation.
   *
   * @property errors
   * @type array
   * @protected
   */
  warnings: null,

  /**
   * @property hasWarnings
   * @type boolean
   * @readonly
   * @protected
   */
  hasWarnings: computed.gt('warnings.length', 0),

  /**
   * The array of validation messages (either errors or warnings) rom the `model`'s validation.
   *
   * @property validationMessages
   * @type array
   * @protected
   */
  validationMessages: computed('hasErrors', 'hasWarnings', 'errors.[]', 'warnings.[]', function() {
    if (this.get('hasErrors')) {
      return this.get('errors');
    }
    if (this.get('hasWarnings')) {
      return this.get('warnings');
    }
    return null;
  }),

  /**
   * @property hasValidationMessages
   * @type boolean
   * @readonly
   * @protected
   */
  hasValidationMessages: computed.gt('validationMessages.length', 0),

  /**
   * @property hasValidator
   * @type boolean
   * @readonly
   * @protected
   */
  hasValidator: computed.notEmpty('model.validate'),

  /**
   * Set a validating state for async validations
   *
   * @property isValidating
   * @type boolean
   * @default false
   * @public
   */
  isValidating: false,

  /**
   * If `true` form validation markup is rendered (requires a validatable `model`).
   *
   * @property showValidation
   * @type boolean
   * @default false
   * @public
   */
  showValidation: false,

  /**
   * @property showValidationMessages
   * @type boolean
   * @readonly
   * @protected
   */
  showValidationMessages: computed.and('showValidation', 'hasValidationMessages'),

  /**
   * @property showErrors
   * @type boolean
   * @readonly
   * @deprecated
   * @protected
   */
  showErrors: computed.deprecatingAlias('showValidationMessages'),

  /**
   * The validation ("error" or "success") or null if no validation is to be shown. Automatically computed from the
   * models validation state.
   *
   * @property validation
   * @readonly
   * @type string
   * @protected
   */
  validation: computed('hasErrors', 'hasWarnings', 'hasValidator', 'showValidation', 'isValidating', 'disabled', function() {
    if (!this.get('showValidation') || !this.get('hasValidator') || this.get('isValidating') || this.get('disabled')) {
      return null;
    }
    return this.get('hasErrors') ? 'error' : (this.get('hasWarnings') ? 'warning' : 'success');
  }),

  /**
   * @property hasLabel
   * @type boolean
   * @readonly
   * @protected
   */
  hasLabel: computed.notEmpty('label'),

  /**
   * True for text field `controlType`s
   *
   * @property useIcons
   * @type boolean
   * @readonly
   * @public
   */
  useIcons: computed('controlType', function() {
    return !nonTextFieldControlTypes.contains(this.get('controlType'));
  }),

  /**
   * The form layout used for the markup generation (see http://getbootstrap.com/css/#forms):
   *
   * * 'horizontal'
   * * 'vertical'
   * * 'inline'
   *
   * Defaults to the parent `form`'s `formLayout` property.
   *
   * @property formLayout
   * @type string
   * @public
   */
  formLayout: computed.alias('form.formLayout'),

  /**
   * @property isVertical
   * @type boolean
   * @readonly
   * @protected
   */
  isVertical: computed.equal('formLayout', 'vertical'),

  /**
   * @property isHorizontal
   * @type boolean
   * @readonly
   * @protected
   */
  isHorizontal: computed.equal('formLayout', 'horizontal'),

  /**
   * @property isInline
   * @type boolean
   * @readonly
   * @protected
   */
  isInline: computed.equal('formLayout', 'inline'),

  /**
   * The Bootstrap grid class for form labels within a horizontal layout form. Defaults to the value of the same
   * property of the parent form. The corresponding grid class for form controls is automatically computed.
   *
   * @property horizontalLabelGridClass
   * @type string
   * @default 'col-md-4'
   * @public
   */
  horizontalLabelGridClass: computed.oneWay('form.horizontalLabelGridClass'),

  /**
   * Computed property that specifies the Bootstrap grid class for form controls within a horizontal layout form.
   *
   * @property horizontalInputGridClass
   * @type string
   * @readonly
   * @protected
   */
  horizontalInputGridClass: computed('horizontalLabelGridClass', function() {
    let parts = this.get('horizontalLabelGridClass').split('-');
    Ember.assert('horizontalInputGridClass must match format bootstrap grid column class', parts.length === 3);
    parts[2] = 12 - parts[2];
    return parts.join('-');
  }),

  /**
   * Computed property that specifies the Bootstrap offset grid class for form controls within a horizontal layout
   * form, that have no label.
   *
   * @property horizontalInputOffsetGridClass
   * @type string
   * @readonly
   * @protected
   */
  horizontalInputOffsetGridClass: computed('horizontalLabelGridClass', function() {
    let parts = this.get('horizontalLabelGridClass').split('-');
    parts.splice(2, 0, 'offset');
    return parts.join('-');
  }),

  /**
   * ID for input field and the corresponding label's "for" attribute
   *
   * @property formElementId
   * @type string
   * @private
   */
  formElementId: computed('elementId', function() {
    let elementId = this.get('elementId');
    return `${elementId}-field`;
  }),

  /**
   * Reference to the parent `Components.Form` class.
   *
   * @property form
   * @protected
   */
  form: computed(function() {
    return this.nearestOfType(Form);
  }),

  formElementTemplate: computed('formLayout', 'controlType', function() {
    let formLayout = this.getWithDefault('formLayout', 'vertical');
    let inputLayout;
    let controlType = this.get('controlType');

    switch (true) {
      case nonTextFieldControlTypes.contains(controlType):
        inputLayout = controlType;
        break;
      default:
        inputLayout = 'default';
    }

    return `components/form-element/${formLayout}/${inputLayout}`;
  }),

  /**
   * Setup validation properties. This method acts as a hook for external validation
   * libraries to overwrite. In case of failed validations the `errors` property should contain an array of error messages.
   *
   * @method setupValidations
   * @protected
   */
  setupValidations: Ember.K,

  /**
   * Listen for focusOut events from the control element to automatically set `showValidation` to true to enable
   * form validation markup rendering.
   *
   * @event focusOut
   * @private
   */
  focusOut() {
    this.set('showValidation', true);
  },

  init() {
    this._super();
    if (!Ember.isBlank(this.get('property'))) {
      defineProperty(this, 'value', computed.alias(`model.${this.get('property')}`));
      this.setupValidations();
    }
  },

  /*
   * adjust feedback icon position
   *
   * Bootstrap documentation:
   *  Manual positioning of feedback icons is required for [...] input groups
   *  with an add-on on the right. [...] For input groups, adjust the right
   *  value to an appropriate pixel value depending on the width of your addon.
   */
  adjustFeedbackIcons: on('didInsertElement', observer('hasFeedback', 'formLayout', function() {
    run.scheduleOnce('afterRender', () => {
      // validation state icons are only shown if form element has feedback
      if (this.get('hasFeedback') && !this.get('isDestroying')) {
        // form group element has
        this.$()
          // an input-group
          .has('.input-group')
          // an addon or button on right side
          .has('.input-group input + .input-group-addon, .input-group input + .input-group-btn')
          // an icon showing validation state
          .has('.form-control-feedback')
          .each((i, formGroups) => {
            // clear existing adjustment
            this.$('.form-control-feedback').css('right', '');
            let feedbackIcon = this.$('.form-control-feedback', formGroups);
            let defaultPositionString = feedbackIcon.css('right');
            Ember.assert(
              defaultPositionString.substr(-2) === 'px',
              '.form-control-feedback css right units other than px are not supported'
            );
            let defaultPosition = parseInt(
              defaultPositionString.substr(0, defaultPositionString.length - 2)
            );
            // Bootstrap documentation:
            //  We do not support multiple add-ons (.input-group-addon or .input-group-btn) on a single side.
            // therefore we could rely on having only one input-group-addon or input-group-btn
            let inputGroupWidth = this.$('input + .input-group-addon, input + .input-group-btn', formGroups).outerWidth();
            let adjustedPosition = defaultPosition + inputGroupWidth;

            feedbackIcon.css('right', adjustedPosition);
          });
      }
    });
  }))
});
