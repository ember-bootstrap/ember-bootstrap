import BsFormElementControl from '../control';

interface BsFormElementControlCheckboxSignature {
  Element: HTMLInputElement;
  Args: {
    id?: string;
    disabled?: boolean;
    readonly?: boolean;
    ariaDescribedBy?: string;
    value?: unknown;
  };
  Blocks: undefined;
}

export declare class BsFormElementControlCheckbox extends BsFormElementControl<BsFormElementControlCheckboxSignature> {}

export default BsFormElementControlCheckbox;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::Control::Checkbox': typeof BsFormElementControlCheckbox;
    'bs-form/element/control/checkbox': typeof BsFormElementControlCheckbox;
  }
}
