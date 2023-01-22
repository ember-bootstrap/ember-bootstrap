import Component from '@glimmer/component';

interface BsDropdownItemSignature {
  Element: HTMLDivElement;
  Args: {};
  Blocks: {
    default: [];
  };
}

export declare class BsDropdownItem extends Component<BsDropdownItemSignature> {}

export default BsDropdownItem;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsDropdown::Menu::Item': typeof BsDropdownItem;
    'bs-dropdown/menu/item': typeof BsDropdownItem;
  }
}
