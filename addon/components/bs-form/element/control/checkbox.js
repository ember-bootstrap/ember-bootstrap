import { action } from '@ember/object';
import { tagName } from '@ember-decorators/component';
import Control from '../control';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**

 @class FormElementControlCheckbox
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
@tagName('')
@deprecateSubclassing
export default class FormElementControlCheckbox extends Control {
  @action
  handleClick(event) {
    this.onChange(event.target.checked);
  }
}
