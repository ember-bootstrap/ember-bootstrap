import { BsButtonType } from '../bs-button';

import Component from '@glimmer/component';

interface BsProgressBarSignature {
  Element: HTMLDivElement;
  Args: {
    animate?: boolean;
    maxValue?: number;
    minValue?: number;
    roundDigits?: number;
    showLabel?: boolean;
    striped?: boolean;
    type?: BsButtonType;
    value?: number;
  };
  Blocks: {
    default: [];
  };
}

export declare class BsProgressBar extends Component<BsProgressBarSignature> {}

export default BsProgressBar;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsProgress::Bar': typeof BsProgressBar;
    'bs-progress/bar': typeof BsProgressBar;
  }
}
