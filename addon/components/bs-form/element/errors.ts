import templateOnlyComponent from '@ember/component/template-only';

export interface BsFormElementErrorsSignature {
  Element: HTMLDivElement;
  Args: {
    show?: boolean;
    showMultipleErrors?: boolean;
    messages?: Array<string | number | boolean>;
    onChange?: (value: unknown) => void;
  };
  Blocks: {
    default: [];
  };
}

const BsFormElementErrors = templateOnlyComponent<BsFormElementErrorsSignature>();
export default BsFormElementErrors;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::Errors': typeof BsFormElementErrors;
    'bs-form/element/errors': typeof BsFormElementErrors;
  }
}
