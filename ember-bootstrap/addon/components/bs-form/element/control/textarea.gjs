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

{{! @glint-nocheck }}
<textarea
  id={{@id}}
  disabled={{@disabled}}
  readonly={{@readonly}}
  aria-describedby={{@ariaDescribedBy}}
  value={{@value}}
  class="form-control {{this.formValidationClass}}"
  ...attributes
  {{on "change" this.handleChange}}
  {{on "input" this.handleInput}}>
</textarea>