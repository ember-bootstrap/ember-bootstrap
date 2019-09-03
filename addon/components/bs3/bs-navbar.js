import BaseNavbar from 'ember-bootstrap/components/base/bs-navbar';

export default class Navbar extends BaseNavbar {
  _positionPrefix = 'navbar-';

  init() {
    super.init(...arguments);
    this.set('_validPositions', ['fixed-top', 'fixed-bottom', 'static-top']);
  }
}
