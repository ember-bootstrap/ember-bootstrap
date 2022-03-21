import { action } from '@ember/object';
import Control from '../control';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**

 @class FormElementControlSwitch
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
@deprecateSubclassing
export default class FormElementControlSwitch extends Control {
  @action
  handleClick(event) {
    this.args.onChange(event.target.checked);
  }
}
