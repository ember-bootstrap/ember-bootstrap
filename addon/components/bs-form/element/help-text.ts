import templateOnlyComponent from '@ember/component/template-only';

export interface BsFormElementHelpTextSignature {
  Element: HTMLDivElement;
  Args: {
    id?: string;
    text?: string;
  };
  Blocks: {
    default: [];
  };
}

const BsFormElementHelpText = templateOnlyComponent<BsFormElementHelpTextSignature>();
export default BsFormElementHelpText;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::HelpText': typeof BsFormElementHelpText;
    'bs-form/element/help-text': typeof BsFormElementHelpText;
  }
}
