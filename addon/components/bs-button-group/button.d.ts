import BsButton from '../bs-button';

export declare class BsButtonGroupButton extends BsButton {}

export default BsButtonGroupButton;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsButtonGroupButton: typeof BsButtonGroupButton;
    'bs-button-group/button': typeof BsButtonGroupButton;
  }
}
