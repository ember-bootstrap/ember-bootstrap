import Component from '@glimmer/component';
import { BsButtonType } from '../bs-button';

interface BsModalFooterSignature {
  Element: HTMLDivElement;
  Args: {
    closeTitle?: string;
    submitButtonType?: BsButtonType;
    submitDisabled?: boolean;
    submitTitle?: string;
    onClose?: (e?: Event) => void;
    onSubmit?: (e?: Event) => void;
  };
  Blocks: {
    default: [];
  };
}

export declare class BsModalFooter extends Component<BsModalFooterSignature> {}

export default BsModalFooter;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'bs-modal/footer': typeof BsModalFooter;
  }
}
