import { computed } from '@ember/object';
import Navbar from 'ember-bootstrap/components/base/bs-navbar';
import { isBlank } from '@ember/utils';

export default Navbar.extend({
  classNameBindings: ['breakpointClass', 'backgroundClass'],

  type: computed('appliedType', {
    get() {
      return this.get('appliedType');
    },

    set(key, value) {
      let newValue = (!value || value === 'default') ? 'light' : value;
      this.set('appliedType', newValue);
      return newValue;
    }
  }),

  appliedType: 'light',

  /**
   * Defines the responsive toggle breakpoint size. Options are the standard
   * two character Bootstrap size abbreviations. Used to set the `navbar-expand[-*]`
   * class. Set to `null` to disable collapsing.
   *
   * @property toggleBreakpoint
   * @type String
   * @default 'lg'
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

    if (isBlank(toggleBreakpoint)) {
      return 'navbar-expand';
    } else {
      return `navbar-expand-${toggleBreakpoint}`;
    }
  }),

  backgroundClass: computed('backgroundColor', function() {
    let backgroundColor = this.get('backgroundColor');

    return `bg-${backgroundColor}`;
  }),

  _validPositions: null,

  _positionPrefix: '',

  init() {
    this._super(...arguments);
    this.set('_validPositions', ['fixed-top', 'fixed-bottom', 'sticky-top']);
  }
});
