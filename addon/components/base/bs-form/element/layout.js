import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';

/**

 @class FormElementLayout
 @namespace Components
 @extends Ember.Component
 @private
 */
@tagName('')
export default class FormElementLayout extends Component {
 /**
  * @property formElementId
  * @type {String}
  * @public
  */
 formElementId = null;

 /**
  * @property hasLabel
  * @type boolean
  * @public
  */
 hasLabel = true;

 /**
  * @property errorsComponent
  * @type {Ember.Component}
  * @public
  */
 errorsComponent = null;

 /**
  * @property feedbackIconComponent
  * @type {Ember.Component}
  * @public
  */
 feedbackIconComponent = null;

 /**
  * @property labelComponent
  * @type {Ember.Component}
  * @public
  */
 labelComponent = null;

 /**
  * @property helpTextComponent
  * @type {Ember.Component}
  * @public
  */
 helpTextComponent = null;
}
