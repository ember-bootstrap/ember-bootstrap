import Button from 'ember-bootstrap/components/bs-button';
import { layout as templateLayout } from '@ember-decorators/component';
import layout from 'ember-bootstrap/templates/components/bs-dropdown/button';
import { computed, action } from '@ember/object';

/**
 Button component with that can act as a dropdown toggler.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownButton
 @namespace Components
 @extends Components.Button
 @public
 */
@templateLayout(layout)
export default class DropdownButton extends Button {
  @action
  handleKeyDown(e) {
    this.onKeyDown(e);
  }

  @computed('isOpen')
   get ariaExpanded() {
    return this.isOpen ? 'true' : 'false';
  }
}
