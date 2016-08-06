import Ember from 'ember';
import layout from '../templates/components/bs-navbar';

export default Ember.Component.extend({
  layout,

  tagName: 'nav',
  classNames: ['navbar', 'navbar-default'],

  navbarCollapsed: true,

  actions: {
    toggleNavbar() {
      this.toggleProperty('navbarCollapsed');
    }
  }
});
