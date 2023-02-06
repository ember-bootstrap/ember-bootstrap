import BsButton from './bs-button';
import BsFormElement from './bs-form/element';

import Component from '@glimmer/component';

interface BsFormSignature<T> {
  Element: HTMLDivElement;
  Args: {
    disabled?: boolean;
    formLayout?: 'vertical' | 'horizontal' | 'inline';
    hideValidationsOnSubmit?: boolean;
    horizontalLabelGridClass?: string;
    model?: T;
    preventConcurrency?: boolean;
    readonly?: boolean;
    submitOnEnter?: boolean;
    onBefore?: (model: T) => void;
    onInvalid?: (model: T, error: unknown) => void;
    onSubmit?: (model: T, result: unknown) => Promise<void> | void;
  };
  Blocks: {
    default: [
      {
        element: typeof BsFormElement;
        submitButton: typeof BsButton;
      }
    ];
  };
}

export declare class BsForm<T> extends Component<BsFormSignature<T>> {}

export default BsForm;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsForm: typeof BsForm;
    'bs-form': typeof BsForm;
  }
}
