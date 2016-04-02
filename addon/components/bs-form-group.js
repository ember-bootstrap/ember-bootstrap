import Ember from 'ember';
import Config from 'ember-bootstrap/config';

const { computed } = Ember;

/**
 This component renders a `<div class="form-group">` element, with support for validation states and feedback icons.
 Use as a block level component:

 ```hbs
 {{#bs-form-group validation=firstNameValidation}}
   <label class="control-label">First name</label>
   {{bs-input type="text" value=firstname}}
 {{/bs-form-group}}
 ```

 If the `validation` property is set to some state (usually Bootstrap's predefined states "success",
 "warning" or "error"), the appropriate styles will be added, together with a feedback icon.
 See http://getbootstrap.com/css/#forms-control-validation

 @class FormGroup
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Ember.Component.extend({

  classNames: ['form-group'],
  classNameBindings: ['validationClass', 'hasFeedback'],

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
   * Computed property which is true if the form group is in a validation state
   *
   * @property hasValidation
   * @type boolean
   * @public
   * @readonly
   */
  hasValidation: computed.notEmpty('validation'),

  /**
   * Computed property which is true if the form group is showing a validation icon
   *
   * @property hasFeedback
   * @type boolean
   * @public
   * @readonly
   */
  hasFeedback: computed.and('hasValidation', 'useIcons', 'hasIconForValidationState'),

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

  iconName: computed('validation', function() {
    let validation = this.get('validation') || 'success';
    return this.get(`${validation}Icon`);
  }),

  hasIconForValidationState: computed.notEmpty('iconName'),

  /**
   * Set to a validation state to render the form-group with a validation style.
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
  validation: null,

  validationClass: computed('validation', function() {
    let validation = this.get('validation');
    if (!Ember.isBlank(validation)) {
      return `has-${this.get('validation')}`;
    }
  })
});
