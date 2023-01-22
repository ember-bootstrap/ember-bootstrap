import Component from '@glimmer/component';

interface BsDropdownToggleSignature {
  Element: HTMLAnchorElement;
  Args: {
    onClick?: (e?: Event) => void;
  };
  Blocks: {
    default: [];
  };
}

export declare class BsDropdownToggle extends Component<BsDropdownToggleSignature> {}

export default BsDropdownToggle;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsDropdown::Toggle': typeof BsDropdownToggle;
    'bs-dropdown/toggle': typeof BsDropdownToggle;
  }
}
