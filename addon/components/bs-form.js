import Ember from 'ember';
import FormElement from 'ember-bootstrap/components/bs-form-element';

/**
 Render a form with the appropriate Bootstrap layout class (see `formLayout`).
 Allows setting a `model` that nested `Components.FormElement`s can access, and that can provide form validation through
 [ember-validations](https://github.com/dockyard/ember-validations)

 You can use whatever markup you like within the form:

 ```hbs
 {{#bs-form action="submit"}}
   {{#bs-form-group validation=firstNameValidation}}
     <label class="control-label">First name</label>
     {{bs-input type="text" value=firstname}}
   {{/bs-form-group}}
 {{/bs-form}}
 ```

 However to benefit from features such as automatic form markup, validations and validation markup, use `Components.FormElement`
 as nested components. See below for an example.

 ### Submitting the form

 When the form is submitted (e.g. by clicking a submit button), the event will be intercepted and the default action
 will be sent to the controller.
 When an [ember-validations](https://github.com/dockyard/ember-validations) validated model is supplied, validations
 rules are evaluated before, and if those fail, the "invalid" action is sent instead of the default "action".

 ### Use with Components.FormElement

 When using `Components.FormElement`s with their `property` set to property names of the form's validation enabled
 `model`, you gain some additional powerful features:
 * the appropriate Bootstrap markup for the given `formLayout` and the form element's `controlType` is automatically generated
 * markup for validation states and error messages is generated based on the model's validation, when submitting the form
 with an invalid validation, or when focusing out of invalid inputs

 ```hbs
 {{#bs-form formLayout="horizontal" model=this action="submit"}}
   {{bs-form-element controlType="email" label="Email" placeholder="Email" property="email"}}
   {{bs-form-element controlType="password" label="Password" placeholder="Password" property="password"}}
   {{bs-form-element controlType="checkbox" label="Remember me" property="rememberMe"}}
   {{bs-button defaultText="Submit" type="primary" buttonType="submit"}}
 {{/bs-form}}
 ```

 See the `Components.FormElement` API docs for further information.

 @class Form
 @namespace Components
 @extends Ember.Component
*/
export default Ember.Component.extend({
    tagName: 'form',
    classNameBindings: ['layoutClass'],
    ariaRole: 'form',

    /**
     * Bootstrap form class name (computed)
     *
     * @property layoutClass
     * @type string
     * @readonly
     * @protected
     *
     */
    layoutClass: Ember.computed('formLayout', function() {
        var layout = this.get('formLayout');
        return layout === 'vertical' ? 'form' : 'form-' + layout;
    }),

    /**
     * Set a model that this form should represent. This serves several purposes:
     *
     * * child `Components.FormElement`s can access and bind to this model by their `property`
     * * when the model supports validation by using the [ember-validations](https://github.com/dockyard/ember-validations) mixin,
     * child `Components.FormElement`s will look at the validation information of their `property` and render their form group accordingly.
     * Moreover the form's `submit` event handler will validate the model and deny submitting if the model is not validated successfully.
     *
     * @property model
     * @type Ember.Object
     * @public
     */
    model: null,

    /**
     * Set the layout of the form to either "vertical", "horizontal" or "inline". See http://getbootstrap.com/css/#forms-inline and http://getbootstrap.com/css/#forms-horizontal
     *
     * @property formLayout
     * @type string
     * @public
     */
    formLayout: 'vertical',

    /**
     * Check if the `model` has a validate method, i.e. supports validation by using [ember-validations](https://github.com/dockyard/ember-validations)
     *
     * @property hasValidator
     * @type boolean
     * @readonly
     * @protected
     */
    hasValidator: Ember.computed.notEmpty('model.validate'),

    /**
     * The Bootstrap grid class for form labels. This is used by the `Components.FormElement` class as a default for the
     * whole form.
     *
     * @property horizontalLabelGridClass
     * @type string
     * @default 'col-md-4'
     * @public
     */
    horizontalLabelGridClass: 'col-md-4',


    /**
     * If set to true pressing enter will submit the form, even if no submit button is present
     *
     * @property submitOnEnter
     * @type boolean
     * @default false
     * @public
     */
    submitOnEnter: false,

    /**
     * An array of `Components.FormElement`s that are children of this form.
     *
     * @property childFormElements
     * @type Array
     * @readonly
     * @protected
     */
    childFormElements: Ember.computed.filter('childViews', function(view) {
        return view instanceof FormElement;
    }),

    /**
     * Submit handler that will send the default action ("action") to the controller when submitting the form.
     *
     * If there is a supplied `model` that supports validation (`hasValidator`) the model will be validated before, and
     * only if validation is successful the default action will be sent. Otherwise an "invalid" action will be sent, and
     * all the `showValidation` property of all child `Components.FormElement`s will be set to true, so error state and
     * messages will be shown automatically.
     *
     * @event submit
     */
    submit: function(e) {
        var that = this;
        if (e) {
            e.preventDefault();
        }
        if (!this.get('hasValidator')) {
            return this.sendAction();
        } else {
            return this
                .get('model')
                .validate()
                .then(function() {
                    if (that.get('model.isValid')) {
                        return that.sendAction();
                    }
                })
                .catch(function(){
                    that.get('childFormElements').setEach('showValidation', true);
                    return that.sendAction('invalid');
                });
        }
    },

    keyPress: function(e) {
        var code = e.keyCode || e.which;
        if(code === 13 && this.get('submitOnEnter')) {
            this.$().submit();
        }
    }
});