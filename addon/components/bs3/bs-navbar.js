import classic from 'ember-classic-decorator';
import Navbar from 'ember-bootstrap/components/base/bs-navbar';

@classic
export default class BsNavbar extends Navbar {
  _positionPrefix = 'navbar-';

  init() {
    super.init(...arguments);
    this.set('_validPositions', ['fixed-top', 'fixed-bottom', 'static-top']);
  }
}
