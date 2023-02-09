import templateOnlyComponent from '@ember/component/template-only';
import Component from '@glimmer/component';
import { BsFormElementLabelSignature } from '../label';
import { BsFormElementErrorsSignature } from '../errors';
import { BsFormElementHelpTextSignature } from '../help-text';

interface BsFormElementLayoutHorizontalSignature {
  Element: HTMLInputElement | HTMLLabelElement;
  Args: {
    hasLabel?: boolean;
    labelClass?: string;
    horizontalLabelGridClass?: string;
    labelComponent?: typeof Component<BsFormElementLabelSignature>;
    errorsComponent?: typeof Component<BsFormElementErrorsSignature>;
    helpTextComponent?: typeof Component<BsFormElementHelpTextSignature>;
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
