import Navbar from 'ember-bootstrap/components/base/bs-navbar';

export default Navbar.extend({
  _positionPrefix: 'navbar-',

  init() {
    this._super(...arguments);
    this.set('_validPositions', ['fixed-top', 'fixed-bottom', 'static-top']);
  }
});
