import { BsButtonType } from '../bs-button';

import Component from '@glimmer/component';

interface BsListGroupItemSignature {
  Element: HTMLElement;
  Args: {
    type?: BsButtonType;
    actionable?: boolean;
    active?: boolean;
    disabled?: boolean;
  };
  Blocks: {
    default: [];
  };
}

export declare class BsListGroupItem extends Component<BsListGroupItemSignature> {}

export default BsListGroupItem;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsListGroupItem: typeof BsListGroupItem;
    'bs-list-group/item': typeof BsListGroupItem;
  }
}
