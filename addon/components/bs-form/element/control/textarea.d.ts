import BsFormElementControl from '../control';

interface BsFormElementControlTextareaSignature {
  Element: HTMLTextAreaElement;
  Args: {
    id?: string;
    value?: unknown;
    disabled?: boolean;
    readonly?: boolean;
    ariaDescribedBy?: string;
  };
  Blocks: undefined;
}

export declare class BsFormElementControlTextarea extends BsFormElementControl<BsFormElementControlTextareaSignature> {}

export default BsFormElementControlTextarea;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::Control::Textarea': typeof BsFormElementControlTextarea;
    'bs-form/element/control/switch': typeof BsFormElementControlTextarea;
  }
}
