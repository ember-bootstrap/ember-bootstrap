import Ember from 'ember';
import layout from '../templates/components/bs-navbar';

export default Ember.Component.extend({
  layout,

  tagName: 'nav',
  classNames: ['navbar', 'navbar-default'],

  collapsed: true,
  expanded: Ember.computed.not('collapsed'),

  actions: {
    toggle() {
      this.toggleProperty('collapsed');
    }
  }
});
