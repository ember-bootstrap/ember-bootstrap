import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, get } from '@ember/object';
import { assert } from '@ember/debug';
import { isBlank, isPresent, typeOf } from '@ember/utils';
import { A, isArray } from '@ember/array';
import { getOwner } from '@ember/application';
import { guidFor } from '@ember/object/internals';
import { ref } from 'ember-ref-bucket';
import ControlInput from './element/control/input';
import ControlCheckbox from './element/control/checkbox';
import ControlTextarea from './element/control/textarea';
import ControlRadio from './element/control/radio';
import ControlSwitch from './element/control/switch';
import arg from 'ember-bootstrap/utils/decorators/arg';
import { dedupeTracked } from 'tracked-toolbox';

/**
  Subclass of `Components.FormGroup` that adds automatic form layout markup and form validation features.

  ### Form layout

  The appropriate Bootstrap markup for the given `formLayout` and `controlType` is automatically generated to easily
  create forms without coding the default Bootstrap form markup by hand:

  ```handlebars
  <BsForm @formLayout="horizontal" @model={{this}} @onSubmit={{action "submit"}} as |form|>
    <form.element @controlType="email" @label="Email" @value={{this.email}}" />
    <form.element @controlType="password" @label="Password" @value={{this.password}} />
    <form.element @controlType="checkbox" @label="Remember me" @value={{this.rememberMe}} />
    <BsButton @defaultText="Submit" @type="primary" type="submit" />
  </BsForm>
  ```

  ### Control types

  The following control types are supported out of the box:

  * Inputs (simple `text`, or any other HTML5 supported input types like `password`, `email` etc.)
  * Checkbox (single)
  * Radio Button (group)
  * Textarea
  * Switch (BS4 Only)

  #### Radio Buttons

  For a group of mutually exclusive radio buttons to work, you must supply the `options` property with an array of
  options, each of which will be rendered with an appropriate radio button and its label. It can be either a simple array
  of strings or objects. In the latter case, you would have to set `optionLabelPath` to the property, that contains the
  label on these objects.

  ```hbs
  <BsForm @model={{this}} @onSubmit={{action "submit"}} as |form|>
    <form.element @controlType="radio" @label="Gender" @options={{this.genderOptions}} @optionLabelPath="title" @property="gender" />
  </BsForm>
  ```

  The default layout for radios is stacked, but Bootstrap's inline layout is also supported using the `inline` property
  of the yielded control component:

  ```hbs
  <BsForm @model={{this}} @onSubmit={{action "submit"}} as |form|>
    <form.element @controlType="radio" @label="Gender" @options={{this.genderOptions}} @property="gender" as |el|>
      <el.control @inline={{true}} />
    </form.element>
  </BsForm>
  ```

  #### Custom controls

  Apart from the standard built-in browser controls (see the `controlType` property), you can use any custom control simply
  by invoking the component with a block template. Use whatever control you might want, for example a `<PikadayInput>`
  component (from the [ember-pikaday addon](https://github.com/adopted-ember-addons/ember-pikaday)):

  ```hbs
  <BsForm @model={{this}} @onSubmit={{action "submit"}} as |form|>
    <form.element @label="Select-2" @property="gender" as |el|>
      <PikadayInput @value={{el.value}} @onSelection={{action el.setValue}} id={{el.id}} />
    </form.element>
  </BsForm>
  ```

  The component yields a hash with the following properties:
  * `control`: the component that would be used for rendering the form control based on the given `controlType`
  * `id`: id to be used for the form control, so it matches the labels `for` attribute
  * `value`: the value of the form element
  * `setValue`: function to change the value of the form element
  * `validation`: the validation state of the element, `null` if no validation is to be shown, otherwise 'success', 'error' or 'warning'

  If you just want to customize the existing control component, you can use the aforementioned yielded `control` component
  to customize that existing component:

  ```hbs
  <BsForm @model={{this}} @onSubmit={{action "submit"}} as |form|>
    <form.element @label="Email" @property="email" as |el|>
      <el.control class="input-lg" placeholder="Email" />
    </form.element>
  </BsForm>
  ```

  If you are using the custom control quite often, you should consider writing an integration plugin like
  [`ember-bootstrap-power-select`](https://github.com/kaliber5/ember-bootstrap-power-select).
  To do so, you need to provide a component `{{bs-form/element/control/my-custom-control}}` which extends
  [`Components.FormElementControl`](Components.FormElementControl.html).

  ### Form validation

  In the following example the control elements of the three form elements value will be bound to the properties
  (given by `property`) of the form's `model`, which in this case is its controller (see `model=this`):

  ```handlebars
  <BsForm @formLayout="horizontal" @model={{this}} @onSubmit={{action "submit"}} as |form|>
    <form.element @controlType="email" @label="Email" @property="email" />
    <form.element @controlType="password" @label="Password" @property="password" />
    <form.element @controlType="checkbox" @label="Remember me" @property="rememberMe" />
    <form.submitButton>Submit</form.submitButton>
  </BsForm>
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
  * the validation messages are displayed as Bootstrap `help-block`s in BS3 and `form-control-feedback` in BS4

  The same applies for warning messages, if the used validation library supports this. (Currently only
  [ember-cp-validations](https://github.com/offirgolan/ember-cp-validations))

  As soon as the validation is successful again...

  * `validation` is set to 'success', which will set the `has-success` CSS class
  * the `successIcon` feedback icon is displayed if `controlType` is a text field
  * the validation messages are removed

  In case you want to display some error or warning message that is independent of the model's validation, for
  example to display a failure message on a login form after a failed authentication attempt (so not coming from
  the validation library), you can use the `customError` or `customWarning` properties to do so.

  ### HTML attributes

  To set HTML attributes on the control element provided by this component when using the modern angle bracket invocation,
  you can pass them to the yielded `control` component:

  ```hbs
  <BsForm @formLayout="horizontal" @model={{this}} @onSubmit={{action "submit"}} as |form|>
  <form.element @controlType="email" @label="Email" @property="email" as |el|>
    <el.control
      placeholder="Email"
      tabindex={{5}}
      multiple
      required
    />
  </form.element>
  ...
  </BsForm>
  ```

  @class FormElement
  @namespace Components
  @extends Components.FormGroup
  @public
*/
export default class FormElement extends Component {
  /**
   * @property _element
   * @type null | HTMLElement
   * @private
   */
  @ref('mainNode') _element = null;

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

