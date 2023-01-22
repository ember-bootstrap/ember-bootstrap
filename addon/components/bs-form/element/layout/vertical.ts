import templateOnlyComponent from '@ember/component/template-only';
import Component from '@glimmer/component';

interface BsFormElementLayoutVerticalSignature {
  Element: HTMLElement | HTMLLabelElement;
  Args: {
    hasLabel?: boolean;
    labelComponent?: typeof Component<unknown>;
    errorsComponent?: typeof Component<unknown>;
    helpTextComponent?: typeof Component<unknown>;
  };
  Blocks: {
    default: [];
  };
}

const BsFormElementLayoutVertical = templateOnlyComponent<BsFormElementLayoutVerticalSignature>();
export default BsFormElementLayoutVertical;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::Layout::Vertical': typeof BsFormElementLayoutVertical;
    'bs-form/element/layout/vertical': typeof BsFormElementLayoutVertical;
  }
}
