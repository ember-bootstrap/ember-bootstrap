import { attributeBindings, classNameBindings, layout as templateLayout, tagName } from '@ember-decorators/component';
import { gt } from '@ember/object/computed';
import Component from '@ember/component';
import { action, computed, set } from '@ember/object';
import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';
import { schedule } from '@ember/runloop';
import layout from 'ember-bootstrap/templates/components/bs-form';
import RSVP from 'rsvp';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

/**
  Render a form with the appropriate Bootstrap layout class (see `formLayout`).
  Allows setting a `model` that nested `Components.FormElement`s can access, and that can provide form validation (see below)

  You can use whatever markup you like within the form. The following shows Bootstrap 3 usage for the internal markup.

  ```handlebars
  <BsForm @onSubmit={{action "submit"}} as |form|>
    <form.group>
      <label class="control-label">First name</label>
      <input value={{this.firstname}} class="form-control" oninput={{action (mut this.firstname) value="target.value"}} type="text">
    </form.group>
  </BsForm>
  ```

  However to benefit from features such as automatic form markup, validations and validation markup, use `Components.FormElement`
  as nested components. See below for an example.

  ### Submitting the form

  When the form is submitted (e.g. by clicking a submit button), the event will be intercepted and the `onSubmit` action
  will be sent to the controller or parent component.
  In case the form supports validation (see "Form validation" below), the `onBefore` action is called (which allows you to
  do e.g. model data normalization), then the available validation rules are evaluated, and if those fail, the `onInvalid`
  action is sent instead of `onSubmit`.

  ### Use with Components.FormElement

  When using `Components.FormElement`s with their `property` set to property names of the form's validation enabled
  `model`, you gain some additional powerful features:
  * the appropriate Bootstrap markup for the given `formLayout` and the form element's `controlType` is automatically generated
  * markup for validation states and error messages is generated based on the model's validation (if available), when submitting the form
  with an invalid validation, or when focusing out of invalid inputs

  ```handlebars
  <BsForm @formLayout="horizontal" @model={{this}} @onSubmit={{action "submit"}} as |form|>
    <form.element @controlType="email" @label="Email" @placeholder="Email" @property="email" />
    <form.element @controlType="password" @label="Password" @placeholder="Password" @property="password" />
    <form.element @controlType="checkbox" @label="Remember me" @property="rememberMe" />
    <BsButton @defaultText="Submit" @type="primary" @buttonType="submit" />
  </BsForm>
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

  ### Submission state

  A `isSubmitting` property is yielded, which is `true` after submit has been triggered and before the Promise returned
  by `onSubmit` is fulfilled. It could be used to disable form's submit button and showing a loading spinner for example:

  ```hbs
  <BsForm @onSubmit={{action "save"}} as |form|>
    <BsButton @buttonType="submit" @disabled={{form.isSubmitting}}>
      Save
      {{#if form.isSubmitting}} {{fa-icon "spinner"}} {{/if}}
    </BsButton>
  </BsForm>
  ```

  Additionaly `isSubmitted` and `isRejected` properties are yielded. `isSubmitted` is `true` if last submission was successful.
  `isRejected` is `true` if last submission was rejected due to validation errors or by an action bound to `onSubmit` event, returning a rejected promise.
  Both are reset as soon as any value of a form element changes. It could be used for visual feedback about last submission:

  ```hbs
  <BsForm @onSubmit={{action 'save}} as |form|>
    <BsButton @buttonType="submit" @type={{if form.isRejected "danger" "primary"}}>
      Save
    </BsButton>
  </BsForm>
  ```

  @class Form
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@tagName('form')
@classNameBindings('layoutClass')
@attributeBindings('_novalidate:novalidate')
export default class Form extends Component {
  ariaRole = 'form';

  /**
   * Bootstrap form class name (computed)
   *
   * @property layoutClass
   * @type string
   * @readonly
   * @protected
   *
   */

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

  /**
   * Set the layout of the form to either "vertical", "horizontal" or "inline". See http://getbootstrap.com/css/#forms-inline and http://getbootstrap.com/css/#forms-horizontal
   *
   * @property formLayout
   * @type string
   * @public
   */
  @defaultValue
  formLayout = 'vertical';

  /**
   * Check if validating the model is supported. This needs to be implemented by another addon.
   *
   * @property hasValidator
   * @type boolean
   * @readonly
   * @protected
   */

  /**
   * The Bootstrap grid class for form labels. This is used by the `Components.FormElement` class as a default for the
   * whole form.
   *
   * @property horizontalLabelGridClass
   * @type string
   * @default 'col-md-4'
   * @public
   */
  @defaultValue
  horizontalLabelGridClass = 'col-md-4';

  /**
   * @property elementComponent
   * @type {String}
   * @private
   */
  @defaultValue
  elementComponent = 'bs-form/element';

  /**
   * @property groupComponent
   * @type {String}
   * @private
   */
  @defaultValue
  groupComponent = 'bs-form/group';

  /**
   * `isSubmitting` is `true` after `submit` event has been triggered and until Promise returned by `onSubmit` is
   * fulfilled. If `validate` returns a Promise that one is also taken into consideration.
   *
   * If multiple concurrent submit events are fired, it stays `true` until all submit events have been fulfilled.
   *
   * @property isSubmitting
   * @type {Boolean}
   * @readonly
   * @private
   */
  @gt('pendingSubmissions', 0)
  isSubmitting;

  /**
   * `isSubmitted` is `true` if last submission was successful.
   * A change to any form element resets it's value to `false`.
   *
   * If not using `Components.FormElement`, `resetSubmissionState` action must be triggered on each change to reset
   * form's submission state.
   *
   * @property isSubmitted
   * @type {Boolean}
   * @private
   */
  @defaultValue
  isSubmitted = false;

  /**
   * `isRejected` is `true` if last submission was rejected.
   * A submission is considered as rejected if form is invalid as well as if `onSubmit` rejects.
   * A change to any form element resets it's value to `false`.
   *
   * If not using `Components.FormElement`, `resetSubmissionState` action must be triggered on each change to reset
   * form's submission state.
   *
   * @property isRejected
   * @type {Boolean}
   * @private
   */
  @defaultValue
  isRejected = false;

  /**
   * Count of pending submissions.
   *
   * @property pendingSubmissions
   * @type {Integer}
   * @private
   */
  @defaultValue
  pendingSubmissions = 0;

  /**
   * If set to true pressing enter will submit the form, even if no submit button is present
   *
   * @property submitOnEnter
   * @type boolean
   * @default false
   * @public
   */
  @defaultValue
  submitOnEnter = false;

  /**
   * Controls if `onSubmit` action is fired concurrently. If `true` submitting form multiple
   * times will not trigger `onSubmit` action if a Promise returned by previous submission is
   * not settled yet.
   *
   * Droping a submission also prevents rerunning validation and `onBefore` hook.
   *
   * @property preventConcurrency
   * @type Boolean
   * @default true
   * @public
   */
  @defaultValue
  preventConcurrency = true;

  /**
   * If true, after successful validation and upon submitting the form, all current element validations will be hidden.
   * If the form remains visible, the user would have to focus out of elements of submit the form again for the
   * validations to show up again, as if a fresh new form component had been rendered.
   *
   * @property hideValidationsOnSubmit
   * @type {Boolean}
   * @default false
   * @public
   */
  @defaultValue
  hideValidationsOnSubmit = false;

  /**
   * If set to true novalidate attribute is present on form element
   * Will be true by default if validation support is enabled.
   *
   * @property novalidate
   * @type boolean
   * @default null
   * @public
   */
  @defaultValue
  novalidate = null;

  @computed('novalidate', 'hasValidator')
  get _novalidate() {
    return (this.get('hasValidator') && this.get('novalidate') !== false) || this.get('novalidate') === true
        ? ''
        : undefined;
  }

  /**
   * If set to true the `readonly` property of all yielded form elements will be set, making their form controls read-only.
   *
   * @property readonly
   * @type boolean
   * @default false
   * @public
   */
  @defaultValue
  readonly = false;

  /**
   * If set to true the `disabled` property of all yielded form elements will be set, making their form controls disabled.
   *
   * @property disabled
   * @type boolean
   * @default false
   * @public
   */
  @defaultValue
  disabled = false;

  /**
   * Validate hook which will return a promise that will either resolve if the model is valid
   * or reject if it's not. This should be overridden to add validation support.
   *
   * @method validate
   * @param {Object} model
   * @return {Promise}
   * @public
   */
  validate(model) {} // eslint-disable-line no-unused-vars

  /**
   * @property showAllValidations
   * @type boolean
   * @default undefined
   * @private
   */
  @defaultValue
  showAllValidations = undefined;

  /**
   * Action is called before the form is validated (if possible) and submitted.
   *
   * @event onBefore
   * @param { Object } model  The form's `model`
   * @public
   */
  onBefore(model) {} // eslint-disable-line no-unused-vars

  /**
   * Action is called when submit has been triggered and the model has passed all validations (if present).
   *
   * @event onSubmit
   * @param { Object } model  The form's `model`
   * @param { Object } result The returned result from the validate method, if validation is available
   * @public
   */
  onSubmit(model, result) {} // eslint-disable-line no-unused-vars

  /**
   * Action is called when validation of the model has failed.
   *
   * @event onInvalid
   * @param { Object } model  The form's `model`
   * @param { Object } error
   * @public
   */
  onInvalid(model, error) {} // eslint-disable-line no-unused-vars

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
  submitHandler(e, throwValidationErrors = true) {
    if (e) {
      e.preventDefault();
    }

    if (this.get('preventConcurrency') && this.get('isSubmitting')) {
      return RSVP.resolve();
    }

    let model = this.get('model');

    this.incrementProperty('pendingSubmissions');
    this.get('onBefore')(model);

    return RSVP.resolve()
      .then(() => {
        return this.get('hasValidator') ? this.validate(model) : null;
      })
      .then(
        (record) => {
          if (this.get('hideValidationsOnSubmit') === true) {
            this.set('showAllValidations', false);
          }

          return RSVP.resolve()
            .then(() => {
              return this.get('onSubmit')(model, record);
            })
            .then(() => {
              if (this.get('isDestroyed')) {
                return;
              }

              this.set('isSubmitted', true);
            })
            .catch((error) => {
              if (this.get('isDestroyed')) {
                return;
              }

              this.set('isRejected', true);

              throw error;
            })
            .finally(() => {
              if (this.get('isDestroyed')) {
                return;
              }

              this.decrementProperty('pendingSubmissions');

              // reset forced hiding of validations
              if (this.get('showAllValidations') === false) {
                schedule('afterRender', () => this.set('showAllValidations', undefined));
              }
            });
        },
        (error) => {
          return RSVP.resolve()
            .then(() => {
              return this.get('onInvalid')(model, error);
            })
            .finally(() => {
              if (this.get('isDestroyed')) {
                return;
              }

              this.setProperties({
                showAllValidations: true,
                isRejected: true,
                pendingSubmissions: this.get('pendingSubmissions') - 1
              });

              if (throwValidationErrors) {
                throw error;
              }
            });
        }
      )
  }

  submit(event) {
    this.submitHandler(event, false);
  }

  keyPress(e) {
    let code = e.keyCode || e.which;
    if (code === 13 && this.get('submitOnEnter')) {
      this.triggerSubmit();
    }
  }

  triggerSubmit() {
    let event = document.createEvent('Event');
    event.initEvent('submit', true, true);
    this.get('element').dispatchEvent(event);
  }

  init() {
    super.init(...arguments);

    let formLayout = this.get('formLayout');
    assert(`Invalid formLayout property given: ${formLayout}`, ['vertical', 'horizontal', 'inline'].indexOf(formLayout) >= 0);
  }

  @action
  elementChanged(value, model, property) {
    assert('You cannot use the form element\'s default onChange action for form elements if not using a model or setting the value directly on a form element. You must add your own onChange action to the form element in this case!',
      isPresent(model) && isPresent(property)
    );
    if (typeof model.set === 'function') {
      model.set(property, value);
    } else {
      set(model, property, value);
    }
  }

  @action
  resetSubmissionState() {
    this.set('isSubmitted', false);
    this.set('isRejected', false);
  }

  @action
  doSubmit() {
    return this.submitHandler();
  }
}
