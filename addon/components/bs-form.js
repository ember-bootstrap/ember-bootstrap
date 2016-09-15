import Ember from 'ember';
import FormElement from 'ember-bootstrap/components/bs-form-element';
import ComponentParent from 'ember-bootstrap/mixins/component-parent';

const { computed } = Ember;

/**
  Render a form with the appropriate Bootstrap layout class (see `formLayout`).
  Allows setting a `model` that nested `Components.FormElement`s can access, and that can provide form validation (see below)

  You can use whatever markup you like within the form:

 ```handlebars
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
  In case the form supports validation (see "Form validation" below), the "before" action is called (which allows you to
  do e.g. model data normalization), then the available  validation rules are evaluated, and if those fail, the "invalid"
  action is sent instead of the default "action".

  ### Use with Components.FormElement

  When using `Components.FormElement`s with their `property` set to property names of the form's validation enabled
  `model`, you gain some additional powerful features:
  * the appropriate Bootstrap markup for the given `formLayout` and the form element's `controlType` is automatically generated
  * markup for validation states and error messages is generated based on the model's validation (if available), when submitting the form
  with an invalid validation, or when focusing out of invalid inputs

  ```handlebars
  {{#bs-form formLayout="horizontal" model=this action="submit"}}
    {{bs-form-element controlType="email" label="Email" placeholder="Email" property="email"}}
    {{bs-form-element controlType="password" label="Password" placeholder="Password" property="password"}}
    {{bs-form-element controlType="checkbox" label="Remember me" property="rememberMe"}}
    {{bs-button defaultText="Submit" type="primary" buttonType="submit"}}
  {{/bs-form}}
  ```

  See the [Components.FormElement](Components.FormElement.html) API docs for further information.

  ### Form validation

  All version of ember-bootstrap beginning from 0.7.0 do not come with built-in support for validation engines anymore.
  Instead support is added usually by additional Ember addons, for example:

  * [ember-bootstrap-validations](https://github.com/kaliber5/ember-bootstrap-validations): adds support for [ember-validations](https://github.com/DockYard/ember-validations)
  * [ember-bootstrap-cp-validations](https://github.com/offirgolan/ember-bootstrap-cp-validations): adds support for [ember-cp-validations](https://github.com/offirgolan/ember-cp-validations)
  * [ember-bootstrap-changeset-validations](https://github.com/kaliber5/ember-bootstrap-changeset-validations): adds support for [ember-changeset](https://github.com/poteto/ember-changeset)

  To add your own validation support, you have to:

  * extend this component, setting `hasValidator` to true if validations are available (by means of a computed property for example), and implementing the `validate` method
  * extend the [Components.FormElement](Components.FormElement.html) component and implement the `setupValidations` hook or simply override the `errors` property to add the validation error messages to be displayed

  When validation fails, the appropriate Bootstrap markup is added automatically, i.e. the error classes are applied and
  the validation messages are shown for each form element. In case the validation library supports it, also warning messages
  are shown. See the [Components.FormElement](Components.FormElement.html) documentation for further details.

  See the above mentioned addons for examples.


  @class Form
  @namespace Components
  @extends Ember.Component
  @public
 */
export default Ember.Component.extend(ComponentParent, {
  tagName: 'form',
  classNameBindings: ['layoutClass'],
  attributeBindings: ['_novalidate:novalidate'],
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
  layoutClass: computed('formLayout', function() {
    let layout = this.get('formLayout');
    return layout === 'vertical' ? 'form' : `form-${layout}`;
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
   * Check if validating the model is supported. This needs to be implemented by another addon.
   *
   * @property hasValidator
   * @type boolean
   * @readonly
   * @protected
   */
  hasValidator: false,

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
   * If set to true novalidate attribute is present on form element
   *
   * @property novalidate
   * @type boolean
   * @default null
   * @public
   */
  novalidate: false,

  _novalidate: computed('novalidate', function() {
    return this.get('novalidate') === true ? '' : undefined;
  }),

  /**
   * An array of `Components.FormElement`s that are children of this form.
   *
   * @property childFormElements
   * @type Array
   * @readonly
   * @protected
   */
  childFormElements: computed.filter('children', function(view) {
    return view instanceof FormElement;
  }),

  /**
   * Validate hook which will return a promise that will either resolve if the model is valid
   * or reject if it's not. This should be overridden to add validation support.
   *
   * @param Object model
   * @return {Promise}
   * @public
   */
  validate(/* model */) {
    Ember.deprecate('[ember-bootstrap] Validation support has been moved to 3rd party addons.\n' +
                    'ember-validations: https://github.com/kaliber5/ember-bootstrap-validations\n' +
                    'ember-cp-validations: https://github.com/offirgolan/ember-bootstrap-cp-validations\n',
      false,
      {
        id: 'ember-bootstrap.form.validate',
        url: 'http://kaliber5.github.io/ember-bootstrap/api/classes/Components.Form.html'
      }
    );
  },

  /**
   * A handler called before the form is validated (if possible) and submitted.
   *
   * @event before
   * @param Object model  The form's `model`
   * @public
   */

  /**
   * A handler called when submit has been triggered and the model has passed all validations (if present).
   *
   * @event action
   * @param Object model  The form's `model`
   * @param Object result The returned result from the validate method, if validation is available
   * @public
   */

  /**
   * A handler called when validation of the model has failed.
   *
   * @event invalid
   * @param Object error
   * @public
   */

  /**
   * Submit handler that will send the default action ("action") to the controller when submitting the form.
   *
   * If there is a supplied `model` that supports validation (`hasValidator`) the model will be validated before, and
   * only if validation is successful the default action will be sent. Otherwise an "invalid" action will be sent, and
   * all the `showValidation` property of all child `Components.FormElement`s will be set to true, so error state and
   * messages will be shown automatically.
   *
   * @method submit
   * @private
   */
  submit(e) {
    if (e) {
      e.preventDefault();
    }
    let model = this.get('model');

    this.sendAction('before', model);

    if (!this.get('hasValidator')) {
      return this.sendAction('action', model);
    } else {
      let validationPromise = this.validate(this.get('model'));
      if (validationPromise && validationPromise instanceof Ember.RSVP.Promise) {
        validationPromise.then((r) => this.sendAction('action', model, r), (err) => {
          this.get('childFormElements').setEach('showValidation', true);
          return this.sendAction('invalid', err);
        });
      }
    }
  },

  keyPress(e) {
    let code = e.keyCode || e.which;
    if (code === 13 && this.get('submitOnEnter')) {
      this.$().submit();
    }
  }
});
