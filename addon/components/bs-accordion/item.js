import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { not } from '@ember/object/computed';
import Component from '@ember/component';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import typeClass from 'ember-bootstrap/utils/cp/type-class';
import { macroCondition, getOwnConfig } from '@embroider/macros';
import { guidFor } from '@ember/object/internals';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**
 A collapsible/expandable item within an accordion

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionItem
 @namespace Components
 @extends Ember.Component
 @public
 */
@tagName('')
@deprecateSubclassing
export default class AccordionItem extends Component {
  /**
   * The title of the accordion item, displayed as a .panel-title element
   *
   * @property title
   * @type string
   * @public
   */
  @defaultValue
  title = null;

  /**
   * The value of the accordion item, which is used as the value of the `selected` property of the parent [Components.Accordion](Components.Accordion.html) component
   *
   * @property value
   * @public
   */
  value = guidFor(this);

  /**
   * @property selected
   * @private
   */
  @defaultValue
  selected = null;

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
  @(computed('value', 'selected').readOnly())
  get collapsed() {
    return this.value !== this.selected;
  }

  /**
   * @property active
   * @type boolean
   * @readonly
   * @private
   */
  @not('collapsed')
  active;

  /**
   * @property disabled
   * @type boolean
   * @public
   */
  @defaultValue
  disabled = false;

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
  @defaultValue
  type = 'default';

  @typeClass(macroCondition(getOwnConfig().isBS4) ? 'bg' : 'panel', 'type')
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
  onClick() {}
}
