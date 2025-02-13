import ContextualHelpElement, {
  type ContextualHelpElementSignature,
} from '../bs-contextual-help/element';
import { getOwnConfig, macroCondition } from '@embroider/macros';
import type { EmberBootstrapMacrosConfig } from 'macros-config';

type BsTooltipElementSignature = ContextualHelpElementSignature & {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
};

/**
 Internal component for tooltip's markup. Should not be used directly.

 @class TooltipElement
 @namespace Components
 @extends Components.ContextualHelpElement
 @private
 */
export default class TooltipElement extends ContextualHelpElement<BsTooltipElementSignature> {
  arrowClass = macroCondition(getOwnConfig<EmberBootstrapMacrosConfig>().isBS4)
    ? 'arrow'
    : 'tooltip-arrow';
  placementClassPrefix = 'bs-tooltip-';
  offset = [0, 6];
}
