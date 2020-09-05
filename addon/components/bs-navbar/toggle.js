import { action } from '@ember/object';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**
 * Component to implement the responsive menu toggle behavior in a [Components.Navbar](Components.Navbar.html)
 * component. Have a look there for examples.
 *
 * ### Bootstrap 3/4 Notes
 *
 * The inline version of the component uses the triple `icon-bar` styling for Bootstrap 3 and the
 * `navbar-toggler-icon` styling for Bootstrap 4.
 *
 * @class NavbarToggle
 * @namespace Components
 * @extends Ember.Component
 * @public
 */
@tagName('')
@deprecateSubclassing
export default class NavbarToggle extends Component {
  @defaultValue
  collapsed = true;

  /**
   * @event onClick
   * @public
   */
  onClick() {}

  @action
  handleClick() {
    this.onClick();
  }
}
