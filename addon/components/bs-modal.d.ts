import BsModalBody from './bs-modal/body';
import BsModalFooter from './bs-modal/footer';
import BsModalHeader from './bs-modal/header';

import Component from '@glimmer/component';

export interface BsModalSignature {
  Element: HTMLDivElement;
  Args: {
    backdrop?: boolean;
    backdropClose?: boolean;
    backdropTransitionDuration?: number;
    fade?: boolean;
    fullscreen?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | null;
    keyboard?: boolean;
    open?: boolean;
    position?: 'top' | 'center';
    renderInPlace?: boolean;
    scrollable?: boolean;
    size?: 'lg' | 'sm' | null;
    transitionDuration?: number;
    onHidden?: (e: Event) => void;
    onHide?: (e: Event) => void;
    onShow?: (e: Event) => void;
    onShown?: (e: Event) => void;
    onSubmit?: (e: Event) => void;
  };
  Blocks: {
    default: [
      {
        header: typeof BsModalHeader;
        body: typeof BsModalBody;
        footer: typeof BsModalFooter;
        close: (e?: Event) => void;
        submit: (e?: Event) => void;
      }
    ];
  };
}

export declare class BsModal extends Component<BsModalSignature> {}

export default BsModal;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsModal: typeof BsModal;
    'bs-modal': typeof BsModal;
  }
}
