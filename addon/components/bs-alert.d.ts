import { BsButtonType } from './bs-button';

import Component from '@glimmer/component';

interface BsAlertSignature {
  Element: HTMLDivElement;
  Args: {
    dismissible?: boolean;
    fade?: boolean;
    fadeDuration?: number;
    type?: BsButtonType;
    visible?: boolean;
    onDismiss?: (e?: Event) => void;
    onDismissed?: (e?: Event) => void;
  };
  Blocks: {
    default: [];
    header: [];
    body: [];
  };
}

export declare class BsAlert extends Component<BsAlertSignature> {}

export default BsAlert;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsAlert: typeof BsAlert;
    'bs-alert': typeof BsAlert;
  }
}
