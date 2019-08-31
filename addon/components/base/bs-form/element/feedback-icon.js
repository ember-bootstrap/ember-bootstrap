import classic from 'ember-classic-decorator';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-form/element/feedback-icon';

/**

 @class FormElementFeedbackIcon
 @namespace Components
 @extends Ember.Component
 @private
 */
@classic
@templateLayout(layout)
@tagName('')
export default class FeedbackIcon extends Component {
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
