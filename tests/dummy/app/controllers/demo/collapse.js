import Ember from 'ember';

export default Ember.Controller.extend({
  collapsed: true,
  notCollapsed: Ember.computed.not('collapsed'),

  actions: {
    toggle() {
      this.toggleProperty('collapsed');
    }
  }
});
