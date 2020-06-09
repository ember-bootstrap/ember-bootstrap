import BsNavComponent from 'ember-bootstrap/components/bs-nav';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

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
  '__ember-bootstrap_subclass' = true;

  @defaultValue
  justified = false;

  additionalClass = 'navbar-nav';
}
