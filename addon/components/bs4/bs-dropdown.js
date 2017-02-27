import DropDown from 'ember-bootstrap/components/base/bs-dropdown';

export default DropDown.extend({
  classNameBindings: ['isOpen:show', 'inNav:nav-item']
});
