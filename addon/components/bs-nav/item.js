import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**
 Component for each item within a [Components.Nav](Components.Nav.html) component. Have a look there for examples.

 @class NavItem
 @namespace Components
 @extends Ember.Component
 @uses Mixins.ComponentParent
 @public
 */
@tagName('')
@deprecateSubclassing
export default class NavItem extends Component {
  /**
   * Called when clicking the nav item
   *
   * @event onClick
   * @public
   */
  onClick() {}

  @action
  handleClick() {
    this.onClick();
  }

  init() {
    super.init(...arguments);
    let { model, models } = this;
    assert(
      'You cannot pass both `@model` and `@models` to a nav item component!',
      !model || !models,
    );
  }
}
