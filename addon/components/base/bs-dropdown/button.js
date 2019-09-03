import { classNames } from '@ember-decorators/component';
import Button from 'ember-bootstrap/components/bs-button';
import { schedule } from '@ember/runloop';

/**
 Button component with that can act as a dropdown toggler.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownButton
 @namespace Components
 @extends Components.Button
 @public
 */
@classNames('dropdown-toggle')
export default class DropdownButton extends Button {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
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
