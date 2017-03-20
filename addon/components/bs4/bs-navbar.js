import Ember from 'ember';
import Navbar from 'ember-bootstrap/components/base/bs-navbar';

export default Navbar.extend({
  classNameBindings: ['breakpointClass', 'backgroundClass'],

  type: 'light',

  /**
   * Defines the responsive toggle breakpoint size. Options are the standard
   * two character Bootstrap size abbreviations. Used to set the `navbar-toggleable-*`
   * class.
   *
   * @property toggleBreakpoint
   * @type String
   * @default 'md'
   * @public
   */
  toggleBreakpoint: 'md',

  /**
   * Sets the background color for the navbar. Can be any color
   * in the set that composes the `bg-*` classes.
   *
   * @property backgroundColor
   * @type String
   * @default 'faded'
   * @public
   */
  backgroundColor: 'faded',

  breakpointClass: Ember.computed('toggleBreakpoint', function() {
    let toggleBreakpoint = this.get('toggleBreakpoint');

    return `navbar-toggleable-${toggleBreakpoint}`;
  }),

  backgroundClass: Ember.computed('backgroundColor', function() {
    let backgroundColor = this.get('backgroundColor');

    return `bg-${backgroundColor}`;
  }),

  _validPositions: ['fixed-top', 'fixed-bottom', 'sticky-top'],

  _positionPrefix: ''
});
