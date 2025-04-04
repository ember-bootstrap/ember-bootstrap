import { action } from '@ember/object';
import Control, { type FormElementControlSignature } from '../control';
import sizeClass from '../../../../utils/size-class';

export interface FormElementControlInputSignature
  extends FormElementControlSignature<string> {
  Args: FormElementControlSignature<string>['Args'] & {
    type?: string;
    size?: 'lg' | 'sm';
  };
  Element: HTMLInputElement;
}

/**
 @class FormElementControlInput
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default class FormElementControlInput extends Control<
  FormElementControlInputSignature,
  string
> {
  /**
   * @property type
   * @type {String}
   * @public
   */

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

  /**
   * Property for size styling, set to 'lg' or 'sm'
   *
   * Also see the docs for [Bootstrap 4](https://getbootstrap.com/docs/4.3/components/forms/#sizing)
   * and [Bootstrap 5](https://getbootstrap.com/docs/5.3/forms/form-control/#sizing)
   *
   * @property size
   * @type String
   * @public
   */

  get sizeClass() {
    return sizeClass('form-control', this.args.size);
  }
}
