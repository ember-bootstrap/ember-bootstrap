import Component from '@glimmer/component';

interface BsModalBodySignature {
  Element: HTMLDivElement;
  Args: {};
  Blocks: {
    default: [];
  };
}

export declare class BsModalBody extends Component<BsModalBodySignature> {}

export default BsModalBody;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsModal::Body': typeof BsModalBody;
    'bs-modal/body': typeof BsModalBody;
  }
}
