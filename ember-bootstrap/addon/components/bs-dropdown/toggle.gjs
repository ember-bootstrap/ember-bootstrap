import Component from '@glimmer/component';
import { action } from '@ember/object';

/**
 Anchor element that triggers the parent dropdown to open.
 Use [Components.DropdownButton](Components.DropdownButton.html) if you want a button instead of an anchor tag.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownToggle
 @namespace Components
 @extends Component
 @publicø
 */
import { on } from '@ember/modifier';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import willDestroy from '@ember/render-modifiers/modifiers/will-destroy';
export default class DropdownToggle extends Component {
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
  handleClick(e) {
    e.preventDefault();
    this.args.onClick?.();
  }

  @action
  handleKeyDown(e) {
    this.args.onKeyDown(e);
  }
  <template>
    {{! @glint-nocheck }}
    <a
      href='#'
      class='dropdown-toggle {{if @inNav "nav-link"}}'
      aria-expanded={{this.aria-expanded}}
      role='button'
      ...attributes
      {{on 'keydown' this.handleKeyDown}}
      {{on 'click' this.handleClick}}
      {{didInsert @registerChildElement 'toggle'}}
      {{willDestroy @unregisterChildElement 'toggle'}}
    >
      {{yield}}
    </a>
  </template>
}