  /**
   * Controls label visibility by adding 'sr-only' class.
   *
   * @property invisibleLabel
   * @type boolean
   * @default false
   * @public
   */

  /**
   * The type of the control widget.
   * Supported types:
   *
   * * 'text'
   * * 'checkbox'
   * * 'radio'
   * * 'switch'
   * * 'textarea'
   * * any other type will use an input tag with the `controlType` value as the type attribute (for e.g. HTML5 input
   * types like 'email'), and the same layout as the 'text' type
   *
   * @property controlType
   * @type string
   * @default 'text'
   * @public
   */
  @arg
  controlType = 'text';

  /**
   * The value of the control element is bound to this property:
   *
   * ```hbs
   * <form.element @controlType="email" @label="Email" @value={{this.email}} />
   * ```
   *
   * Note two things:
   * * the binding is uni-directional (DDAU), so you would have to use the `onChange` action to subscribe to changes.
   * * you lose the ability to validate this form element by directly binding to its value. It is recommended
   * to use the `property` feature instead.
   *
   * @property value
   * @public
   */
  get value() {
    assert(
      'You can not set both property and value on a form element',
      isBlank(this.args.property) || isBlank(this.args.value),
    );

    if (this.args.property && this.args.model) {
      return get(this.args.model, this.args.property);
    }

    return this.args.value;
  }

  /**
   The property name of the form element's `model` (by default the `model` of its parent `Components.Form`) that this
   form element should represent. The control element's value will automatically be bound to the model property's
   value.

   Using this property enables form validation on this element.

   @property property
   @type string
   @public
   */

  /**
   * The model used for validation. Defaults to the parent `Components.Form`'s `model`
   *
   * @property model
   * @public
   */

  /**
   * Show a help text next to the control
   *
   * @property helpText
   * @type {string}
   * @public
   */

  /**
   * Only if there is a validator, this property makes all errors to be displayed at once
   * inside a scrollable container.
   *
   * @default false
   * @property showMultipleErrors
   * @public
   * @type {Boolean}
   */
  @arg
  showMultipleErrors = false;

  /**
   * Array of options for control types that show a selection (e.g. radio button groups)
   * Can be an array of simple strings or objects. For objects use `optionLabelPath` to specify the path containing the
   * label.
   *
   * @property options
   * @type {Array}
   * @public
   */

  /**
   * Property path (e.g. 'title' or 'related.name') to render the label of a selection option. See `options`.
   *
   * @property optionLabelPath
   * @type {String}
   * @public
   */

  /**
   * The array of error messages from the `model`'s validation.
   *
   * @property errors
   * @type array
   * @protected
   */
  // This shouldn't be an argument. It's only an argument because tests rely on
  // setting it as an argument. See https://github.com/kaliber5/ember-bootstrap/issues/1338
  // for details.
  @arg errors;

  /**
   * @property hasErrors
   * @type boolean
   * @readonly
   * @private
   */
  get hasErrors() {
    return Array.isArray(this.errors) && this.errors.length > 0;
  }

