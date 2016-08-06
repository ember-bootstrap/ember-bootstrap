import Ember from 'ember';
import layout from '../templates/components/bs-navbar';

export default Ember.Component.extend({
  layout,

  tagName: 'nav',
  classNames: ['navbar', 'navbar-default'],

  navbarCollapsed: true,
  navbarExpanded: Ember.computed.not('navbarCollapsed'),

  actions: {
    toggleNavbar() {
      this.toggleProperty('navbarCollapsed');
    }
  }
});
