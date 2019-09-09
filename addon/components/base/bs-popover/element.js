import { layout as templateLayout } from '@ember-decorators/component';
import { notEmpty } from '@ember/object/computed';
import ContextualHelpElement from '../bs-contextual-help/element';
import layout from 'ember-bootstrap/templates/components/bs-popover/element';

/**
 Internal component for popover's markup. Should not be used directly.

 @class PopoverElement
 @namespace Components
 @extends Components.ContextualHelpElement
 @private
 */
@templateLayout(layout)
export default class PopoverElement extends ContextualHelpElement {
  /**
   * @property title
   * @type string
   * @public
   */

  /**
   * @property hasTitle
   * @type boolean
   * @private
   */
  @notEmpty('title')
  hasTitle;
}
