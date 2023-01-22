import templateOnlyComponent from '@ember/component/template-only';

interface BsFormElementErrorsSignature {
  Element: HTMLDivElement;
  Args: {
    show?: boolean;
    showMultipleErrors?: boolean;
    messages?: string | Array<string> | Array<unknown>;
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
