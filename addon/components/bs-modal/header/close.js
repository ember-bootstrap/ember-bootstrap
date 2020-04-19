import { action } from '@ember/object';
import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-modal/header/close';

/**

 @class ModalHeaderClose
 @namespace Components
 @extends Ember.Component
 @private
 */
@templateLayout(layout)
@tagName('')
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
