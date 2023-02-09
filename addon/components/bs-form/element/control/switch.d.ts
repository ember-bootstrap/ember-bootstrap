import BsFormElementControl from '../control';

interface BsFormElementControlSwitchSignature {
  Element: HTMLInputElement;
  Args: {
    id?: string;
    value?: unknown;
    disabled?: boolean;
    readonly?: boolean;
    ariaDescribedBy?: string;
    checked?: unknown;
  };
  Blocks: undefined;
}

export declare class BsFormElementControlSwitch extends BsFormElementControl<BsFormElementControlSwitchSignature> {}

export default BsFormElementControlSwitch;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::Control::Switch': typeof BsFormElementControlSwitch;
    'bs-form/element/control/switch': typeof BsFormElementControlSwitch;
  }
}
