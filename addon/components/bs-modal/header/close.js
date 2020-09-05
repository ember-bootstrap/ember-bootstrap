import { action } from '@ember/object';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**

 @class ModalHeaderClose
 @namespace Components
 @extends Ember.Component
 @private
 */
@tagName('')
@deprecateSubclassing
export default class ModalHeaderClose extends Component {
  /**
   * @event onClick
   * @public
   */
  onClick() {}

  @action
  handleClick() {
    this.onClick();
  }
}
