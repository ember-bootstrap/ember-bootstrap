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

{{! @glint-nocheck }}
<input
  type="checkbox"
  id={{@id}}
  disabled={{@disabled}}
  readonly={{@readonly}}
  aria-describedby={{@ariaDescribedBy}}
  checked={{@value}}
  class="form-check-input {{this.formValidationClass}}"
  ...attributes
  {{on "click" this.handleClick}}
>

