import Controller from '@ember/controller';

export default Controller.extend({
  modal: true,
  hasModal: false,

  actions: {
    addModal() {
      this.set('hasModal', true);
      this.set('modal', true);
    },
    removeModal() {
      this.set('hasModal', false);
    }
  }
});
