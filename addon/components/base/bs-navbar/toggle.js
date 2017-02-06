import BsButtonComponent from 'ember-bootstrap/components/bs-button';
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
 * @extends Components.Button
 * @public
 */
export default BsButtonComponent.extend({
  layout,

  classNameBindings: ['collapsed'],
  collapsed: true

  /**
   * Bootstrap 4 Only: Defines the alignment of the toggler. Valid values are 'left' and 'right'
   * to set the `navbar-toggler-*` class.
   *
   * @property align
   * @type String
   * @default null
   * @public
   */

});
