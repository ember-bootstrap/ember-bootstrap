interface BsFormElementErrorsSignature {
    Element: HTMLDivElement;
    Args: {
        show?: boolean;
        showMultipleErrors?: boolean;
        messages?: string | Array<string> | Array<unknown>;
        onChange?: (value: unknown) => void;
    };
    Blocks: {
        default: [];
    };
}
declare const BsFormElementErrors: import("@ember/component/template-only").TemplateOnlyComponent<BsFormElementErrorsSignature>;
export default BsFormElementErrors;
declare module '@glint/environment-ember-loose/registry' {
    export default interface Registry {
        'BsForm::Element::Errors': typeof BsFormElementErrors;
        'bs-form/element/errors': typeof BsFormElementErrors;
    }
}
//# sourceMappingURL=errors.d.ts.map