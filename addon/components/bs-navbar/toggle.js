import Ember from 'ember';
import BsButtonComponent from 'ember-bootstrap/components/bs-button';
import layout from '../../templates/components/bs-navbar/toggle';

/**
 * Component to implement the responsive menu toggle behavior in a [Components.Navbar](Components.Navbar.html)
 * component. Have a look there for examples.
 *
 * @class NavbarToggle
 * @namespace Components
 * @extends Components.Button
 * @public
 */
export default BsButtonComponent.extend({
  layout,

  classNames: ['navbar-toggle', 'navbar-toggler'],
  classNameBindings: ['collapsed', 'togglerHiddenClass'],
  collapsed: true,

  togglerHiddenClass: Ember.computed('toggleBreak', function () {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    let breakpoint = this.getWithDefault('toggleBreak', 'md');

    let nextIndex = sizes.indexOf(breakpoint);
    let nextSize = 'lg';
    if (nextIndex > -1) {
      nextSize = sizes[Math.min(sizes.length - 1, nextIndex + 1)];
    }

    return `hidden-${nextSize}-up`;
  })
});
