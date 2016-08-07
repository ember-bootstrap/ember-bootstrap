import BsButtonComponent from 'ember-bootstrap/components/bs-button';
import layout from '../templates/components/bs-navbar-toggle';

/**
 * Component to implement the responsive menu toggle behavior in a [Components.Navbar](Components.Navbar.html)
 * component. Have a look there for examples.
 *
 * The button `toggle` property will always be set to `true` in this component.
 *
 * @class NavbarToggle
 * @namespace Components
 * @extends Components.Button
 * @public
 */
export default BsButtonComponent.extend({
  layout,

  classNames: ['navbar-toggle', 'collapsed'],

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('toggle', true);
  }
});
