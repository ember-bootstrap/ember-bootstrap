import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import { layout as templateLayout } from '@ember-decorators/component';
import layout from 'ember-bootstrap/templates/components/bs-dropdown/toggle';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import { computed, action } from '@ember/object';

/**
 Anchor element that triggers the parent dropdown to open.
 Use [Components.DropdownButton](Components.DropdownButton.html) if you want a button instead of an anchor tag.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownToggle
 @namespace Components
 @extends Ember.Component
 @publicø
 */
@tagName('')
@templateLayout(layout)
export default class DropdownToggle extends Component {
  /**
   * @property inNav
   * @type {boolean}
   * @private
   */
  @defaultValue
  inNav = false;

  @computed('isOpen')
  get 'aria-expanded'() {
    return this.isOpen ? 'true' : 'false';
  }

  /**
   * When clicking the toggle this action is called.
   *
   * @event onClick
   * @param {*} value
   * @public
   */
  onClick() {}

  @action
  handleClick(e) {
    e.preventDefault();
    this.onClick();
  }

  @action
  handleKeyDown(e) {
    this.onKeyDown(e);
  }
}
