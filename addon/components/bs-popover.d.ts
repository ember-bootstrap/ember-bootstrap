import BsContextualHelp, { BsContextualHelpSignature } from './bs-contextual-help';

export interface BsPopoverSignature {
  Args: {
    onShow?: (e?: Event) => void;
    onShown?: (e?: Event) => void;
    onHide?: (e?: Event) => void;
    onHidden?: (e?: Event) => void;
  };
}

export declare class BsPopover extends BsContextualHelp<BsContextualHelpSignature & BsPopoverSignature> {}

export default BsPopover;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsPopover: typeof BsPopover;
    'bs-popover': typeof BsPopover;
  }
}
