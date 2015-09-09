import Ember from 'ember';
import FormGroup from 'ember-bootstrap/components/bs-form-group';
import Form from 'ember-bootstrap/components/bs-form';
import I18nSupport from 'ember-bootstrap/mixins/i18n-support';


var nonTextFieldControlTypes = Ember.A([
    'checkbox',
    'select',
    'select2',
    'textarea'
]);

/**
 Sub class of `Components.FormGroup` that adds automatic form layout markup and form validation features.

 ### Form layout

 The appropriate Bootstrap markup for the given `formLayout` and `controlType` is automatically generated to easily
 create forms without coding the default Bootstrap form markup by hand:

 ```hbs
 \{{#bs-form formLayout="horizontal" action="submit"}}
   \{{bs-form-element controlType="email" label="Email" placeholder="Email" value=email}}
   \{{bs-form-element controlType="password" label="Password" placeholder="Password" value=password}}
   \{{bs-form-element controlType="checkbox" label="Remember me" value=rememberMe}}
   \{{bs-button defaultText="Submit" type="primary" buttonType="submit"}}
 \{{/bs-form}}
 ```

 ### Form validation

 In the following example the control elements of the three form elements value will be bound to the properties
 (given by `property`) of the form's `model`, which in this case is its controller (see `model=this`):

 ```hbs
 \{{#bs-form formLayout="horizontal" model=this action="submit"}}
   \{{bs-form-element controlType="email" label="Email" placeholder="Email" property="email"}}
   \{{bs-form-element controlType="password" label="Password" placeholder="Password" property="password"}}
   \{{bs-form-element controlType="checkbox" label="Remember me" property="rememberMe"}}
   \{{bs-button defaultText="Submit" type="primary" buttonType="submit"}}
 \{{/bs-form}}
 ```

 By using this indirection in comparison to directly binding the `value` property, you get the benefit of automatic
 form validation, given that your `model` is implementing [ember-validations](https://github.com/dockyard/ember-validations).

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

 As soon as the validation is successful again...

 * `validation` is set to 'success', which will set the `has-success` CSS class
 * the `successIcon` feedback icon is displayed if `controlType` is a text field
 * the validation messages are removed

 ### I18n support

 Supports translateable properties if [ember-i18n](https://github.com/jamesarosen/ember-i18n) is present.
 See {{#crossLink "Mixins.I18nSupport"}}{{/crossLink}}


 @class FormElement
 @namespace Components
 @extends Components.FormGroup
 @uses Mixins.I18nSupport
 */
export default FormGroup.extend(I18nSupport, {
    /**
     * Text to display within a `<label>` tag.
     *
     * @property label
     * @type string
     * @public
     */
    label: null,

    /**
     * The type of the control widget.
     * Supported types:
     *
     * * 'text'
     * * 'checkbox'
     * * 'select'
     * * 'select2' (needs [ember-select-2](https://github.com/iStefo/ember-select-2))
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
     * @type integer
     * @default 5
     * @public
     */
    rows: 5,

    /**
     * Textarea's cols attribute (ignored for other `controlType`s)
     *
     * @property cols
     * @type integer
     * @public
     */
    cols: null,

    /**
     * The model used for validation. Defaults to the parent `Components.Form`'s `model`
     *
     * @property model
     * @public
     */
    model: Ember.computed.alias('form.model'),

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
    hasErrors: Ember.computed.gt('errors.length',0),

    /**
     * @property hasValidator
     * @type boolean
     * @readonly
     * @protected
     */
    hasValidator: Ember.computed.notEmpty('model.validate'),

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
     * @property showErrors
     * @type boolean
     * @readonly
     * @protected
     */
    showErrors: Ember.computed.and('showValidation','hasErrors'),

    /**
     * The validation ("error" or "success") or null if no validation is to be shown. Automatically computed from the
     * models validation state.
     *
     * @property validation
     * @readonly
     * @type string
     * @protected
     */
    validation: Ember.computed('hasErrors','hasValidator','showValidation',function(){
        if (!this.get('showValidation') || !this.get('hasValidator')) {
            return null;
        }
        return this.get('hasErrors') ? 'error' : 'success';
    }),

    /**
     * @property hasLabel
     * @type boolean
     * @readonly
     * @protected
     */
    hasLabel: Ember.computed.notEmpty('label'),

    /**
     * True for text field `controlType`s
     *
     * @property useIcons
     * @type boolean
     * @readonly
     * @public
     */
    useIcons: Ember.computed('controlType', function() {
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
    formLayout: Ember.computed.alias('form.formLayout'),

    /**
     * @property isVertical
     * @type boolean
     * @readonly
     * @protected
     */
    isVertical: Ember.computed.equal('formLayout','vertical'),

    /**
     * @property isHorizontal
     * @type boolean
     * @readonly
     * @protected
     */
    isHorizontal: Ember.computed.equal('formLayout','horizontal'),

    /**
     * @property isInline
     * @type boolean
     * @readonly
     * @protected
     */
    isInline: Ember.computed.equal('formLayout','inline'),

    /**
     * The Bootstrap grid class for form labels within a horizontal layout form. Defaults to the value of the same
     * property of the parent form. The corresponding grid class for form controls is automatically computed.
     *
     * @property horizontalLabelGridClass
     * @type string
     * @default 'col-md-4'
     * @public
     */
    horizontalLabelGridClass: Ember.computed.oneWay('form.horizontalLabelGridClass'),

    /**
     * Computed property that specifies the Bootstrap grid class for form controls within a horizontal layout form.
     *
     * @property horizontalInputGridClass
     * @type string
     * @readonly
     * @protected
     */
    horizontalInputGridClass: Ember.computed('horizontalLabelGridClass', function() {
        var parts = this.get('horizontalLabelGridClass').split('-');
        Ember.assert('horizontalInputGridClass must match format bootstrap grid column class', parts.length===3);
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
    horizontalInputOffsetGridClass: Ember.computed('horizontalLabelGridClass', function() {
        var parts = this.get('horizontalLabelGridClass').split('-');
        parts.splice(2,0,'offset');
        return parts.join('-');
    }),

    /**
     * Reference to the parent `Components.Form` class.
     *
     * @property form
     * @protected
     */
    form: Ember.computed(function(){
        return this.nearestOfType(Form);
    }),

    layoutName: Ember.computed('formLayout','controlType',function() {
        var formLayout = this.getWithDefault('formLayout','vertical'),
            inputLayout,
            controlType = this.get('controlType');

        switch (true) {
            case nonTextFieldControlTypes.contains(controlType):
                inputLayout = controlType;
                break;
            default:
                inputLayout = 'default';
        }

        return 'components/form-element/' + formLayout + '/' + inputLayout;
    }),

    _rerender: Ember.observer('layoutName', function() {
        this.rerender();
    }),

    /**
     * Listen for focusOut events from the control element to automatically set `showValidation` to true to enable
     * form validation markup rendering.
     *
     * @event focusOut
     */
    focusOut: function() {
        this.set('showValidation', true);
    },

    init: function() {
        this._super();
        if (!Ember.isBlank(this.get('property'))) {
            Ember.Binding.from("model." + this.get('property')).to('value').connect(this);
            Ember.Binding.from("model.errors." + this.get('property')).to('errors').connect(this);
        }
    }
});