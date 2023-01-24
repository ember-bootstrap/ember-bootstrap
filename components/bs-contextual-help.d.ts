import Component from '@glimmer/component';

export interface BsContextualHelpSignature {
  Element: HTMLDivElement;
  Args: {
    title?: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    autoPlacement?: boolean;
    visible?: boolean;
    fade?: boolean;
    delay?: number;
    delayShow?: number;
    delayHide?: number;
    transitionDuration?: number;
    viewportSelector?: string;
    viewportPadding?: number;
    triggerElement?: string;
    triggerEvents?: string | Array<'click' | 'hover' | 'focus'>;
  };
  Blocks: {
    default: [
      {
        actions: BsContextualHelpActions;
      }
    ];
  };
}

export interface BsContextualHelpActions {
  close: (e?: Event) => void;
}

export declare class BsContextualHelp<T extends BsContextualHelpSignature> extends Component<T> {}

export default BsContextualHelp;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsContextualHelp: typeof BsContextualHelp;
    'bs-contextual-help': typeof BsContextualHelp;
  }
}
