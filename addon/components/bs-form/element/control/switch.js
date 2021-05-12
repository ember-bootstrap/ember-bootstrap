import { action } from '@ember/object';
import { tagName } from '@ember-decorators/component';
import Control from '../control';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**

 @class FormElementControlSwitch
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
@tagName('')
@deprecateSubclassing
export default class FormElementControlSwitch extends Control {
  @action
  handleClick(event) {
    this.onChange(event.target.checked);
  }
}
