import { action } from '@ember/object';
import Control from '../control';

/**

 @class FormElementControlSwitch
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default class FormElementControlSwitch extends Control {
  @action
  handleClick(event) {
    this.args.onChange(event.target.checked);
  }
}
