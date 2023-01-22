import BsListGroupItem from './bs-list-group/item';

import Component from '@glimmer/component';

interface BsListGroupSignature {
  Element: HTMLDivElement;
  Args: {
    numbered?: boolean;
    flush?: boolean;
    horizontal?: boolean;
    horizontalSize?: string;
  };
  Blocks: {
    default: [
      {
        item: typeof BsListGroupItem;
      }
    ];
  };
}

export declare class BsListGroup extends Component<BsListGroupSignature> {}

export default BsListGroup;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsListGroup: typeof BsListGroup;
    'bs-list-group': typeof BsListGroup;
  }
}
