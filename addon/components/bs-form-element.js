import Ember from 'ember';
import FormGroup from 'ember-bootstrap/components/bs-form-group';
import Form from 'ember-bootstrap/components/bs-form';


var nonTextFieldControlTypes = [
    'checkbox',
    'select',
    'select2',
    'textarea'
];

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
 form validation, given that your `model` is implementing [ember-validations](https://github.com/dockyard/ember-validations).

 In the example above the `model` was our controller itself, so the control elements were bound to the appropriate
 properties of our controller. A controller implementing validations on those properties could look like this:

 ```js
 import Ember from 'ember';
 import EmberValidations from 'ember-validations';

 export default Ember.Controller.extend(EmberValidations.Mixin,{
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

 @class FormElement
 @namespace Components
 @extends Components.FormGroup
 */
export default FormGroup.extend({
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

    placeholder: null,

    name: null,

    choices: [],
    choiceValueProperty: null,
    choiceLabelProperty: null,

    rows: 5,
    cols: null,

    selectValueProperty: Ember.computed('choiceValueProperty', function(){
        var valuePath = this.get('choiceValueProperty');
        if (Ember.isPresent(valuePath)) {
            return valuePath.match(/^content\..*/) ? valuePath : 'content.' + valuePath;
        }
    }),
    selectLabelProperty: Ember.computed('choiceLabelProperty', function(){
        var labelPath = this.get('choiceLabelProperty');
        if (Ember.isPresent(labelPath)) {
            return labelPath.match(/^content\..*/) ? labelPath : 'content.' + labelPath;
        }
    }),

    model: Ember.computed.alias('form.model'),

    errors: null,
    hasErrors: Ember.computed.gt('errors.length',0),
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
    showErrors: Ember.computed.and('showValidation','hasErrors'),
    validation: Ember.computed('hasErrors','hasValidator','showValidation',function(){
        if (!this.get('showValidation') || !this.get('hasValidator')) {
            return null;
        }
        return this.get('hasErrors') ? 'error' : 'success';
    }),

    hasLabel: Ember.computed.notEmpty('label'),
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
    isVertical: Ember.computed.equal('formLayout','vertical'),
    isHorizontal: Ember.computed.equal('formLayout','horizontal'),
    isInline: Ember.computed.equal('formLayout','inline'),

    horizontalLabelGridClass: 'col-sm-2',

    horizontalInputGridClass: Ember.computed('horizontalLabelGridClass', function() {
        var parts = this.get('horizontalLabelGridClass').split('-');
        Ember.assert('horizontalInputGridClass must match format bootstrap grid column class', parts.length===3);
        parts[2] = 12 - parts[2];
        return parts.join('-');
    }),

    horizontalInputOffsetGridClass: Ember.computed('horizontalLabelGridClass', function() {
        var parts = this.get('horizontalLabelGridClass').split('-');
        parts.splice(2,0,'offset');
        return parts.join('-');
    }),

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