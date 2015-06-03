export default {
  name: 'register-modal',
  initialize: function(instance) {
	window.Boostrap = {};
	window.Boostrap.ModalManager = instance.container.lookup("service:bootstrap-modal-manager");
  }
};
