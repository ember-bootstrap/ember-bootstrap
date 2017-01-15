import Ember from 'ember';
import layout from '../../templates/components/bs-form/element';
import FormGroup from './group';

const {
 computed,
 defineProperty,
 isArray,
 isBlank,
 observer,
 on,

 run: {
   scheduleOnce
 },

 assert,
 typeOf,
 A
} = Ember;

const nonTextFieldControlTypes = A([
  'checkbox',
  'textarea'
]);

/**
 Sub class of `Components.FormGroup` that adds automatic form layout markup and form validation features.

 ### Form layout

 The appropriate Bootstrap markup for the given `formLayout` and `controlType` is automatically generated to easily
 create forms without coding the default Bootstrap form markup by hand:

 ```hbs
 {{#bs-form formLayout="horizontal" action="submit" as |form|}}
   {{form.element controlType="email" label="Email" placeholder="Email" value=email}}
   {{form.element controlType="password" label="Password" placeholder="Password" value=password}}
   {{form.element controlType="checkbox" label="Remember me" value=rememberMe}}
   {{bs-button defaultText="Submit" type="primary" buttonType="submit"}}
 {{/bs-form}}
 ```

 ### Form validation

 In the following example the control elements of the three form elements value will be bound to the properties
 (given by `property`) of the form's `model`, which in this case is its controller (see `model=this`):

 ```hbs
 {{#bs-form formLayout="horizontal" model=this action="submit" as |form|}}
   {{form.element controlType="email" label="Email" placeholder="Email" property="email"}}
   {{form.element controlType="password" label="Password" placeholder="Password" property="password"}}
   {{form.element controlType="checkbox" label="Remember me" property="rememberMe"}}
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
 {{#bs-form formLayout="horizontal" model=this action="submit" as |form|}}
   {{#form.element label="Select-2" property="gender" useIcons=false as |el|}}
     {{select-2 id=el.id content=genderChoices optionLabelPath="label" value=el.value searchEnabled=false}}
   {{/form.element}}
 {{/bs-form}}
 ```

 The component yields a hash with the following properties:
 * `id`: id to be used for the form control, so it matches the labels `for` attribute
 * `value`: the value of the form element
 * `validation`: the validation state of the element, `null` if no validation is to be shown, otherwise 'success', 'error' or 'warning'

 If your custom control does not render an input element, you should set `useIcons` to `false` since bootstrap only supports
 feedback icons with textual `<input class="form-control">` elements.

 ### HTML attributes

 To set HTML attributes on the control element provided by this component, set them as properties of this component:

 ```hbs
 {{#bs-form formLayout="horizontal" model=this action="submit" as |form|}}
   {{form.element controlType="email" label="Email" property="email"
     placeholder="Email"
     required=true
     multiple=true
     tabIndex=5
   }}
    ...
 {{/bs-form}}
 ```

 The following attributes are supported depending on the `controlType`:

 <table class="table table-striped">
 <thead>
 <tr>
 <th></th>
 <th>textarea</th>
 <th>checkbox</th>
 <th>all others</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td>accept</td>
 <td></td>
 <td></td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>autocomplete</td>
 <td>✔︎</td>
 <td></td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>autofocus</td>
 <td>✔︎</td>
 <td>✔︎</td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>autosave</td>
 <td></td>
 <td></td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>cols</td>
 <td>✔︎</td>
 <td></td>
 <td></td>
 </tr>
 <tr>
 <td>disabled</td>
 <td></td>
 <td>✔︎</td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>form</td>
 <td>✔︎</td>
 <td>✔︎</td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>inputmode</td>
 <td></td>
 <td></td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>max</td>
 <td></td>
 <td></td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>maxlength</td>
 <td>✔︎</td>
 <td></td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>min</td>
 <td></td>
 <td></td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>minlength</td>
 <td>✔︎</td>
 <td></td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>multiple</td>
 <td></td>
 <td></td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>name</td>
 <td>✔︎</td>
 <td>✔︎</td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>pattern</td>
 <td></td>
 <td></td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>placeholder</td>
 <td>✔︎</td>
 <td></td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>readonly</td>
 <td>✔︎</td>
 <td>✔︎</td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>required</td>
 <td>✔︎</td>
 <td>✔︎</td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>rows</td>
 <td>✔︎</td>
 <td></td>
 <td></td>
 </tr>
 <tr>
 <td>size</td>
 <td></td>
 <td></td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>spellcheck</td>
 <td>✔︎</td>
 <td></td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>step</td>
 <td></td>
 <td></td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>tabindex</td>
 <td>✔︎</td>
 <td>✔︎</td>
 <td>✔︎</td>
 </tr>
 <tr>
 <td>wrap</td>
 <td>✔︎</td>
 <td></td>
 <td></td>
 </tr>
 </tbody>
 </table>

 @class FormElement
 @namespace Components
 @extends Components.FormGroup
 @public
 */
