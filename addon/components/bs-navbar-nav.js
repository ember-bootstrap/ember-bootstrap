import BsNavComponent from 'ember-bootstrap/components/bs-nav';
import layout from '../templates/components/bs-navbar-nav';

export default BsNavComponent.extend({
  layout,

  classNames: ['navbar-nav'],

  // TODO: How do I enforce this?
  justified: false
});