  /**
   * The array of warning messages from the `model`'s validation.
   *
   * @property warnings
   * @type array
   * @protected
   */
  // This shouldn't be an argument. It's only an argument because tests rely on
  // setting it as an argument. See https://github.com/kaliber5/ember-bootstrap/issues/1338
  // for details.
  @arg warnings;

  /**
   * @property hasWarnings
   * @type boolean
   * @readonly
   * @private
   */
  get hasWarnings() {
    return Array.isArray(this.warnings) && this.warnings.length > 0;
  }

  /**
   * Show a custom error message that does not come from the model's validation. Will be immediately shown, regardless
   * of any user interaction (i.e. no `focusOut` event required)
   *
   * @property customError
   * @type string
   * @public
   */

  /**
   * @property hasCustomError
   * @type boolean
   * @readonly
   * @private
   */
  get hasCustomError() {
    return isPresent(this.args.customError);
  }

  /**
   * Show a custom warning message that does not come from the model's validation. Will be immediately shown, regardless
   * of any user interaction (i.e. no `focusOut` event required). If the model's validation has an error then the error
   * will be shown in place of this warning.
   *
   * @property customWarning
   * @type string
   * @public
   */

  /**
   * @property hasCustomWarning
   * @type boolean
   * @readonly
   * @private
   */
  get hasCustomWarning() {
    return isPresent(this.args.customWarning);
  }

  /**
   * Property for size styling, set to 'lg', 'sm' or 'xs' (the latter only for BS3)
   *
   * @property size
   * @type String
   * @public
   */

  /**
   * The array of validation messages (either errors or warnings) from either custom error/warnings or , if we are showing model validation messages, the model's validation
   *
   * @property validationMessages
   * @type array
   * @private
   */
  get validationMessages() {
    if (this.hasCustomError) {
      return A([this.args.customError]);
    }
    if (this.hasErrors && this.showModelValidation) {
      return A(this.errors);
    }
    if (this.hasCustomWarning) {
      return A([this.args.customWarning]);
    }
    if (this.hasWarnings && this.showModelValidation) {
      return A(this.warnings);
    }
    return null;
  }

  /**
   * @property hasValidationMessages
   * @type boolean
   * @readonly
   * @private
   */
  get hasValidationMessages() {
    return (
      Array.isArray(this.validationMessages) &&
      this.validationMessages.length > 0
    );
  }

  /**
   * Set a validating state for async validations
   *
   * @property isValidating
   * @type boolean
   * @default false
   * @protected
   */
  @tracked isValidating = false;

  /**
   * If `true` form validation markup is rendered (requires a validatable `model`).
   *
   * @property showValidation
   * @type boolean
   * @default false
   * @private
   */
  get showValidation() {
    return (
      this.showOwnValidation ||
      this.showAllValidations ||
      this.hasCustomError ||
      this.hasCustomWarning
    );
  }

  /**
   * @property showOwnValidation
   * @type boolean
   * @default false
   * @private
   */
  @dedupeTracked showOwnValidation = false;

  /**
   * @property showAllValidations
   * @type boolean
   * @default false
   * @private
   */
  @arg
  showAllValidations = false;

  /*
   * Resets `showOwnValidation` if `@showAllValidations` argument is changed to `false`.
   * Must be called whenever `@showAllValidations` argument changes.
   */
  @action
  handleShowAllValidationsChange() {
    if (this.args.showAllValidations === false) {
      this.showOwnValidation = false;
    }
  }

  /**
   * @property showModelValidations
   * @type boolean
   * @readonly
   * @private
   */
  get showModelValidation() {
    return this.showOwnValidation || this.showAllValidations;
  }

  /**
   * @property showValidationMessages
   * @type boolean
   * @readonly
   * @private
   */
  get showValidationMessages() {
    return this.showValidation && this.hasValidationMessages;
  }

  /**
   * Event or list of events which enable form validation markup rendering.
   * Supported events: ['focusout', 'change', 'input']
   *
   * @property showValidationOn
   * @type string|array
   * @default ['focusout']
   * @public
   */
  @arg
  showValidationOn = ['focusOut'];

  /**
   * @property _showValidationOn
   * @type array
   * @readonly
   * @private
   */
  get _showValidationOn() {
    let showValidationOn = this.showValidationOn;

    assert(
      'showValidationOn must be a String or an Array',
      isArray(showValidationOn) || typeOf(showValidationOn) === 'string',
    );
    if (isArray(showValidationOn)) {
      return showValidationOn.map((type) => {
        return type.toLowerCase();
      });
    }

    if (typeof showValidationOn.toString === 'function') {
      return [showValidationOn.toLowerCase()];
    }
    return [];
  }

