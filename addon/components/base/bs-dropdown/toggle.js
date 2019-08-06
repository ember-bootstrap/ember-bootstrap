import Component from '@ember/component';
import { computed } from '@ember/object';
import { schedule } from '@ember/runloop';

/**
 Anchor element that triggers the parent dropdown to open.
 Use [Components.DropdownButton](Components.DropdownButton.html) if you want a button instead of an anchor tag.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownToggle
 @namespace Components
 @extends Ember.Component
 @publicø
 */
export default Component.extend({
  classNames: ['dropdown-toggle'],
  ariaRole: 'button',

  /**
   * Defaults to a `<a>` tag. Change for other types of dropdown toggles.
   *
   * @property tagName
   * @type string
   * @default a
   * @public
   */
  tagName: 'a',

  attributeBindings: ['href'],

  /**
   * @property inNav
   * @type {boolean}
   * @private
   */
  inNav: false,

  /**
   * Computed property to generate a `href="#"` attribute when `tagName` is "a".
   *
   * @property href
   * @type string
   * @readonly
   * @private
   */
  href: computed('tagName', function() {
    if (this.get('tagName').toUpperCase() === 'A') {
      return '#';
    }
  }),

  /**
   * When clicking the toggle this action is called.
   *
   * @event onClick
   * @param {*} value
   * @public
   */
  onClick() {},

  click(e) {
    e.preventDefault();
    this.get('onClick')();
  },

  didReceiveAttrs() {
    this._super(...arguments);
    let dropdown = this.get('dropdown');
    if (dropdown) {
      schedule('actions', this, function() {
        if (!this.get('isDestroyed')) {
          dropdown.set('toggle', this);
        }
      });
    }
  }
});
