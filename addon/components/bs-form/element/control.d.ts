import Component from '@glimmer/component';

export interface BsFormElementControlSignature {
  Element: HTMLDivElement;
  Args: {
    onChange?: (value: unknown) => void;
  };
  Blocks: {
    default: [];
  };
}

export declare class BsFormElementControl<T> extends Component<BsFormElementControlSignature & T> {}

export default BsFormElementControl;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::Control': typeof BsFormElementControl;
    'bs-form/element/control': typeof BsFormElementControl;
  }
}
