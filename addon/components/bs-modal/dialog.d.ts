import { BsModalActions } from '../bs-modal';

import Component from '@glimmer/component';

interface BsModalDialogSignature {
  Element: HTMLDivElement;
  Args: {};
  Blocks: {
    default: [
      {
        actions: BsModalActions;
      }
    ];
  };
}

export declare class BsModalDialog extends Component<BsModalDialogSignature> {}

export default BsModalDialog;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsModal::Dialog': typeof BsModalDialog;
    'bs-modal/dialog': typeof BsModalDialog;
  }
}
