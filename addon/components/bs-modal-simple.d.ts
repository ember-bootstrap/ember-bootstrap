import { BsModalSignature } from './bs-modal';

import Component from '@glimmer/component';

export interface BsModalSimpleSignature {
  Element: HTMLDivElement;
  Args: {
    closeButton?: boolean;
    closeTitle?: string;
    submitButtonType?: string;
    submitTitle?: string;
    title?: string;
  };
}

export declare class BsModalSimple extends Component<BsModalSignature & BsModalSimpleSignature> {}

export default BsModalSimple;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsModalSimple: typeof BsModalSimple;
    'bs-modal-simple': typeof BsModalSimple;
  }
}
