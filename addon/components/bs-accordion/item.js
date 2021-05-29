import Component from '@glimmer/component';
import typeClass from 'ember-bootstrap/utils/cp/type-class';
import { getOwnConfig, macroCondition } from '@embroider/macros';
import { guidFor } from '@ember/object/internals';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';
import arg from '../../utils/decorators/arg';

/**
 A collapsible/expandable item within an accordion

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionItem
 @namespace Components
 @extends Ember.Component
 @public
 */
@deprecateSubclassing
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

  @typeClass(macroCondition(getOwnConfig().isNotBS3) ? 'bg' : 'panel', 'type')
  typeClass;

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
