import BsNavbarContent from './bs-navbar/content';
import BsNav from './bs-navbar/nav';
import BsNavbarToggle from './bs-navbar/toggle';

import Component from '@glimmer/component';

interface BsNavbarSignature {
  Element: HTMLDivElement;
  Args: {
    backgroundColor?: string;
    collapsed?: boolean;
    container?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fluid';
    fluid?: boolean;
    position?: 'none' | 'fixed-top' | 'fixed-bottom' | 'sticky-top';
    toggleBreakpoint?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    type?: 'light' | 'dark';
    onCollapse?: (e?: Event) => void;
    onCollapsed?: (e?: Event) => void;
    onExpand?: (e?: Event) => void;
    onExpanded?: (e?: Event) => void;
  };
  Blocks: {
    default: [
      {
        content: typeof BsNavbarContent;
        toggle: typeof BsNavbarToggle;
        nav: typeof BsNav;
        actions: BsNavbarActions;
      }
    ];
  };
}

export interface BsNavbarActions {
  collapse: (e?: Event) => void;
  expand: (e?: Event) => void;
  toggleNavbar: (e?: Event) => void;
}

export declare class BsNavbar extends Component<BsNavbarSignature> {}

export default BsNavbar;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsNavbar: typeof BsNavbar;
    'bs-navbar': typeof BsNavbar;
  }
}
