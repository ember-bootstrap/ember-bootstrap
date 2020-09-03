import { action } from '@ember/object';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**
 Component for an accordion item title.

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionItemTitle
 @namespace Components
 @extends Ember.Component
 @public
 */
@tagName('')
@deprecateSubclassing
export default class AccordionItemTitle extends Component {
  /**
   * @property collapsed
   * @type boolean
   * @public
   */

  /**
   * @property disabled
   * @type boolean
   * @private
   */

  /**
   * @event onClick
   * @public
   */
  onClick() {}

  @action
  handleClick(e) {
    e.preventDefault();
    if (!this.disabled) {
      this.onClick();
    }
  }
}
