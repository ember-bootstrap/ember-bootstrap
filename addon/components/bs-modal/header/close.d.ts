import Component from '@glimmer/component';

interface BsModalHeaderCloseSignature {
  Element: HTMLButtonElement;
  Args: {
    onClick?: (e?: Event) => void;
  };
  Blocks: {
    default: [];
  };
}

export declare class BsModalHeaderClose extends Component<BsModalHeaderCloseSignature> {}

export default BsModalHeaderClose;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'bs-modal/header/close': typeof BsModalHeaderClose;
  }
}
