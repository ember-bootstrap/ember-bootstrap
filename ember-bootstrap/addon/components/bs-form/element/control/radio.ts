import Control, { type FormElementControlSignature } from '../control';
import type { ContentValue } from '@glint/template';
import { get } from '@ember/object';

export interface FormElementControlRadioSignature<OPTION_TYPE>
  extends FormElementControlSignature<OPTION_TYPE> {
  Args: FormElementControlSignature<OPTION_TYPE>['Args'] & {
    autofocus?: boolean;
    form?: string;
    inline?: boolean;
    optionLabelPath?: string;
    options?: OPTION_TYPE[];
    required?: boolean;
    tabindex?: number;
    title?: string;
  };
  Blocks: {
    default: [OPTION_TYPE, number];
  };
  Element: HTMLInputElement;
}

/**
 @class FormElementControlRadio
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default class FormElementControlRadio<OPTION_TYPE> extends Control<
  FormElementControlRadioSignature<OPTION_TYPE>,
  OPTION_TYPE
> {
  /**
   * @property inline
   * @type {Boolean}
   * @default false
   * @public
   */

  lableText = (option: OPTION_TYPE): ContentValue => {
    if (this.args.optionLabelPath) {
      return `${get(option, this.args.optionLabelPath)}`;
    } else {
      return `${option}`;
    }
  };
}
