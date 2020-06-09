import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-accordion/item/body';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**
 Component for an accordion item body.

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionItemBody
 @namespace Components
 @extends Ember.Component
 @public
 */
@templateLayout(layout)
@tagName('')
@deprecateSubclassing
export default class AccordionItemBody extends Component {
  /**
   * @property collapsed
   * @type boolean
   * @public
   */
}
