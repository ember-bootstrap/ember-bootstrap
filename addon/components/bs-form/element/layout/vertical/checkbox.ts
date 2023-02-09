import Component from '@glimmer/component';
import templateOnlyComponent from '@ember/component/template-only';
import { BsFormElementLabelSignature } from '../../label';
import { BsFormElementErrorsSignature } from '../../errors';
import { BsFormElementHelpTextSignature } from '../../help-text';

interface BsFormElementLayoutVerticalCheckboxSignature {
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

const BsFormElementLayoutVerticalCheckbox = templateOnlyComponent<BsFormElementLayoutVerticalCheckboxSignature>();
export default BsFormElementLayoutVerticalCheckbox;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::Layout::Vertical::Checkbox': typeof BsFormElementLayoutVerticalCheckbox;
    'bs-form/element/layout/vertical/checkbox': typeof BsFormElementLayoutVerticalCheckbox;
  }
}
