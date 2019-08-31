import classic from 'ember-classic-decorator';
import { classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { not, oneWay } from '@ember/object/computed';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-accordion/item';

/**
 A collapsible/expandable item within an accordion

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionItem
 @namespace Components
 @extends Ember.Component
 @public
 */
@classic
@templateLayout(layout)
@classNameBindings('disabled', 'typeClass')
export default class Item extends Component {
 /**
  * The title of the accordion item, displayed as a .panel-title element
  *
  * @property title
  * @type string
  * @public
  */
 title = null;

 /**
  * The value of the accordion item, which is used as the value of the `selected` property of the parent [Components.Accordion](Components.Accordion.html) component
  *
  * @property value
  * @public
  */
 @oneWay('elementId')
 value;

 /**
  * @property selected
  * @private
  */
 selected = null;

 /**
  * @property titleComponent
  * @type {String}
  * @private
  */
 titleComponent = 'bs-accordion/item/title';

 /**
  * @property bodyComponent
  * @type {String}
  * @private
  */
 bodyComponent = 'bs-accordion/item/body';

 /**
  * @property collapsed
  * @type boolean
  * @readonly
  * @private
  */
 @(computed('value', 'selected').readOnly())
 get collapsed() {
   return this.get('value') !== this.get('selected');
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
 type = 'default';

 /**
  * Reference to the parent `Components.Accordion` class.
  *
  * @property accordion
  * @private
  */
 accordion = null;

 /**
  * @event onClick
  * @public
  */
 onClick() {}
}
