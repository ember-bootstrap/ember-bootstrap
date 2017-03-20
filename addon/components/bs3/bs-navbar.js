import Navbar from 'ember-bootstrap/components/base/bs-navbar';

export default Navbar.extend({
  _validPositions: ['fixed-top', 'fixed-bottom', 'static-top'],

  _positionPrefix: 'navbar-'
});
