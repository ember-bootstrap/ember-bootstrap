import Component from '@glimmer/component';

interface BsButtonSignature {
  Element: HTMLButtonElement;
  Args: {
    active?: boolean;
    block?: boolean;
    bubble?: boolean;
    buttonType?: 'button' | 'submit' | 'reset';
    defaultText?: string;
    fulfilledText?: string;
    icon?: string;
    iconActive?: string;
    iconInactive?: string;
    outline?: boolean;
    pendingText?: string;
    preventConcurrency?: boolean;
    rejectedText?: string;
    reset?: boolean;
    size?: 'lg' | 'sm' | null;
    type?: string;
    value?: unknown;
    onClick?: (e?: Event, value?: unknown) => Promise<void> | void;
  };
  Blocks: {
    default: [
      {
        isFulfilled: boolean;
        isPending: boolean;
        isRejected: boolean;
        isSettled: boolean;
      }
    ];
  };
}

export declare class BsButton extends Component<BsButtonSignature> {}

export default BsButton;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsButton: typeof BsButton;
    'bs-button': typeof BsButton;
  }
}
