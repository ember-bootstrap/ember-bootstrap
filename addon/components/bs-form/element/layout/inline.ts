import templateOnlyComponent from '@ember/component/template-only';
import Component from '@glimmer/component';
import { BsFormElementLabelSignature } from '../label';
import { BsFormElementErrorsSignature } from '../errors';
import { BsFormElementHelpTextSignature } from '../help-text';

interface BsFormElementLayoutInlineSignature {
  Element: HTMLElement | HTMLLabelElement;
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

const BsFormElementLayoutInline = templateOnlyComponent<BsFormElementLayoutInlineSignature>();
export default BsFormElementLayoutInline;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::Layout::Inline': typeof BsFormElementLayoutInline;
    'bs-form/element/layout/inline': typeof BsFormElementLayoutInline;
  }
}
