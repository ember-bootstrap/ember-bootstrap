import templateOnlyComponent from '@ember/component/template-only';

interface BsFormElementFeedbackIconSignature {
  Element: HTMLDivElement;
  Args: {
    show?: boolean;
    iconName?: string;
  };
  Blocks: {
    default: [];
  };
}

const BsFormElementFeedbackIcon = templateOnlyComponent<BsFormElementFeedbackIconSignature>();
export default BsFormElementFeedbackIcon;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::FeedbackIcon': typeof BsFormElementFeedbackIcon;
    'bs-form/element/feedback-icon': typeof BsFormElementFeedbackIcon;
  }
}
