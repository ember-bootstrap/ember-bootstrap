import { action } from '@ember/object';
import Control from '../control';

/**

 @class FormElementControlTextarea
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default class FormElementControlTextarea extends Control {
  @action
  handleChange(event) {
    this.args.onChange(event.target.value);
  }

  @action
  handleInput(event) {
    this.args.onChange(event.target.value);
  }
}
