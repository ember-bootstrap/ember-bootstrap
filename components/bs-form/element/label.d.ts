import Component from '@glimmer/component';

interface BsFormElementLabelSignature {
  Element: HTMLDivElement;
  Args: {
    label?: string;
    invisibleLabel?: boolean;
    labelClass?: string;
    formElementId?: string;
    size?: 'sm' | 'lg' | string;
    formLayout?: 'horizontal' | 'vertical' | 'inline';
    controlType?: 'text' | 'checkbox' | 'switch' | 'textarea';
  };
  Blocks: {
    default: [];
  };
}

export declare class BsFormElementLabel extends Component<BsFormElementLabelSignature> {}

export default BsFormElementLabel;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsForm::Element::Label': typeof BsFormElementLabel;
    'bs-form/element/label': typeof BsFormElementLabel;
  }
}
