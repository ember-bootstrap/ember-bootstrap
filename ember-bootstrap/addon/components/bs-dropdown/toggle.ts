import Component from '@glimmer/component';
import { action } from '@ember/object';

interface DropdownToggleSignature {
  Element: HTMLDivElement;
  Args: {
    inNav?: boolean;
    isOpen?: boolean;
    onClick?: () => void;
    onKeyDown: (event: KeyboardEvent) => void;
  };
  Blocks: {
    default: [];
  };
}

/**
 Anchor element that triggers the parent dropdown to open.
 Use [Components.DropdownButton](Components.DropdownButton.html) if you want a button instead of an anchor tag.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownToggle
 @namespace Components
 @extends Component
 @publicø
 */
export default class DropdownToggle extends Component<DropdownToggleSignature> {
  /**
   * @property inNav
   * @type {boolean}
   * @private
   */
  get inNav() {
    return this.args.inNav ?? false;
  }

  get 'aria-expanded'() {
    return this.args.isOpen ? 'true' : 'false';
  }

  /**
   * When clicking the toggle this action is called.
   *
   * @event onClick
   * @param {*} value
   * @public
   */

  @action
  handleClick(e: MouseEvent) {
    e.preventDefault();
    this.args.onClick?.();
  }

  @action
  handleKeyDown(e: KeyboardEvent) {
    this.args.onKeyDown(e);
  }
}

export { type DropdownToggleSignature };
