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
export default class NavbarNav extends BsNavComponent {
  get justified() {
    return this.args.justified ?? false;
  }

  additionalClass = 'navbar-nav';
}
