import templateOnlyComponent from '@ember/component/template-only';
import Component from '@glimmer/component';
import { BsFormElementLabelSignature } from '../../label';
import { BsFormElementErrorsSignature } from '../../errors';
import { BsFormElementHelpTextSignature } from '../../help-text';

interface BsFormElementLayoutHorizontalCheckboxSignature {
  Element: HTMLDivElement;
  Args: {
    horizontalLabelGridClass?: string;
    controlType?: string;
    labelComponent?: typeof Component<BsFormElementLabelSignature>;
    errorsComponent?: typeof Component<BsFormElementErrorsSignature>;
    helpTextComponent?: typeof Component<BsFormElementHelpTextSignature>;
  };
  Blocks: {
    default: [];
  };
}

const BsFormElementLayoutHorizontalCheckbox = templateOnlyComponent<BsFormElementLayoutHorizontalCheckboxSignature>();
export default BsFormElementLayoutHorizontalCheckbox;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::Layout::Horizontal::Checkbox': typeof BsFormElementLayoutHorizontalCheckbox;
    'bs-form/element/layout/horizontal/checkbox': typeof BsFormElementLayoutHorizontalCheckbox;
  }
}
