import Ember from 'ember';
import BsCollapseComponent from 'ember-bootstrap/components/bs-collapse';
import NavbarComponent from 'ember-bootstrap/components/bs-navbar';
import layout from '../templates/components/bs-navbar-content';

/**
 * Component to wrap the collapsible content of a [Components.Navbar](Components.Navbar.html) component.
 * Have a look there for examples.
 *
 * @class NavbarContent
 * @namespace Components
 * @extends Components.Collapse
 * @public
 */
export default BsCollapseComponent.extend({
  layout,

  classNames: ['navbar-collapse'],

  navbar: Ember.computed(function() {
    return this.nearestOfType(NavbarComponent);
  }),

  collapsed: Ember.computed.reads('navbar.collapsed')
});
