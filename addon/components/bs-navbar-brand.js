import Ember from 'ember';
import layout from '../templates/components/bs-navbar-brand';

/**
 * Component for the brand within a [Components.Navbar](Components.Navbar.html) component. Have a look there for examples.
 *
 * This implements `.navbar-brand` [element behavior](http://getbootstrap.com/components/#navbar-brand-image).
 *
 * @class NavbarBrand
 * @namespace Components
 * @extends Ember.Component
 * @public
 */
export default Ember.Component.extend({
  layout,

  tagName: 'a',
  classNames: ['navbar-brand'],
  attributeBindings: ['href'],

  /**
   * The target of the brand link.
   *
   * @property href
   * @type String
   * @default '#'
   * @public
   */
  href: '#'
});
