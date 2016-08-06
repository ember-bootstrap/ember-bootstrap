import Ember from 'ember';
import BsButtonComponent from 'ember-bootstrap/components/bs-button';
import layout from '../templates/components/bs-navbar-toggle';

/**
 * Component to implement the responsive menu toggle behavior in a [Components.Navbar](Components.Navbar.html)
 * component. Have a look there for examples.
 *
 * @class NavbarToggle
 * @namespace Components
 * @extends Components.Button
 * @public
 */
export default BsButtonComponent.extend({
  layout,

  classNames: ['navbar-toggle', 'collapsed'],

  /**
   * See [Components.Button](Components.Button.html).
   *
   * @property toggle
   * @type Boolean
   * @default true
   * @readonly
   * @protected
   */
  toggle: Ember.computed(function() {
    return true;
  })
});
