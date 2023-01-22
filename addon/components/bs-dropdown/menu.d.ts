import BsLinkTo from '../bs-link-to';
import BsDropdownDivider from './menu/divider';
import BsDropdownItem from './menu/item';

import Component from '@glimmer/component';
import { WithBoundArgs } from '@glint/template';

interface BsDropdownMenuSignature {
  Element: HTMLDivElement;
  Args: {
    align?: 'left' | 'right';
    renderInPlace?: boolean;
  };
  Blocks: {
    default: [
      {
        item: typeof BsDropdownItem;
        'link-to': WithBoundArgs<typeof BsLinkTo, 'route' | 'model' | 'models' | 'query' | 'disabled'>;
        linkTo: WithBoundArgs<typeof BsLinkTo, 'route' | 'model' | 'models' | 'query' | 'disabled'>;
        divider: typeof BsDropdownDivider;
      }
    ];
  };
}

export declare class BsDropdownMenu extends Component<BsDropdownMenuSignature> {}

export default BsDropdownMenu;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsDropdown::Menu': typeof BsDropdownMenu;
    'bs-dropdown/menu': typeof BsDropdownMenu;
  }
}
