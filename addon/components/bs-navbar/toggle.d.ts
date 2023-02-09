import Component from '@glimmer/component';

interface BsNavbarToggleSignature {
  Element: HTMLButtonElement;
  Args: {
    onClick?: (e?: Event) => void;
  };
  Blocks: {
    default: [];
  };
}

export declare class BsNavbarToggle extends Component<BsNavbarToggleSignature> {}

export default BsNavbarToggle;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsNavbar::Toggle': typeof BsNavbarToggle;
    'bs-navbar/toggle': typeof BsNavbarToggle;
  }
}
