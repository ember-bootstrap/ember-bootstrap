import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-navbar/toggle';

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
export default Component.extend({
  layout,
  tagName: 'button',

  classNameBindings: ['collapsed'],
  collapsed: true,

  /**
   * @event onClick
   * @public
   */
  onClick() {
  },

  click() {
    this.onClick();
  }

});
