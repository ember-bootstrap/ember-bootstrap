import BsFormElementControl from '../control';

interface BsFormElementControlRadioSignature {
  Element: HTMLInputElement;
  Args: {
    id?: string;
    options?: unknown[];
    optionLabelPath?: string;
    value?: unknown;
    inline?: boolean;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    autofocus?: boolean;
    tabindex?: number;
    form?: unknown;
    title?: string;
    ariaDescribedBy?: string;
  };
  Blocks: undefined;
}

export declare class BsFormElementControlRadio extends BsFormElementControl<BsFormElementControlRadioSignature> {}

export default BsFormElementControlRadio;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::Control::Radio': typeof BsFormElementControlRadio;
    'bs-form/element/control/radio': typeof BsFormElementControlRadio;
  }
}
