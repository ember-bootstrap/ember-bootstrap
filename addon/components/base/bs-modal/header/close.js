import classic from 'ember-classic-decorator';
import { classNames, attributeBindings, tagName, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-modal/header/close';

/**

 @class ModalHeaderClose
 @namespace Components
 @extends Ember.Component
 @private
 */
@classic
@templateLayout(layout)
@tagName('button')
@classNames('close')
@attributeBindings('type', 'aria-label')
export default class Close extends Component {
 'aria-label' = 'Close';
 type = 'button';

 /**
  * @event onClick
  * @public
  */
 onClick() {}

 click() {
   this.get('onClick')();
 }
}
