import templateOnlyComponent from '@ember/component/template-only';
import Component from '@glimmer/component';

interface BsFormElementLayoutHorizontalCheckboxSignature {
  Element: HTMLDivElement;
  Args: {
    horizontalLabelGridClass?: string;
    controlType?: string;
    labelComponent?: typeof Component<unknown>;
    errorsComponent?: typeof Component<unknown>;
    helpTextComponent?: typeof Component<unknown>;
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
