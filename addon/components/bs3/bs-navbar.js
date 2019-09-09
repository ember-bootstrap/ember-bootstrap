import BaseNavbar from 'ember-bootstrap/components/base/bs-navbar';

export default class Navbar extends BaseNavbar {
  _positionPrefix = 'navbar-';
  _validPositions = ['fixed-top', 'fixed-bottom', 'static-top'];
}
