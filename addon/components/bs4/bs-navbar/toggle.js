import Ember from 'ember';
import NavbarToggle from 'ember-bootstrap/components/base/bs-navbar/toggle';

const { computed } = Ember;

export default NavbarToggle.extend({
  classNames: ['navbar-toggler'],
  classNameBindings: ['alignmentClass'],

  /**
   * Defines the alignment of the toggler. Valid values are 'left' and 'right'
   * to set the `navbar-toggler-*` class.
   *
   * @property align
   * @type String
   * @default null
   * @public
   */
  align: null,

  alignmentClass: computed('align', function() {
    let align = this.get('align');

    if (align) {
      return `navbar-toggler-${align}`;
    }
  }).readOnly()
});
