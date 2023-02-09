import BsContextualHelpElement from '../bs-contextual-help/element';

export declare class BsTooltipElement extends BsContextualHelpElement {}

export default BsTooltipElement;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'BsTooltip::Element': typeof BsTooltipElement;
    'bs-tooltip/element': typeof BsTooltipElement;
  }
}
