import Component from '@glimmer/component';
interface BsFormElementLayoutInlineSignature {
    Element: HTMLElement | HTMLLabelElement;
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
declare const BsFormElementLayoutInline: import("@ember/component/template-only").TemplateOnlyComponent<BsFormElementLayoutInlineSignature>;
export default BsFormElementLayoutInline;
declare module '@glint/environment-ember-loose/registry' {
    export default interface Registry {
        'BsForm::Element::Layout::Inline': typeof BsFormElementLayoutInline;
        'bs-form/element/layout/inline': typeof BsFormElementLayoutInline;
    }
}
//# sourceMappingURL=inline.d.ts.map