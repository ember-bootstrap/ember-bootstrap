import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

/**
 Component for each item within a [Components.Nav](Components.Nav.html) component. Have a look there for examples.

 @class NavItem
 @namespace Components
 @extends Component
 @public
 */
export default class NavItem extends Component {
  /**
   * Called when clicking the nav item
   *
   * @event onClick
   * @public
   */

  @action
  handleClick() {
    this.args.onClick?.();
  }

  constructor(owner, args) {
    super(owner, args);
    let { model, models } = this;
    assert(
      'You cannot pass both `@model` and `@models` to a nav item component!',
      !model || !models,
    );
  }
}
