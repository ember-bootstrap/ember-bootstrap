import Component from '@glimmer/component';

interface BsDropdownMenuDividerSignature {
  Element: HTMLDivElement;
  Args: {};
  Blocks: {
    default: [];
  };
}

export declare class BsDropdownMenuDivider extends Component<BsDropdownMenuDividerSignature> {}

export default BsDropdownMenuDivider;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsDropdown::Menu::Divider': typeof BsDropdownMenuDivider;
    'bs-dropdown/menu/divider': typeof BsDropdownMenuDivider;
  }
}
