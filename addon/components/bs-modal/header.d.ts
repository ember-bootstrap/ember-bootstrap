import BsModalHeaderClose from './header/close';
import BsModalHeaderTitle from './header/title';

import Component from '@glimmer/component';

interface BsModalHeaderSignature {
  Element: HTMLDivElement;
  Args: {
    closeButton?: boolean;
    title?: string;
    onClose?: (e?: Event) => void;
  };
  Blocks: {
    default: [
      {
        title: typeof BsModalHeaderTitle;
        close: typeof BsModalHeaderClose;
      }
    ];
  };
}

export declare class BsModalHeader extends Component<BsModalHeaderSignature> {}

export default BsModalHeader;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsModal::Header': typeof BsModalHeader;
    'bs-modal/header': typeof BsModalHeader;
  }
}
