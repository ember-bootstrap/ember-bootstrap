import templateOnlyComponent from '@ember/component/template-only';
import Component from '@glimmer/component';
import { BsFormElementLabelSignature } from '../../label';
import { BsFormElementErrorsSignature } from '../../errors';
import { BsFormElementHelpTextSignature } from '../../help-text';

interface BsFormElementLayoutInlineCheckboxSignature {
  Element: HTMLDivElement;
  Args: {
    controlType?: string;
    labelComponent?: typeof Component<BsFormElementLabelSignature>;
    errorsComponent?: typeof Component<BsFormElementErrorsSignature>;
    helpTextComponent?: typeof Component<BsFormElementHelpTextSignature>;
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
