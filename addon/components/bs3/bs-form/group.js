import { classNameBindings, classNames } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { and, notEmpty } from '@ember/object/computed';
import BaseFormGroup from 'ember-bootstrap/components/base/bs-form/group';
import Config from 'ember-bootstrap/config';
import { isBlank } from '@ember/utils';
import sizeClass from 'ember-bootstrap/utils/cp/size-class';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

@classNames('form-group')
@classNameBindings('validationClass', 'hasFeedback', 'sizeClass')
export default class FormGroup extends BaseFormGroup {
 /**
  * Whether to show validation state icons.
  * See http://getbootstrap.com/css/#forms-control-validation
  *
  * @property useIcons
  * @type boolean
  * @default true
  * @public
  */
 @defaultValue
 useIcons = true;

 /**
  * Computed property which is true if the form group is showing a validation icon
  *
  * @property hasFeedback
  * @type boolean
  * @private
  * @readonly
  */
 @(and('hasValidation', 'useIcons', 'hasIconForValidationState').readOnly())
 hasFeedback;

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
    *   formValidationSuccessIcon: 'fas fa-check'
    * }
  * ```
  *
  * @property successIcon
  * @type string
  * @default 'glyphicon glyphicon-ok'
  * @public
  */
 @defaultValue
 successIcon = Config.formValidationSuccessIcon;

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
    *   formValidationErrorIcon: 'fas fa-times'
    * }
  * ```
  *
  * @property errorIcon
  * @type string
  * @public
  */
 @defaultValue
 errorIcon = Config.formValidationErrorIcon;

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
    *   formValidationWarningIcon: 'fas fa-exclamation-triangle'
    * }
  * ```
  *
  * @property warningIcon
  * @type string
  * @public
  */
 @defaultValue
 warningIcon = Config.formValidationWarningIcon;

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
 @defaultValue
 infoIcon = Config.formValidationInfoIcon;

 /**
  * Property for size styling, set to 'lg', 'sm' or 'xs'
  *
  * Also see the [Bootstrap docs](https://getbootstrap.com/docs/3.4/css/#forms-control-sizes)
  *
  * @property size
  * @type String
  * @public
  */
 @defaultValue
 size = null;

 @sizeClass('form-group', 'size')
 sizeClass;

 /**
  * @property iconName
  * @type string
  * @readonly
  * @private
  */
 @(computed('validation').readOnly())
 get iconName() {
   let validation = this.get('validation') || 'success';
   return this.get(`${validation}Icon`);
 }

 /**
  * @property hasIconForValidationState
  * @type boolean
  * @readonly
  * @private
  */
 @(notEmpty('iconName').readOnly())
 hasIconForValidationState;

 /**
  * @property validationClass
  * @type string
  * @readonly
  * @private
  */
 @(computed('validation').readOnly())
 get validationClass() {
   let validation = this.get('validation');
   return !isBlank(validation) ? `has-${validation}` : undefined;
 }
}
