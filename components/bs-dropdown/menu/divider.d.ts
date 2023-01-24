import Component from '@glimmer/component';

interface BsDropdownDividerSignature {
  Element: HTMLDivElement;
  Args: {};
  Blocks: {
    default: [];
  };
}

export declare class BsDropdownDivider extends Component<BsDropdownDividerSignature> {}

export default BsDropdownDivider;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsDropdown::Menu::Divider': typeof BsDropdownDivider;
    'bs-dropdown/menu/divider': typeof BsDropdownDivider;
  }
}
