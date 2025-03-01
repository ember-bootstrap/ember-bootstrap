/**
 Component for an accordion item body.

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionItemBody
 @namespace Components
 @extends Ember.Component
 @public
 */

/**
 * @property collapsed
 * @type boolean
 * @public
 */
import templateOnly from '@ember/component/template-only';

export interface BodySignature {
  Args: {
    collapsableId?: string;
    collapsed?: boolean;
    describedby?: string;
  };
  Blocks: {
    default: [];
  };
}

export default templateOnly<BodySignature>();
