import ContextualHelpElement from '../bs-contextual-help/element';
import { getOwnConfig, macroCondition } from '@embroider/macros';

/**
 Internal component for tooltip's markup. Should not be used directly.

 @class TooltipElement
 @namespace Components
 @extends Components.ContextualHelpElement
 @private
 */
export default class TooltipElement extends ContextualHelpElement {
  arrowClass = macroCondition(getOwnConfig().isBS3) ? 'tooltip-arrow' : 'arrow';
}
