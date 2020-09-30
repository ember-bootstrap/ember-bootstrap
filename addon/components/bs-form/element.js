import { and, gt, notEmpty, or } from '@ember/object/computed';
import { action, computed, get } from '@ember/object';
import { assert, warn } from '@ember/debug';
import { DEBUG } from '@glimmer/env';
import { isBlank, typeOf } from '@ember/utils';
import { A, isArray } from '@ember/array';
import { getOwner } from '@ember/application';
import FormGroup from 'ember-bootstrap/components/bs-form/group';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import { getOwnConfig, macroCondition } from '@embroider/macros';
import { guidFor } from '@ember/object/internals';
import { ref } from 'ember-ref-bucket';

/**
  Sub class of `Components.FormGroup` that adds automatic form layout markup and form validation features.

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
    <form.element @label="Select-2" @property="gender" @useIcons={{false}} as |el|>
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

  If your custom control does not render an input element, you should set `useIcons` to `false` since bootstrap only supports
  feedback icons with textual `<input class="form-control">` elements.

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
    <BsButton @defaultText="Submit" @type="primary" @buttonType="submit" />
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
export default class FormElement extends FormGroup {
  /**
   * @property _element
   * @type null | HTMLElement
   * @private
   */
  @ref('mainNode') _element = null;

  @defaultValue
  doNotShowValidationForEventTargets = macroCondition(getOwnConfig().isBS3)
    ? ['.input-group-addon', '.input-group-btn']
    : ['.input-group-append', '.input-group-prepend'];

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
  @defaultValue
  label = null;

  /**
   * Controls label visibility by adding 'sr-only' class.
   *
   * @property invisibleLabel
   * @type boolean
   * @default false
   * @public
   */
  @defaultValue
  invisibleLabel = false;

  /**
   * @property hasLabel
   * @type boolean
   * @readonly
   * @private
   */
  @notEmpty('label')
  hasLabel;

  /**
   * The type of the control widget.
   * Supported types:
   *
   * * 'text'
   * * 'checkbox'
   * * 'radio'
   * * 'textarea'
   * * any other type will use an input tag with the `controlType` value as the type attribute (for e.g. HTML5 input
   * types like 'email'), and the same layout as the 'text' type
   *
   * @property controlType
   * @type string
   * @default 'text'
   * @public
   */
  @defaultValue
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
    if (this.property && this.model) {
      return get(this.model, this.property);
    }
    return this._value;
  }

  set value(value) {
    assert('You cannot set both property and value on a form element', isBlank(this.property));

    this._value = value;
  }

  /**
   * Cache for value
   * @type {null}
   * @private
   */
  @defaultValue
  _value = null;

  /**
   The property name of the form element's `model` (by default the `model` of its parent `Components.Form`) that this
   form element should represent. The control element's value will automatically be bound to the model property's
   value.

   Using this property enables form validation on this element.

   @property property
   @type string
   @public
   */
  @defaultValue
  property = null;

  /**
   * The model used for validation. Defaults to the parent `Components.Form`'s `model`
   *
   * @property model
   * @public
   */
  @defaultValue
  model = null;

  /**
   * Show a help text next to the control
   *
   * @property helpText
   * @type {string}
   * @public
   */
  @defaultValue
  helpText = null;

  /**
   * Only if there is a validator, this property makes all errors to be displayed at once
   * inside a scrollable container.
   *
   * @default false
   * @property showMultipleErrors
   * @public
   * @type {Boolean}
   */
  @defaultValue
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
  @defaultValue
  options = null;

  /**
   * Property path (e.g. 'title' or 'related.name') to render the label of an selection option. See `options`.s
   *
   * @property optionLabelPath
   * @type {String}
   * @public
   */
  @defaultValue
  optionLabelPath = null;

  /**
   * @property hasHelpText
   * @type boolean
   * @readonly
   * @private
   */
  @(notEmpty('helpText').readOnly())
  hasHelpText;

  /**
   * The array of error messages from the `model`'s validation.
   *
   * @property errors
   * @type array
   * @protected
   */
  @defaultValue
  errors = null;

  /**
   * @property hasErrors
   * @type boolean
   * @readonly
   * @private
   */
  @gt('errors.length', 0)
  hasErrors;

  /**
   * The array of warning messages from the `model`'s validation.
   *
   * @property warnings
   * @type array
   * @protected
   */
  @defaultValue
  warnings = null;

  /**
   * @property hasWarnings
   * @type boolean
   * @readonly
   * @private
   */
  @gt('warnings.length', 0)
  hasWarnings;

  /**
   * Show a custom error message that does not come from the model's validation. Will be immediately shown, regardless
   * of any user interaction (i.e. no `focusOut` event required)
   *
   * @property customError
   * @type string
   * @public
   */
  @defaultValue
  customError = null;

  /**
   * @property hasCustomError
   * @type boolean
   * @readonly
   * @private
   */
  @notEmpty('customError')
  hasCustomError;

  /**
   * Show a custom warning message that does not come from the model's validation. Will be immediately shown, regardless
   * of any user interaction (i.e. no `focusOut` event required). If the model's validation has an error then the error
   * will be shown in place of this warning.
   *
   * @property customWarning
   * @type string
   * @public
   */
  @defaultValue
  customWarning = null;

  /**
   * @property hasCustomWarning
   * @type boolean
   * @readonly
   * @private
   */
  @notEmpty('customWarning')
  hasCustomWarning;

  /**
   * Property for size styling, set to 'lg', 'sm' or 'xs' (the latter only for BS3)
   *
   * @property size
   * @type String
   * @public
   */
  @defaultValue
  size = null;

  /**
   * The array of validation messages (either errors or warnings) from either custom error/warnings or , if we are showing model validation messages, the model's validation
   *
   * @property validationMessages
   * @type array
   * @private
   */
  @computed(
    'hasCustomError',
    'customError',
    'hasErrors',
    'hasCustomWarning',
    'customWarning',
    'hasWarnings',
    'errors.[]',
    'warnings.[]',
    'showModelValidation'
  )
  get validationMessages() {
    if (this.hasCustomError) {
      return A([this.customError]);
    }
    if (this.hasErrors && this.showModelValidation) {
      return A(this.errors);
    }
    if (this.hasCustomWarning) {
      return A([this.customWarning]);
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
  @gt('validationMessages.length', 0)
  hasValidationMessages;

  /**
   * @property hasValidator
   * @type boolean
   * @default false
   * @protected
   */
  @defaultValue
  hasValidator = false;

  /**
   * Set a validating state for async validations
   *
   * @property isValidating
   * @type boolean
   * @default false
   * @protected
   */
  @defaultValue
  isValidating = false;

  /**
   * If `true` form validation markup is rendered (requires a validatable `model`).
   *
   * @property showValidation
   * @type boolean
   * @default false
   * @private
   */
  @or('showOwnValidation', 'showAllValidations', 'hasCustomError', 'hasCustomWarning')
  showValidation;

  /**
   * @property showOwnValidation
   * @type boolean
   * @default false
   * @private
   */
  @defaultValue
  showOwnValidation = false;

  /**
   * @property showAllValidations
   * @type boolean
   * @default false
   * @private
   */
  @computed
  get showAllValidations() {
    return false;
  }

  set showAllValidations(value) {
    if (value === false) {
      this.set('showOwnValidation', false);
    }
    return value;
  }

  /**
   * @property showModelValidations
   * @type boolean
   * @readonly
   * @private
   */
  @or('showOwnValidation', 'showAllValidations')
  showModelValidation;

  /**
   * @property showValidationMessages
   * @type boolean
   * @readonly
   * @private
   */
  @and('showValidation', 'hasValidationMessages')
  showValidationMessages;

  /**
   * Event or list of events which enable form validation markup rendering.
   * Supported events: ['focusout', 'change', 'input']
   *
   * @property showValidationOn
   * @type string|array
   * @default ['focusout']
   * @public
   */
  @defaultValue
  showValidationOn = null;

  /**
   * @property _showValidationOn
   * @type array
   * @readonly
   * @private
   */
  @computed('showValidationOn.[]')
  get _showValidationOn() {
    let showValidationOn = this.showValidationOn;

    assert(
      'showValidationOn must be a String or an Array',
      isArray(showValidationOn) || typeOf(showValidationOn) === 'string'
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
      // validations are already shown or
      this.showOwnValidation ||
      // validations should not be shown for this event type or
      this._showValidationOn.indexOf(type) === -1 ||
      // validation should not be shown for this event target
      (isArray(this.doNotShowValidationForEventTargets) &&
        this.doNotShowValidationForEventTargets.length > 0 &&
        this._element &&
        [...this._element.querySelectorAll(this.doNotShowValidationForEventTargets.join(','))].some((el) =>
          el.contains(target)
        ))
    ) {
      return;
    }

    this.set('showOwnValidation', true);
  }

  /**
   * Controls if validation should be shown for specified event targets.
   *
   * It expects an array of query selectors. If event target is a children of an event that matches
   * these selectors, an event triggered for it will not trigger validation errors to be shown.
   *
   * By default events fired on elements inside an input group are skipped.
   *
   * If `null` or an empty array is passed validation errors are shown for all events regardless
   * of event target.
   *
   * @property doNotShowValidationForEventTargets
   * @type ?array
   * @public
   */

  /**
   * The validation ("error" (BS3)/"danger" (BS4), "warning", or "success") or null if no validation is to be shown. Automatically computed from the
   * models validation state.
   *
   * @property validation
   * @readonly
   * @type string
   * @private
   */
  @computed(
    'hasCustomError',
    'hasErrors',
    'hasCustomWarning',
    'hasWarnings',
    'hasValidator',
    'showValidation',
    'showModelValidation',
    'isValidating',
    '_disabled'
  )
  get validation() {
    if (!this.showValidation || !this.hasValidator || this.isValidating || this._disabled) {
      return null;
    } else if (this.showModelValidation) {
      /* The display of model validation messages has been triggered */
      return this.hasErrors || this.hasCustomError
        ? 'error'
        : this.hasWarnings || this.hasCustomWarning
        ? 'warning'
        : 'success';
    } else {
      /* If there are custom errors or warnings these should always be shown */
      return this.hasCustomError ? 'error' : 'warning';
    }
  }

  /**
   * True for text field `controlType`s
   *
   * @property useIcons
   * @type boolean
   * @public
   */
  @computed('customControlComponent', 'controlType')
  get useIcons() {
    let { controlType } = this;
    return (
      !this.customControlComponent &&
      controlType !== 'textarea' &&
      controlType !== 'checkbox' &&
      controlType !== 'radio'
    );
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
   * The Bootstrap grid class for form labels within a horizontal layout form. Defaults to the value of the same
   * property of the parent form. The corresponding grid class for form controls is automatically computed.
   *
   * @property horizontalLabelGridClass
   * @type string
   * @public
   */
  @defaultValue
  horizontalLabelGridClass = null;

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
   * @property customControlComponent
   * @type {String}
   * @private
   */
  @computed('controlType')
  get customControlComponent() {
    const controlType = this.controlType;
    const componentName = `bs-form/element/control/${controlType}`;

    if (getOwner(this).hasRegistration(`component:${componentName}`)) {
      return componentName;
    }

    return null;
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
  setupValidations() {}

  /**
   * The action is called whenever the input value is changed, e.g. by typing text
   *
   * @event onChange
   * @param {String} value The new value of the form control
   * @param {Object} model The form element's model
   * @param {String} property The value of `property`
   * @public
   */
  onChange() {}

  /**
   * Private duplicate of onChange event used for internal state handling between form and it's elements.
   *
   * @event _onChange
   * @private
   */
  _onChange() {}

  init() {
    super.init(...arguments);
    if (this.showValidationOn === null) {
      this.set('showValidationOn', ['focusOut']);
    }
    if (!isBlank(this.property)) {
      this.setupValidations();
    }

    // deprecate arguments used for attribute bindings only
    if (DEBUG) {
      [
        ['accept', 'image/png'],
        ['autocapitalize', 'words'],
        ['autocomplete', 'on'],
        ['autocorrect', 'off'],
        ['autofocus', false],
        ['autosave', 'someuniquevalue'],
        ['cols', '10'],
        ['controlSize:size', '10'],
        ['disabled', true],
        ['form', 'myform'],
        ['inputmode', 'tel'],
        ['max', '5'],
        ['maxlength', '5'],
        ['min', '5'],
        ['minlength', '5'],
        ['multiple', true],
        ['name', 'foo'],
        ['pattern', '^[0-9]{5}$'],
        ['placeholder', 'foo'],
        ['required', true],
        ['readonly', true],
        ['rows', '10'],
        ['spellcheck', true],
        ['step', '2'],
        ['tabindex', '-1'],
        ['title', 'foo'],
        ['wrap', 'hard'],
      ].forEach(([mapping, value]) => {
        let argument = mapping.split(':')[0];
        let attribute = mapping.includes(':') ? mapping.split(':')[1] : argument;
        let warningMessage =
          `Argument ${argument} of <element> component yielded by <BsForm> has been removed. ` +
          `Its only purpose was setting the HTML attribute ${attribute} of the control element. ` +
          `You should use angle bracket  component invocation syntax instead:\n` +
          `Before:\n` +
          `  {{#bs-form as |form|}}\n` +
          `    {{form.element ${attribute}=${typeof value === 'string' ? `"${value}"` : value}}}\n` +
          `  {{/bs-form}}\n` +
          `  <BsForm as |form|>\n` +
          `    <form.element as |el|>\n` +
          `      <el.control @${attribute}=${typeof value === 'string' ? `"${value}"` : `{{${value}}}`} />\n` +
          `    </form.element>\n` +
          `  </BsForm>\n` +
          `After:\n` +
          `  <BsForm as |form|>\n` +
          `    <form.element as |el|>\n` +
          `      <el.control ${
            typeof value === 'boolean' ? (value ? attribute : '') : `${attribute}="${value}"`
          } />\n` +
          `    </form.element>\n` +
          `  </BsForm>\n` +
          `A codemod is available to help with the required migration. See https://github.com/kaliber5/ember-bootstrap-codemods/blob/master/transforms/deprecated-attribute-arguments/README.md`;

        warn(
          warningMessage,
          // eslint-disable-next-line ember/no-attrs-in-components
          !Object.keys(this.attrs).includes(argument),
          {
            id: `ember-bootstrap.removed-argument.form-element#${argument}`,
          }
        );
      });
    }
  }

  /*
   * adjust feedback icon position
   *
   * Bootstrap documentation:
   *  Manual positioning of feedback icons is required for [...] input groups
   *  with an add-on on the right. [...] For input groups, adjust the right
   *  value to an appropriate pixel value depending on the width of your addon.
   */
  @action
  adjustFeedbackIcons(el) {
    if (macroCondition(getOwnConfig().isBS3)) {
      let feedbackIcon;
      // validation state icons are only shown if form element has feedback
      if (
        !this.isDestroying &&
        this.hasFeedback &&
        // and form group element has
        // an input-group
        el.querySelector('.input-group') &&
        // an addon or button on right side
        el.querySelector('.input-group input + .input-group-addon, .input-group input + .input-group-btn') &&
        // an icon showing validation state
        (feedbackIcon = el.querySelector('.form-control-feedback'))
      ) {
        // clear existing adjustment
        feedbackIcon.style.right = '';

        let defaultPosition = 0;
        let match = getComputedStyle(feedbackIcon).right.match(/^(\d+)px$/);
        if (match) {
          defaultPosition = parseInt(match[1]);
        }
        // Bootstrap documentation:
        //  We do not support multiple add-ons (.input-group-addon or .input-group-btn) on a single side.
        // therefore we could rely on having only one input-group-addon or input-group-btn
        let inputGroupWidth = el.querySelector('input + .input-group-addon, input + .input-group-btn').offsetWidth;
        let adjustedPosition = defaultPosition + inputGroupWidth;

        feedbackIcon.style.right = `${adjustedPosition}px`;
      }
    }
  }

  @action
  doChange(value) {
    let { onChange, model, property, _onChange } = this;
    onChange(value, model, property);
    _onChange();
  }
}
