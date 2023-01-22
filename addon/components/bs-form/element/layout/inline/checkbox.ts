import templateOnlyComponent from '@ember/component/template-only';
import Component from '@glimmer/component';

interface BsFormElementLayoutInlineCheckboxSignature {
  Element: HTMLDivElement;
  Args: {
    controlType?: string;
    labelComponent?: typeof Component<unknown>;
    errorsComponent?: typeof Component<unknown>;
    helpTextComponent?: typeof Component<unknown>;
  };
  Blocks: {
    default: [];
  };
}

const BsFormElementLayoutInlineCheckbox = templateOnlyComponent<BsFormElementLayoutInlineCheckboxSignature>();
export default BsFormElementLayoutInlineCheckbox;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::Layout::Inline::Checkbox': typeof BsFormElementLayoutInlineCheckbox;
    'bs-form/element/layout/inline/checkbox': typeof BsFormElementLayoutInlineCheckbox;
  }
}
