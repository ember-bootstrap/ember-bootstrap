import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';
import layout from '../templates/components/bs-navbar';

export default Ember.Component.extend(TypeClass, {
  layout,

  tagName: 'nav',
  classNames: ['navbar'],

  classTypePrefix: 'navbar',

  navbarCollapsed: true,

  actions: {
    toggleNavbar() {
      this.toggleProperty('navbarCollapsed');
    }
  }
});
