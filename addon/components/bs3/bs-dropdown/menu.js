import DropdownMenu from 'ember-bootstrap/components/base/bs-dropdown/menu';

export default DropdownMenu.extend({
  tagName: 'ul',

  classNames: ['dropdown-menu'],
  classNameBindings: ['alignClass']
});
