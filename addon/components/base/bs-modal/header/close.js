import { action } from "@ember/object";
import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-modal/header/close';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

/**

 @class ModalHeaderClose
 @namespace Components
 @extends Ember.Component
 @private
 */
@tagName("")
export default class ModalHeaderClose extends Component {
  'aria-label' = 'Close';

  @defaultValue
  type = 'button';

  /**
   * @event onClick
   * @public
   */
  onClick() {
  }

  @action
  handleClick() {
    this.get('onClick')();
  }
}
