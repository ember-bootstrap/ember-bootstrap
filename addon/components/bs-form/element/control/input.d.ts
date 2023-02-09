import BsFormElementControl from '../control';

interface BsFormElementControlInputSignature {
  Element: HTMLInputElement;
  Args: {
    id?: string;
    disabled?: boolean;
    readonly?: boolean;
    size?: 'lg' | 'sm' | 'xs' | null;
    ariaDescribedBy?: string;
    value?: unknown;
  };
  Blocks: undefined;
}

export declare class BsFormElementControlInput extends BsFormElementControl<BsFormElementControlInputSignature> {}

export default BsFormElementControlInput;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::Control::Input': typeof BsFormElementControlInput;
    'bs-form/element/control/input': typeof BsFormElementControlInput;
  }
}
