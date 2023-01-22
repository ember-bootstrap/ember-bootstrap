import Component from '@glimmer/component';
import templateOnlyComponent from '@ember/component/template-only';

interface BsFormElementLayoutVerticalCheckboxSignature {
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

const BsFormElementLayoutVerticalCheckbox = templateOnlyComponent<BsFormElementLayoutVerticalCheckboxSignature>();
export default BsFormElementLayoutVerticalCheckbox;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::Layout::Vertical::Checkbox': typeof BsFormElementLayoutVerticalCheckbox;
    'bs-form/element/layout/vertical/checkbox': typeof BsFormElementLayoutVerticalCheckbox;
  }
}
