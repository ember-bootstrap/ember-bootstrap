import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import arg from '../../utils/decorators/arg';

/**
 A collapsible/expandable item within an accordion

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionItem
 @namespace Components
 @extends Ember.Component
 @public
 */
export default class AccordionItem extends Component {
  /**
   * The title of the accordion item, displayed as a .panel-title element
   *
   * @property title
   * @type string
   * @public
   */

  /**
   * The value of the accordion item, which is used as the value of the `selected` property of the parent [Components.Accordion](Components.Accordion.html) component
   *
   * @property value
   * @public
   */
  @arg
  value = guidFor(this);

  /**
   * @property selected
   * @private
   */

  /**
   * @property titleComponent
   * @type {String}
   * @private
   */

  /**
   * @property bodyComponent
   * @type {String}
   * @private
   */

  /**
   * @property collapsed
   * @type boolean
   * @readonly
   * @private
   */
  get collapsed() {
    return this.value !== this.args.selected;
  }

  /**
   * @property disabled
   * @type boolean
   * @public
   */

  /**
   * Property for type styling
   *
   * For the available types see the [Bootstrap docs](https://getbootstrap.com/docs/4.3/components/navbar/#color-schemes)
   *
   * @property type
   * @type String
   * @default 'default'
   * @public
   */
  @arg
  type = 'default';

  get typeClass() {
    return `bg-${this.type}`;
  }

  /**
   * Reference to the parent `Components.Accordion` class.
   *
   * @property accordion
   * @private
   */

  /**
   * @event onClick
   * @public
   */
}
