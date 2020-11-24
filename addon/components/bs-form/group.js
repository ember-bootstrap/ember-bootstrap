import Component from '@glimmer/component';
import Config from 'ember-bootstrap/config';
import { isBlank, isPresent } from '@ember/utils';
import arg from 'ember-bootstrap/utils/decorators/arg';

/**
  This component renders a `<div class="form-group">` element, with support for validation states and feedback icons (only for BS3).
  You can use it as a block level component. The following shows Bootstrap 3 usage for the internal markup.

  ```hbs
  <BsForm as |form|>
    <form.group @validation={{this.firstNameValidation}}>
      <label class="control-label">First name</label>
      <input value={{this.firstname}} class="form-control" oninput={{action (mut this.firstname) value="target.value"}} type="text">
    </form.group>
  </bs-form>
  ```

  If the `validation` property is set to some state (usually Bootstrap's predefined states "success",
  "warning" or "error"), the appropriate styles will be added, together with a feedback icon.
  See http://getbootstrap.com/css/#forms-control-validation

  @class FormGroup
  @namespace Components
  @extends Ember.Component
  @public
*/
export default class FormGroup extends Component {
  /**
   * @property classTypePrefix
   * @type String
   * @default 'form-group' (BS3) or 'form-control' (BS4)
   * @private
   */

  /**
   * Computed property which is true if the form group is in a validation state
   *
   * @property hasValidation
   * @type boolean
   * @private
   * @readonly
   */
  get hasValidation() {
    return isPresent(this.validation);
  }

  /**
   * [BS3 only] Set to a validation state to render the form-group with a validation style.
   * See http://getbootstrap.com/css/#forms-control-validation
   *
   * The default states of "success", "warning" and "error" are supported by Bootstrap out-of-the-box.
   * But you can use custom states as well. This will set a has-<state> class, and (if `useIcons`is true)
   * a feedback whose class is taken from the <state>Icon property
   *
   * @property validation
   * @type string
   * @public
   */
  @arg validation;

  /**
   * [BS3 only] Whether to show validation state icons.
   * See http://getbootstrap.com/css/#forms-control-validation
   *
   * @property useIcons
   * @type boolean
   * @default true
   * @public
   */
  @arg
  useIcons = true;

  /**
   * [BS3 only] Computed property which is true if the form group is showing a validation icon
   *
   * @property hasFeedback
   * @type boolean
   * @private
   * @readonly
   */
  get hasFeedback() {
    return this.hasValidation && this.useIcons && this.hasIconForValidationState;
  }

  /**
   * [BS3 only] The icon classes to be used for a feedback icon in a "success" validation state.
   * Defaults to the usual glyphicon classes. This is ignored, and no feedback icon is
   * rendered if `useIcons` is false.
   *
   * You can change this globally by setting the `formValidationSuccessIcon` property of
   * the ember-bootstrap configuration in your config/environment.js file. If your are
   * using FontAwesome for example:
   *
   * ```js
   * ENV['ember-bootstrap'] = {
   *   formValidationSuccessIcon: 'fas fa-check'
   * }
   * ```
   *
   * @property successIcon
   * @type string
   * @default 'glyphicon glyphicon-ok'
   * @public
   */
  @arg
  successIcon = Config.formValidationSuccessIcon;

  /**
   * [BS3 only] The icon classes to be used for a feedback icon in a "error" validation state.
   * Defaults to the usual glyphicon classes. This is ignored, and no feedback icon is
   * rendered if `useIcons` is false.
   *
   * You can change this globally by setting the `formValidationErrorIcon` property of
   * the ember-bootstrap configuration in your config/environment.js file. If your are
   * using FontAwesome for example:
   *
   * ```js
   * ENV['ember-bootstrap'] = {
   *   formValidationErrorIcon: 'fas fa-times'
   * }
   * ```
   *
   * @property errorIcon
   * @type string
   * @public
   */
  @arg
  errorIcon = Config.formValidationErrorIcon;

  /**
   * [BS3 only] The icon classes to be used for a feedback icon in a "warning" validation state.
   * Defaults to the usual glyphicon classes. This is ignored, and no feedback icon is
   * rendered if `useIcons` is false.
   *
   * You can change this globally by setting the `formValidationWarningIcon` property of
   * the ember-bootstrap configuration in your config/environment.js file. If your are
   * using FontAwesome for example:
   *
   * ```js
   * ENV['ember-bootstrap'] = {
   *   formValidationWarningIcon: 'fas fa-exclamation-triangle'
   * }
   * ```
   *
   * @property warningIcon
   * @type string
   * @public
   */
  @arg
  warningIcon = Config.formValidationWarningIcon;

  /**
   * [BS3 only] The icon classes to be used for a feedback icon in a "info" validation state.
   * Defaults to the usual glyphicon classes. This is ignored, and no feedback icon is
   * rendered if `useIcons` is false.
   *
   * You can change this globally by setting the `formValidationInfoIcon` property of
   * the ember-bootstrap configuration in your config/environment.js file. If your are
   * using FontAwesome for example:
   *
   * ```js
   * ENV['ember-bootstrap'] = {
   *   formValidationInfoIcon: 'fa fa-info-circle
   * }
   * ```
   *
   * The "info" validation state is not supported in Bootstrap CSS, but can be easily added
   * using the following LESS style:
   * ```less
   * .has-info {
   *   .form-control-validation(@state-info-text; @state-info-text; @state-info-bg);
   * }
   * ```
   *
   * @property infoIcon
   * @type string
   * @public
   */
  @arg
  infoIcon = Config.formValidationInfoIcon;

  /**
   * [BS3 only]
   *
   * @property iconName
   * @type string
   * @readonly
   * @private
   */
  get iconName() {
    let validation = this.validation || 'success';
    return this[`${validation}Icon`];
  }

  /**
   * [BS3 only]
   *
   * @property hasIconForValidationState
   * @type boolean
   * @readonly
   * @private
   */
  get hasIconForValidationState() {
    return isPresent(this.iconName);
  }

  /**
   * [BS3 only]
   *
   * @property validationClass
   * @type string
   * @readonly
   * @private
   */
  get validationClass() {
    let validation = this.validation;
    return !isBlank(validation) ? `has-${validation}` : undefined;
  }
}
