import { action } from '@ember/object';
import Control, { type FormElementControlSignature } from '../control';

export interface FormElementControlSwitchSignature
  extends FormElementControlSignature<boolean> {
  Args: FormElementControlSignature<boolean>['Args'];
  Element: HTMLInputElement;
}

/**
 @class FormElementControlSwitch
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default class FormElementControlSwitch extends Control<
  FormElementControlSwitchSignature,
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
