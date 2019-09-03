import { attributeBindings, classNames, layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-modal/header/close';

/**

 @class ModalHeaderClose
 @namespace Components
 @extends Ember.Component
 @private
 */
@templateLayout(layout)
@tagName('button')
@classNames('close')
@attributeBindings('type', 'aria-label')
export default class ModalHeaderClose extends Component {
  'aria-label' = 'Close';
  type = 'button';

  /**
   * @event onClick
   * @public
   */
  onClick() {
  }

  click() {
    this.get('onClick')();
  }
}
