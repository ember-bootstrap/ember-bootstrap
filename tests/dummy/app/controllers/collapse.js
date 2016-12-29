import Ember from 'ember';

export default Ember.Controller.extend({
  collapsed1: true,
  notCollapsed1: Ember.computed.not('collapsed1'),

  collapsed2: true,
  notCollapsed2: Ember.computed.not('collapsed2'),

	actions: {
    toggle: function(choice) {
      this.toggleProperty('collapsed' + choice);
    }
  }
});
