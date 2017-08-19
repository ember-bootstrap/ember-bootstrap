import { computed } from '@ember/object';
import Navbar from 'ember-bootstrap/components/base/bs-navbar';

export default Navbar.extend({
  classNameBindings: ['breakpointClass', 'backgroundClass'],

  type: computed('appliedType', {
    get() {
      return this.get('appliedType');
    },

    set(key, value) { // eslint-disable-line no-unused
      let newValue = (!value || value === 'default') ? 'light' : value;
      this.set('appliedType', newValue);
      return newValue;
    }
  }),

  appliedType: 'light',

  /**
   * Defines the responsive toggle breakpoint size. Options are the standard
   * two character Bootstrap size abbreviations. Used to set the `navbar-expand-*`
   * class.
   *
   * @property toggleBreakpoint
   * @type String
   * @default 'md'
   * @public
   */
  toggleBreakpoint: 'lg',

  /**
   * Sets the background color for the navbar. Can be any color
   * in the set that composes the `bg-*` classes.
   *
   * @property backgroundColor
   * @type String
   * @default 'light'
   * @public
   */
  backgroundColor: 'light',

  breakpointClass: computed('toggleBreakpoint', function() {
    let toggleBreakpoint = this.get('toggleBreakpoint');

    return `navbar-expand-${toggleBreakpoint}`;
  }),

  backgroundClass: computed('backgroundColor', function() {
    let backgroundColor = this.get('backgroundColor');

    return `bg-${backgroundColor}`;
  }),

  _validPositions: ['fixed-top', 'fixed-bottom', 'sticky-top'],

  _positionPrefix: ''
});