export default FormGroup.extend({
  layout,
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
   * Controls label visibility by adding 'sr-only' class.
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
   * {{form.element controlType="email" label="Email" placeholder="Email" value=email}}
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
   * The model used for validation. Defaults to the parent `Components.Form`'s `model`
   *
   * @property model
   * @public
   */
  model: null,

  /**
   * The array of error messages from the `model`'s validation.
   *
   * @property errors
   * @type array
   * @private
   */
  errors: null,

  /**
   * @property hasErrors
   * @type boolean
   * @readonly
   * @private
   */
  hasErrors: computed.gt('errors.length', 0),

  /**
   * The array of warning messages from the `model`'s validation.
   *
   * @property errors
   * @type array
   * @private
   */
  warnings: null,

  /**
   * @property hasWarnings
   * @type boolean
   * @readonly
   * @private
   */
  hasWarnings: computed.gt('warnings.length', 0),

  /**
   * The array of validation messages (either errors or warnings) from the `model`'s validation.
   *
   * @property validationMessages
   * @type array
   * @private
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
   * @private
   */
  hasValidationMessages: computed.gt('validationMessages.length', 0),

  /**
   * @property hasValidator
   * @type boolean
   * @readonly
   * @private
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
   * @private
   */
  showValidation: computed.or('showOwnValidation', 'showAllValidations'),

  /**
   * @property showOwnValidation
   * @type boolean
   * @default false
   * @private
   */
  showOwnValidation: false,

  /**
   * @property showAllValidations
   * @type boolean
   * @default false
   * @private
   */
  showAllValidations: false,

  /**
   * @property showValidationMessages
   * @type boolean
   * @readonly
   * @private
   */
  showValidationMessages: computed.and('showValidation', 'hasValidationMessages'),

  /**
   * Event or list of events which enable form validation markup rendering.
   * Supported events: ['focusOut', 'change']
   *
   * @property showValidationOn
   * @type string|array
   * @default ['focusOut']
   * @public
   */
  showValidationOn: ['focusOut'],

  /**
   * @property _showValidationOn
   * @type array
   * @readonly
   * @private
   */
  _showValidationOn: computed('showValidationOn', function() {
    let showValidationOn = this.get('showValidationOn');

    assert('showValidationOn must be a String or an Array', isArray(showValidationOn) || typeOf(showValidationOn) === 'string');
    if (isArray(showValidationOn)) {
      return showValidationOn;
    }

    if (typeof showValidationOn.toString === 'function') {
      return [showValidationOn];
    }
    return [];
  }),

  /**
   * @method showValidationOnHandler
   * @private
   */
  showValidationOnHandler(event) {
    if (this.get('_showValidationOn').indexOf(event) !== -1) {
      this.set('showOwnValidation', true);
    }
  },

  /**
   * The validation ("error" or "success") or null if no validation is to be shown. Automatically computed from the
   * models validation state.
   *
   * @property validation
   * @readonly
   * @type string
   * @private
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
   * @private
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
    return !nonTextFieldControlTypes.includes(this.get('controlType'));
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
   * @default 'vertical'
   * @public
   */
  formLayout: 'vertical',

  /**
   * @property isVertical
   * @type boolean
   * @readonly
   * @private
   */
  isVertical: computed.equal('formLayout', 'vertical').readOnly(),

  /**
   * @property isHorizontal
   * @type boolean
   * @readonly
   * @private
   */
  isHorizontal: computed.equal('formLayout', 'horizontal').readOnly(),

  /**
   * @property isInline
   * @type boolean
   * @readonly
   * @private
   */
  isInline: computed.equal('formLayout', 'inline').readOnly(),

  /**
   * The Bootstrap grid class for form labels within a horizontal layout form. Defaults to the value of the same
   * property of the parent form. The corresponding grid class for form controls is automatically computed.
   *
   * @property horizontalLabelGridClass
   * @type string
   * @public
   */
  horizontalLabelGridClass: null,

  /**
   * Computed property that specifies the Bootstrap grid class for form controls within a horizontal layout form.
   *
   * @property horizontalInputGridClass
   * @type string
   * @readonly
   * @private
   */
  horizontalInputGridClass: computed('horizontalLabelGridClass', function() {
    if (isBlank(this.get('horizontalLabelGridClass'))) {
      return;
    }
    let parts = this.get('horizontalLabelGridClass').split('-');
    assert('horizontalInputGridClass must match format bootstrap grid column class', parts.length === 3);
    parts[2] = 12 - parts[2];
    return parts.join('-');
  }).readOnly(),

  /**
   * Computed property that specifies the Bootstrap offset grid class for form controls within a horizontal layout
   * form, that have no label.
   *
   * @property horizontalInputOffsetGridClass
   * @type string
   * @readonly
   * @private
   */
  horizontalInputOffsetGridClass: computed('horizontalLabelGridClass', function() {
    if (isBlank(this.get('horizontalLabelGridClass'))) {
      return;
    }
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

  formElementTemplate: computed('formLayout', 'controlType', function() {
    let formLayout = this.getWithDefault('formLayout', 'vertical');
    let inputLayout;
    let controlType = this.get('controlType');

    switch (true) {
      case nonTextFieldControlTypes.includes(controlType):
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
   * @private
   */
  setupValidations() {},

  /**
   * Listen for focusOut events from the control element to automatically set `showOwnValidation` to true to enable
   * form validation markup rendering if `showValidationsOn` contains `focusOut`.
   *
   * @event focusOut
   * @private
   */
  focusOut() {
    this.showValidationOnHandler('focusOut');
  },

  /**
   * Listen for change events from the control element to automatically set `showOwnValidation` to true to enable
   * form validation markup rendering if `showValidationsOn` contains `change`.
   *
   * @event change
   * @private
   */
  change() {
    this.showValidationOnHandler('change');
  },

  /**
   * The action is called whenever the input value is changed, e.g. by typing text
   *
   * @event onChange
   * @param {String} value The new value of the form control
   * @param {Object} model The form element's model
   * @param {String} property The value of `property`
   * @public
   */
  onChange() {},

  init() {
    this._super(...arguments);
    if (!isBlank(this.get('property'))) {
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
    scheduleOnce('afterRender', () => {
      // validation state icons are only shown if form element has feedback
      if (this.get('hasFeedback') && !this.get('isDestroying')) {
        // form group element has
        this.$()
          // an input-group
          .has('.input-group')
          // an addon or button on right si de
          .has('.input-group input + .input-group-addon, .input-group input + .input-group-btn')
          // an icon showing validation state
          .has('.form-control-feedback')
          .each((i, formGroups) => {
            // clear existing adjustment
            this.$('.form-control-feedback').css('right', '');
            let feedbackIcon = this.$('.form-control-feedback', formGroups);
            let defaultPositionString = feedbackIcon.css('right');
            assert(
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
  })),

  actions: {
    change(value) {
      let { onChange, model, property } = this.getProperties('onChange', 'model', 'property');
      onChange(value, model, property);
    }
  }
});
