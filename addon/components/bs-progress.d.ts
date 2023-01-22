import BsProgressBar from './bs-progress/bar';

import Component from '@glimmer/component';

interface BsProgressSignature {
  Element: HTMLDivElement;
  Args: {};
  Blocks: {
    default: [
      {
        bar: typeof BsProgressBar;
      }
    ];
  };
}

export declare class BsProgress extends Component<BsProgressSignature> {}

export default BsProgress;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsProgress: typeof BsProgress;
    'bs-progress': typeof BsProgress;
  }
}
