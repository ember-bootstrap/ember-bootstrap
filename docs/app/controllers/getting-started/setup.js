import Controller from '@ember/controller';

export default Controller.extend({
  blueprintDetailsCollapsed: true,

  actions: {
    toggleBlueprintDetails() {
      this.toggleProperty('blueprintDetailsCollapsed');
    },
  },
});
