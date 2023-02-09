import templateOnlyComponent from '@ember/component/template-only';
import Component from '@glimmer/component';
import { BsFormElementLabelSignature } from '../label';
import { BsFormElementHelpTextSignature } from '../help-text';
import { BsFormElementErrorsSignature } from '../errors';

interface BsFormElementLayoutVerticalSignature {
  Element: HTMLElement | HTMLLabelElement;
  Args: {
    hasLabel?: boolean;
    labelComponent?: typeof Component<BsFormElementLabelSignature>;
    errorsComponent?: typeof Component<BsFormElementErrorsSignature>;
    helpTextComponent?: typeof Component<BsFormElementHelpTextSignature>;
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
