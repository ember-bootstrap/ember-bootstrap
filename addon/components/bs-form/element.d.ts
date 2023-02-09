import Component from '@glimmer/component';

interface BsFormElementSignature<T> {
  Element: HTMLDivElement;
  Args: {
    controlType?: 'text' | 'checkbox' | 'radio' | 'switch' | 'textarea' | string;
    customError?: string;
    customWarning?: string;
    doNotShowValidationForEventTargets?: string[] | null;
    formLayout?: 'vertical' | 'horizontal' | 'inline';
    help?: string;
    horizontalLabelGridClass?: string;
    invisibleLabel?: string;
    placeholder?: string;
    label?: string;
    model?: T;
    optionLabelPath?: string;
    options?: Array<unknown>;
    property?: string;
    required?: boolean;
    showMultipleErrors?: boolean;
    showValidationOn?: ('focusout' | 'change' | 'input') | Array<'focusout' | 'change' | 'input'>;
    size?: 'lg' | 'sm' | 'xs' | null;
    value?: unknown;
    onChange?: (value: unknown, model?: T, property?: string) => void;
  };
  Blocks: {
    default: [];
  };
}

export declare class BsFormElement<T> extends Component<BsFormElementSignature<T>> {}

export default BsFormElement;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element': typeof BsFormElement;
    'bs-form/element': typeof BsFormElement;
  }
}
