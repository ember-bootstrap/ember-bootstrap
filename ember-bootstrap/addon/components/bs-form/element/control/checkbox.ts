import { action } from '@ember/object';
import Control, { type FormElementControlSignature } from '../control';

export interface FormElementControlCheckboxSignature
  extends FormElementControlSignature<boolean> {
  Args: FormElementControlSignature<boolean>['Args'];
  Element: HTMLInputElement;
}

/**
 @class FormElementControlCheckbox
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default class FormElementControlCheckbox extends Control<
  FormElementControlCheckboxSignature,
  boolean
> {
  @action
  handleClick(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }
    this.args.onChange(event.target.checked);
  }
}
