import Ember from 'ember';
import BsNavComponent from 'ember-bootstrap/components/bs-nav';
import layout from '../templates/components/bs-navbar-nav';

/**
 * Component for the `.nav` element within a [Components.Navbar](Components.Navbar.html)
 * component. Have a look there for examples.
 *
 * @class NavbarNav
 * @namespace Components
 * @extends Components.Nav
 * @public
 */
export default BsNavComponent.extend({
  layout,

  classNames: ['navbar-nav'],

  /**
   * Per [the bootstrap docs](http://getbootstrap.com/components/#navbar),
   * justified navbar nav links are not supported.
   *
   * @property justified
   * @type boolean
   * @default false
   * @final
   */
  justified: Ember.computed(function() {
    return false;
  })
});
