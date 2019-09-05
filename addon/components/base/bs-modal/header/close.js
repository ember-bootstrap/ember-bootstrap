import { attributeBindings, classNames, layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-modal/header/close';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

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

  @defaultValue
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
