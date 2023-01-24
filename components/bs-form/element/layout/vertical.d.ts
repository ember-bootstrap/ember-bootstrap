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
declare const BsFormElementLayoutVertical: import("@ember/component/template-only").TemplateOnlyComponent<BsFormElementLayoutVerticalSignature>;
export default BsFormElementLayoutVertical;
declare module '@glint/environment-ember-loose/registry' {
    export default interface Registry {
        'BsForm::Element::Layout::Vertical': typeof BsFormElementLayoutVertical;
        'bs-form/element/layout/vertical': typeof BsFormElementLayoutVertical;
    }
}
//# sourceMappingURL=vertical.d.ts.map