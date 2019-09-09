import { attributeBindings, classNames, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import { schedule } from '@ember/runloop';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

/**
 Anchor element that triggers the parent dropdown to open.
 Use [Components.DropdownButton](Components.DropdownButton.html) if you want a button instead of an anchor tag.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownToggle
 @namespace Components
 @extends Ember.Component
 @publicø
 */
@classNames('dropdown-toggle')
@tagName('a')
@attributeBindings('href')
export default class DropdownToggle extends Component {
  ariaRole = 'button';

  /**
   * @property inNav
   * @type {boolean}
   * @private
   */
  @defaultValue
  inNav = false;

  /**
   * Computed property to generate a `href="#"` attribute when `tagName` is "a".
   *
   * @property href
   * @type string
   * @readonly
   * @private
   */
  get href() {
    return this.get('tagName').toUpperCase() === 'A' ? '#' : undefined;
  }

  /**
   * When clicking the toggle this action is called.
   *
   * @event onClick
   * @param {*} value
   * @public
   */
  onClick() {}

  click(e) {
    e.preventDefault();
    this.get('onClick')();
  }

  didReceiveAttrs() {
    // super.didReceiveAttrs(...arguments);
    let dropdown = this.get('dropdown');
    if (dropdown) {
      schedule('actions', this, function() {
        if (!this.get('isDestroyed')) {
          dropdown.set('toggle', this);
        }
      });
    }
  }
}
