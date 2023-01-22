import BsDropdownButton from './bs-dropdown/button';
import BsDropdownMenu from './bs-dropdown/menu';
import BsDropdownToggle from './bs-dropdown/toggle';

import Component from '@glimmer/component';
import { WithBoundArgs } from '@glint/template';

interface BsDropdownSignature {
  Element: HTMLElement;
  Args: {
    closeOnMenuClick?: boolean;
    direction?: 'up' | 'down' | 'left' | 'right';
    htmlTag?: string;
    onHide?: (e?: Event, value?: unknown) => boolean;
    onShow?: (e?: Event, value?: unknown) => void;
    renderInPlace?: boolean;
  };
  Blocks: {
    default: [
      {
        toggle: typeof BsDropdownToggle;
        button: WithBoundArgs<
          typeof BsDropdownButton,
          | 'active'
          | 'block'
          | 'bubble'
          | 'defaultText'
          | 'fulfilledText'
          | 'icon'
          | 'iconActive'
          | 'iconInactive'
          | 'outline'
          | 'pendingText'
          | 'preventConcurrency'
          | 'rejectedText'
          | 'reset'
          | 'size'
          | 'type'
          | 'value'
        >;
        menu: typeof BsDropdownMenu;
        actions: BsDropdownActions;
      }
    ];
  };
}

export interface BsDropdownActions {
  toggleDropdown: (e?: Event) => void;
  openDropdown: (e?: Event) => void;
  closeDropdown: (e?: Event) => void;
}

export declare class BsDropdown extends Component<BsDropdownSignature> {}

export default BsDropdown;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsDropdown: typeof BsDropdown;
    'bs-dropdown': typeof BsDropdown;
  }
}
