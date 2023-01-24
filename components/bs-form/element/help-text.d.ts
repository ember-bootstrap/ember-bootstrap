interface BsFormElementHelpTextSignature {
    Element: HTMLDivElement;
    Args: {
        id?: string;
        text?: string;
    };
    Blocks: {
        default: [];
    };
}
declare const BsFormElementHelpText: import("@ember/component/template-only").TemplateOnlyComponent<BsFormElementHelpTextSignature>;
export default BsFormElementHelpText;
declare module '@glint/environment-ember-loose/registry' {
    export default interface Registry {
        'BsForm::Element::HelpText': typeof BsFormElementHelpText;
        'bs-form/element/help-text': typeof BsFormElementHelpText;
    }
}
//# sourceMappingURL=help-text.d.ts.map