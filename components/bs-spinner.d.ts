import { BsButtonType } from './bs-button';

import Component from '@glimmer/component';

interface BsSpinnerSignature {
  Element: HTMLDivElement;
  Args: {
    size?: 'sm' | string;
    spinnerType?: 'border' | 'grow';
    type?: BsButtonType;
  };
  Blocks: {
    default: [];
  };
}

export declare class BsSpinner extends Component<BsSpinnerSignature> {}

export default BsSpinner;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsSpinner: typeof BsSpinner;
    'bs-spinner': typeof BsSpinner;
  }
}
