import BsButton from '../bs-button';

export declare class BsDropdownButton extends BsButton {}

export default BsDropdownButton;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsDropdown::Button': typeof BsDropdownButton;
    'bs-dropdown/button': typeof BsDropdownButton;
  }
}
