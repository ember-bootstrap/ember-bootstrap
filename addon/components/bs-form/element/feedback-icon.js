import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**

 @class FormElementFeedbackIcon
 @namespace Components
 @extends Ember.Component
 @private
 */
@tagName('')
@deprecateSubclassing
export default class FormElementFeedbackIcon extends Component {
  /**
   * @property show
   * @type {Boolean}
   * @public
   */
  @defaultValue
  show = false;

  /**
   * @property iconName
   * @type {String}
   * @public
   */
  @defaultValue
  iconName = null;
}
