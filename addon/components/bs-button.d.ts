import Component from '@glimmer/component';

export type BsButtonType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

interface BsButtonSignature {
  Element: HTMLButtonElement;
  Args: {
    active?: boolean;
    block?: boolean;
    bubble?: boolean;
    buttonType?: 'button' | 'submit';
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
    size?: string;
    type?: BsButtonType;
    value?: unknown;
    onClick?: (e?: Event, value?: unknown) => void;
  };
  Blocks: {
    default: [
      {
        isFulfilled: boolean;
        isPending: boolean;
        isRejected: boolean;
        isSettled: boolean;
        actions: BsButtonActions;
      }
    ];
  };
}

export interface BsButtonActions {
  resetState: () => void;
  handleClick: (e: Event) => void;
}

export declare class BsButton extends Component<BsButtonSignature> {}

export default BsButton;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsButton: typeof BsButton;
    'bs-button': typeof BsButton;
  }
}
