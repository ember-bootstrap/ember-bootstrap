export function initialize(container, application) {
    window.Boostrap = {};
    window.Boostrap.ModalManager = container.lookup("service:bootstrap-modal-manager");
}

export default {
  name: 'register-modal',
  initialize: initialize
};
