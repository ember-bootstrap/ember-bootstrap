import layout from 'ember-bootstrap/templates/components/bs-tooltip/element';
import ContextualHelpElement from '../bs-contextual-help/element';

/**
 Internal component for tooltip's markup. Should not be used directly.

 @class TooltipElement
 @namespace Components
 @extends Components.ContextualHelpElement
 @private
 */
export default ContextualHelpElement.extend({
  layout,

  /**
   * @property arrowClass
   * @private
   */
  arrowClass: 'tooltip-arrow'
});
