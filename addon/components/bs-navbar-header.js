import Ember from 'ember';
import layout from '../templates/components/bs-navbar-header';

/**
 * Component to wrap the header section of a [Components.Navbar](Components.Navbar.html) component.
 * Have a look there for examples.
 *
 * @class NavbarHeader
 * @namespace Components
 * @extends Ember.Component
 * @public
 */
export default Ember.Component.extend({
  layout,

  classNames: ['navbar-header']
});
