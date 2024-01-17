import { action } from '@ember/object';
import Control from '../control';

/**

 @class FormElementControlCheckbox
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default class FormElementControlCheckbox extends Control {
  @action
  handleClick(event) {
    this.args.onChange(event.target.checked);
  }
}
