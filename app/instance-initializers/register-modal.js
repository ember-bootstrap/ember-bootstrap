export default {
  name: 'register-modal',
  initialize: function(instance) {
	window.Bootstrap = {};
	window.Bootstrap.ModalManager = instance.container.lookup("service:bootstrap-modal-manager");
  }
};
