import { and, notEmpty } from '@ember/object/computed';
import FormGroup from 'ember-bootstrap/components/base/bs-form/group';
import Config from 'ember-bootstrap/config';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';

export default FormGroup.extend({
  classNames: ['form-group'],
  classNameBindings: ['validationClass', 'hasFeedback'],

  classTypePrefix: 'form-group',

  /**
   * Whether to show validation state icons.
   * See http://getbootstrap.com/css/#forms-control-validation
   *
   * @property useIcons
   * @type boolean
   * @default true
   * @public
   */
  useIcons: true,

  /**
   * Computed property which is true if the form group is showing a validation icon
   *
   * @property hasFeedback
   * @type boolean
   * @private
   * @readonly
   */
  hasFeedback: and('hasValidation', 'useIcons', 'hasIconForValidationState').readOnly(),

  /**
   * The icon classes to be used for a feedback icon in a "success" validation state.
   * Defaults to the usual glyphicon classes. This is ignored, and no feedback icon is
   * rendered if `useIcons` is false.
   *
   * You can change this globally by setting the `formValidationSuccessIcon` property of
   * the ember-bootstrap configuration in your config/environment.js file. If your are
   * using FontAwesome for example:
   *
   * ```js
   * ENV['ember-bootstrap'] = {
     *   formValidationSuccessIcon: 'fa fa-check'
     * }
   * ```
   *
   * @property successIcon
   * @type string
   * @default 'glyphicon glyphicon-ok'
   * @public
   */
  successIcon: Config.formValidationSuccessIcon,

  /**
   * The icon classes to be used for a feedback icon in a "error" validation state.
   * Defaults to the usual glyphicon classes. This is ignored, and no feedback icon is
   * rendered if `useIcons` is false.
   *
   * You can change this globally by setting the `formValidationErrorIcon` property of
   * the ember-bootstrap configuration in your config/environment.js file. If your are
   * using FontAwesome for example:
   *
   * ```js
   * ENV['ember-bootstrap'] = {
     *   formValidationErrorIcon: 'fa fa-times'
     * }
   * ```
   *
   * @property errorIcon
   * @type string
   * @public
   */
  errorIcon: Config.formValidationErrorIcon,

  /**
   * The icon classes to be used for a feedback icon in a "warning" validation state.
   * Defaults to the usual glyphicon classes. This is ignored, and no feedback icon is
   * rendered if `useIcons` is false.
   *
   * You can change this globally by setting the `formValidationWarningIcon` property of
   * the ember-bootstrap configuration in your config/environment.js file. If your are
   * using FontAwesome for example:
   *
   * ```js
   * ENV['ember-bootstrap'] = {
     *   formValidationWarningIcon: 'fa fa-warning'
     * }
   * ```
   *
   * @property warningIcon
   * @type string
   * @public
   */
  warningIcon: Config.formValidationWarningIcon,

  /**
   * The icon classes to be used for a feedback icon in a "info" validation state.
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
  infoIcon: Config.formValidationInfoIcon,

  /**
   * @property iconName
   * @type string
   * @readonly
   * @private
   */
  iconName: computed('validation', function() {
    let validation = this.get('validation') || 'success';
    return this.get(`${validation}Icon`);
  }).readOnly(),

  /**
   * @property hasIconForValidationState
   * @type boolean
   * @readonly
   * @private
   */
  hasIconForValidationState: notEmpty('iconName').readOnly(),

  /**
   * @property validationClass
   * @type string
   * @readonly
   * @private
   */
  validationClass: computed('validation', function() {
    let validation = this.get('validation');
    if (!isBlank(validation)) {
      return `has-${validation}`;
    }
  }).readOnly()
});
