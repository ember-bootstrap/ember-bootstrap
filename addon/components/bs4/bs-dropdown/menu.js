import DropdownMenu from 'ember-bootstrap/components/base/bs-dropdown/menu';

export default DropdownMenu.extend({
  tagName: 'div',
  classNameBindings: ['isOpen:show'],

  isOpen: false
});
