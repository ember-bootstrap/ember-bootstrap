import templateOnlyComponent from '@ember/component/template-only';
import Component from '@glimmer/component';

interface BsFormElementLayoutHorizontalSignature {
  Element: HTMLInputElement | HTMLLabelElement;
  Args: {
    hasLabel?: boolean;
    labelComponent?: typeof Component<unknown>;
    labelClass?: string;
    horizontalLabelGridClass?: string;
    errorsComponent?: typeof Component<unknown>;
    helpTextComponent?: typeof Component<unknown>;
  };
  Blocks: {
    default: [];
  };
}

const BsFormElementLayoutHorizontal = templateOnlyComponent<BsFormElementLayoutHorizontalSignature>();
export default BsFormElementLayoutHorizontal;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::Layout::Horizontal': typeof BsFormElementLayoutHorizontal;
    'bs-form/element/layout/horizontal': typeof BsFormElementLayoutHorizontal;
  }
}
