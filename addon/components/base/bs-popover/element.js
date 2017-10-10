import ContextualHelpElement from '../bs-contextual-help/element';
import { notEmpty } from '@ember/object/computed';
import layout from 'ember-bootstrap/templates/components/bs-popover/element';

/**
 Internal component for popover's markup. Should not be used directly.

 @class PopoverElement
 @namespace Components
 @extends Components.ContextualHelpElement
 @private
 */
export default ContextualHelpElement.extend({
  layout,

  /**
   * @property title
   * @type string
   * @public
   */
  title: undefined,

  /**
   * @property hasTitle
   * @type boolean
   * @private
   */
  hasTitle: notEmpty('title')
});
