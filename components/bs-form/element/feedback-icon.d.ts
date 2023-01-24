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
declare const BsFormElementFeedbackIcon: import("@ember/component/template-only").TemplateOnlyComponent<BsFormElementFeedbackIconSignature>;
export default BsFormElementFeedbackIcon;
declare module '@glint/environment-ember-loose/registry' {
    export default interface Registry {
        'BsForm::Element::FeedbackIcon': typeof BsFormElementFeedbackIcon;
        'bs-form/element/feedback-icon': typeof BsFormElementFeedbackIcon;
    }
}
//# sourceMappingURL=feedback-icon.d.ts.map