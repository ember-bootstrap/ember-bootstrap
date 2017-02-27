import BsNavComponent from 'ember-bootstrap/components/bs-nav';

/**
 * Component for the `.nav` element within a [Components.Navbar](Components.Navbar.html)
 * component. Have a look there for examples.
 *
 * Per [the bootstrap docs](http://getbootstrap.com/components/#navbar),
 * justified navbar nav links are not supported.
 *
 * @class NavbarNav
 * @namespace Components
 * @extends Components.Nav
 * @public
 */
export default BsNavComponent.extend({
  classNames: ['navbar-nav'],

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('justified', false);
  }
});
