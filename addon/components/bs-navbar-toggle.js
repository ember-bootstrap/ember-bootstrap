import layout from '../templates/components/bs-navbar-toggle';
import BsButtonComponent from 'ember-bootstrap/components/bs-button';

export default BsButtonComponent.extend({
  layout,

  classNames: ['navbar-toggle', 'collapsed'],

  init() {
    this._super(...arguments);
    this.set('toggle', true);
  }
});
