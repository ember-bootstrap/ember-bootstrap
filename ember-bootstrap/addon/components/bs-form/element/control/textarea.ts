import { action } from '@ember/object';
import Control, { type FormElementControlSignature } from '../control';

export interface FormElementControlTextAreaSignature
  extends FormElementControlSignature<string> {
  Args: FormElementControlSignature<string>['Args'] & {
    type?: string;
    size?: 'lg' | 'sm';
  };
  Element: HTMLTextAreaElement;
}

/**

 @class FormElementControlTextarea
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default class FormElementControlTextarea extends Control<
  FormElementControlTextAreaSignature,
  string
> {
  @action
  handleChange(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }
    this.args.onChange(event.target.value);
  }

  @action
  handleInput(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }
    this.args.onChange(event.target.value);
  }
}
