import ContextualHelpElement from '../bs-contextual-help/element';
import { getOwnConfig, macroCondition } from '@embroider/macros';

/**
 Internal component for popover's markup. Should not be used directly.

 @class PopoverElement
 @namespace Components
 @extends Components.ContextualHelpElement
 @private
 */
export default class PopoverElement extends ContextualHelpElement {
  /**
   * @property title
   * @type string
   * @public
   */

  arrowClass = macroCondition(getOwnConfig().isBS5) ? 'popover-arrow' : 'arrow';
  placementClassPrefix = 'bs-popover-';
  offset = [0, 8];
}
