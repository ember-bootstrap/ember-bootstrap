import Component from '@glimmer/component';

interface BsNavItemSignature {
  Element: HTMLLIElement;
  Args: {
    active?: boolean;
    disabled?: boolean;
    onClick?: (e?: Event) => void;
  };
  Blocks: {
    default: [];
  };
}

export declare class BsNavItem extends Component<BsNavItemSignature> {}

export default BsNavItem;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsNav::Item': typeof BsNavItem;
    'bs-nav/item': typeof BsNavItem;
  }
}
