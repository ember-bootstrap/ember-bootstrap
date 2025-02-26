import { action } from '@ember/object';
import Component from '@glimmer/component';

export interface TitleSignature {
  Args: {
    controls?: string;
    collapsed?: boolean;
    disabled?: boolean;
    onClick?: () => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLHeadingElement;
}
/**
 Component for an accordion item title.

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionItemTitle
 @namespace Components
 @extends Glimmer.Component
 @public
 */
export default class AccordionItemTitle extends Component<TitleSignature> {
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
  handleClick(e: Event) {
    e.preventDefault();
    if (!this.args.disabled) {
      this.args.onClick?.();
    }
  }
}
