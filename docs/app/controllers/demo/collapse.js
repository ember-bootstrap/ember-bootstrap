import { not } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  collapsed: true,
  notCollapsed: not('collapsed'),

  actions: {
    toggle() {
      this.toggleProperty('collapsed');
    },
  },
});