  /**
   * @method showValidationOnHandler
   * @param {Event} event
   * @private
   */
  @action
  showValidationOnHandler({ target, type }) {
    // Should not do anything if
    if (
      // validations should not be shown for this event type or
      this._showValidationOn.indexOf(type) === -1 ||
      // validation should not be shown for this event target
      (isArray(this.doNotShowValidationForEventTargets) &&
        this.doNotShowValidationForEventTargets.length > 0 &&
        this._element &&
        [
          ...this._element.querySelectorAll(
            this.doNotShowValidationForEventTargets.join(','),
          ),
        ].some((el) => el.contains(target)))
    ) {
      return;
    }

    this.showOwnValidation = true;
  }

  /**
   * Controls if validation should be shown for specified event targets.
   *
   * It expects an array of query selectors. If event target is a children of an event that matches
   * these selectors, an event triggered for it will not trigger validation errors to be shown.
   *
   * By default, events fired on elements inside an input group are skipped.
   *
   * If `null` or an empty array is passed validation errors are shown for all events regardless
   * of event target.
   *
   * @property doNotShowValidationForEventTargets
   * @type ?array
   * @public
   */
  @arg
  doNotShowValidationForEventTargets = [
    '.input-group-append',
    '.input-group-prepend',
  ];

  /**
   * The validation ("error" (BS3)/"danger" (BS4), "warning", or "success") or null if no validation is to be shown. Automatically computed from the
   * model's validation state.
   *
   * @property validation
   * @readonly
   * @type string
   * @private
   */
  get validation() {
    const shouldShowValidationState =
      this.showModelValidation &&
      this.hasValidator &&
      !this.isValidating &&
      !this.args._disabled;

    if (
      /* custom errors should be always shown */
      this.hasCustomError ||
      /* validation error should be shown in preference to warnings */
      (shouldShowValidationState && this.hasErrors)
    ) {
      return 'error';
    }

    if (
      /* custom warning should be always shown unless there is a validation error */
      this.hasCustomWarning ||
      (shouldShowValidationState && this.hasWarnings)
    ) {
      return 'warning';
    }

    if (shouldShowValidationState) {
      return 'success';
    }

    return null;
  }

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

  /**
   * The Bootstrap grid classes for form labels within a horizontal layout form. Defaults to the value of the same
   * property of the parent form. The corresponding grid classes for form controls are automatically computed.
   *
   * @property horizontalLabelGridClass
   * @type string
   * @public
   */

  _elementId = guidFor(this);

  /**
   * ID for input field and the corresponding label's "for" attribute
   *
   * @property formElementId
   * @type string
   * @private
   */
  get formElementId() {
    return `${this._elementId}-field`;
  }

  /**
   * ID of the helpText, used for aria-describedby attribute of the control element
   *
   * @property ariaDescribedBy
   * @type string
   * @private
   */
  get ariaDescribedBy() {
    return `${this._elementId}-help`;
  }

  /**
   * @property layoutComponent
   * @type {String}
   * @private
   */

  /**
   * @property controlComponent
   * @private
   */
  get controlComponent() {
    let owner = getOwner(this);
    let componentClass = owner.resolveRegistration(
      `component:bs-form/element/control/${this.controlType}`,
    );

    if (componentClass) {
      return componentClass;
    }

    if (this.controlType === 'checkbox') {
      return ControlCheckbox;
    } else if (this.controlType === 'textarea') {
      return ControlTextarea;
    } else if (this.controlType === 'radio') {
      return ControlRadio;
    } else if (this.controlType === 'switch') {
      return ControlSwitch;
    } else {
      return ControlInput;
    }
  }

  /**
   * @property errorsComponent
   * @type {String}
   * @private
   */

  /**
   * @property feedbackIconComponent
   * @type {String}
   * @private
   */

  /**
   * @property labelComponent
   * @type {String}
   * @private
   */

  /**
   * @property helpTextComponent
   * @type {String}
   * @private
   */

  /**
   * Setup validation properties. This method acts as a hook for external validation
   * libraries to overwrite. In case of failed validations the `errors` property should contain an array of error messages.
   *
   * @method setupValidations
   * @private
   */

  /**
   * The action is called whenever the input value is changed, e.g. by typing text
   *
   * @event onChange
   * @param {String} value The new value of the form control
   * @param {Object} model The form element's model
   * @param {String} property The value of `property`
   * @public
   */

  /**
   * Private duplicate of onChange event used for internal state handling between form and it's elements.
   *
   * @event _onChange
   * @private
   */

  constructor() {
    super(...arguments);

    if (!isBlank(this.args.property)) {
      this.setupValidations?.();
    }
  }

  @action
  doChange(value) {
    let { onChange, model, property, _onChange } = this.args;
    onChange?.(value, model, property);
    _onChange?.();
  }
}
