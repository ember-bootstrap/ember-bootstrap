import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-form/element/feedback-icon';

/**

 @class FormElementFeedbackIcon
 @namespace Components
 @extends Ember.Component
 @private
 */
@templateLayout(layout)
@tagName('')
export default class FormElementFeedbackIcon extends Component {
 /**
  * @property show
  * @type {Boolean}
  * @public
  */
 show = false;

 /**
  * @property iconName
  * @type {String}
  * @public
  */
 iconName = null;
}
