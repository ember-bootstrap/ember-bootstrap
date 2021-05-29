import { action } from '@ember/object';
import Component from '@glimmer/component';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**
 Component for an accordion item title.

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionItemTitle
 @namespace Components
 @extends Glimmer.Component
 @public
 */
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

  @action
  handleClick(e) {
    e.preventDefault();
    if (!this.args.disabled) {
      this.args.onClick?.();
    }
  }
}
