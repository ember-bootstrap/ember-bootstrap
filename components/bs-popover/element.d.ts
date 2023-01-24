import BsContextualHelpElement from '../bs-contextual-help/element';

export declare class BsPopoverElement extends BsContextualHelpElement {}

export default BsPopoverElement;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsPopoverElement: typeof BsPopoverElement;
    'bs-popover/element': typeof BsPopoverElement;
  }
}
