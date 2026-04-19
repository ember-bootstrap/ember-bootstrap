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

{{! @glint-nocheck }}
<input
  type="checkbox"
  id={{@id}}
  disabled={{@disabled}}
  readonly={{@readonly}}
  aria-describedby={{@ariaDescribedBy}}
  checked={{@value}}
  class="{{if (macroCondition (macroGetOwnConfig "isBS4")) "custom-control-input" "form-check-input"}} {{this.formValidationClass}}"
  ...attributes
  {{on "click" this.handleClick}}
>
