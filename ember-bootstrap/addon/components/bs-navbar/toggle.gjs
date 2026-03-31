import Component from '@glimmer/component';
import { on } from '@ember/modifier';

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
export default class NavbarToggle extends Component {
  on = on;
}
