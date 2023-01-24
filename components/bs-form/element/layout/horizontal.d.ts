import Component from '@glimmer/component';
interface BsFormElementLayoutHorizontalSignature {
    Element: HTMLInputElement | HTMLLabelElement;
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
declare const BsFormElementLayoutHorizontal: import("@ember/component/template-only").TemplateOnlyComponent<BsFormElementLayoutHorizontalSignature>;
export default BsFormElementLayoutHorizontal;
declare module '@glint/environment-ember-loose/registry' {
    export default interface Registry {
        'BsForm::Element::Layout::Horizontal': typeof BsFormElementLayoutHorizontal;
        'bs-form/element/layout/horizontal': typeof BsFormElementLayoutHorizontal;
    }
}
//# sourceMappingURL=horizontal.d.ts.map