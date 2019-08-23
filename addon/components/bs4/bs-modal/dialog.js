import ModalDialog from 'ember-bootstrap/components/base/bs-modal/dialog';

export default ModalDialog.extend({
  classNameBindings: ['showModal:show', 'inDom:d-block'],
  centered: false
});
