import BsDropdown from './bs-dropdown';
import BsLinkTo from './bs-link-to';
import BsNavItem from './bs-nav/item';

import Component from '@glimmer/component';

export interface BsNavSignature {
  Element: HTMLDivElement;
  Args: {
    fill?: boolean;
    justified?: boolean;
    stacked?: boolean;
    type?: 'pills' | 'tabs';
  };
  Blocks: {
    default: [
      {
        item: typeof BsNavItem;
        dropdown: typeof BsDropdown;
        linkTo: typeof BsLinkTo;
        'link-to': typeof BsLinkTo;
      }
    ];
  };
}

export declare class BsNav extends Component<BsNavSignature> {}

export default BsNav;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsNav: typeof BsNav;
    'bs-nav': typeof BsNav;
  }
}
