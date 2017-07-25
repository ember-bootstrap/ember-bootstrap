import Ember from 'ember';

export default Ember.Controller.extend({

  blueprintDetailsCollapsed: true,

  actions: {
    toggleBlueprintDetails() {
      this.toggleProperty('blueprintDetailsCollapsed');
    }
  }
});
