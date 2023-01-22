import BsContextualHelp, { BsContextualHelpSignature } from './bs-contextual-help';

export type BsTooltipSignature = BsContextualHelpSignature;

export declare class BsTooltip extends BsContextualHelp<BsTooltipSignature> {}

export default BsTooltip;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    BsTooltip: typeof BsTooltip;
    'bs-tooltip': typeof BsTooltip;
  }
}
