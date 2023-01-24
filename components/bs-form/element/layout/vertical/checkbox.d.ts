import Component from '@glimmer/component';
interface BsFormElementLayoutVerticalCheckboxSignature {
    Element: HTMLDivElement;
    Args: {
        controlType?: string;
        labelComponent?: typeof Component<unknown>;
        errorsComponent?: typeof Component<unknown>;
        helpTextComponent?: typeof Component<unknown>;
    };
    Blocks: {
        default: [];
    };
}
declare const BsFormElementLayoutVerticalCheckbox: import("@ember/component/template-only").TemplateOnlyComponent<BsFormElementLayoutVerticalCheckboxSignature>;
export default BsFormElementLayoutVerticalCheckbox;
declare module '@glint/environment-ember-loose/registry' {
    export default interface Registry {
        'BsForm::Element::Layout::Vertical::Checkbox': typeof BsFormElementLayoutVerticalCheckbox;
        'bs-form/element/layout/vertical/checkbox': typeof BsFormElementLayoutVerticalCheckbox;
    }
}
//# sourceMappingURL=checkbox.d.ts.map