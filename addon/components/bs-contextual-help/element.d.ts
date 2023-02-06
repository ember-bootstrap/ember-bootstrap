import Component from '@glimmer/component';

export interface BsContextualHelpElementSignature {
  Element: HTMLDivElement;
  Args: {
    placement?: 'top' | 'bottom' | 'left' | 'right';
    fade?: boolean;
    showHelp?: boolean;
  };
  Blocks: {
    default: [];
  };
}

export declare class BsContextualHelpElement extends Component<BsContextualHelpElementSignature> {}

export default BsContextualHelpElement;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsContextualHelp::Element': typeof BsContextualHelpElement;
    'bs-contextual-help/element': typeof BsContextualHelpElement;
  }
}
