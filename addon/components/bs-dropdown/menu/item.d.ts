import Component from '@glimmer/component';

interface BsDropdownMenuItemSignature {
  Element: HTMLDivElement;
  Args: {};
  Blocks: {
    default: [];
  };
}

export declare class BsDropdownMenuItem extends Component<BsDropdownMenuItemSignature> {}

export default BsDropdownMenuItem;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsDropdown::Menu::Item': typeof BsDropdownMenuItem;
    'bs-dropdown/menu/item': typeof BsDropdownMenuItem;
  }
}
