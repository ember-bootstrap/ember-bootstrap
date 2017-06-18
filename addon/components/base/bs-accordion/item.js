import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';
import ComponentChild from 'ember-bootstrap/mixins/component-child';
import layout from 'ember-bootstrap/templates/components/bs-accordion/item';

const {
  computed
} = Ember;

/**
 A collapsible/expandable item within an accordion

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionItem
 @namespace Components
 @extends Ember.Component
 @uses Mixins.ComponentChild
 @uses Mixins.TypeClass
 @public
 */
export default Ember.Component.extend(ComponentChild, TypeClass, {
  layout,

  /**
   * The title of the accordion item, displayed as a .panel-title element
   *
   * @property title
   * @type string
   * @public
   */
  title: null,

  /**
   * The value of the accordion item, which is used as the value of the `selected` property of the parent [Components.Accordion](Components.Accordion.html) component
   *
   * @property value
   * @public
   */
  value: computed.oneWay('elementId'),

  /**
   * @property selected
   * @private
   */
  selected: null,

  /**
   * @property collapsed
   * @type boolean
   * @readonly
   * @private
   */
  collapsed: computed('value', 'selected', function() {
    return this.get('value') !== this.get('selected');
  }).readOnly(),

  /**
   * @property active
   * @type boolean
   * @readonly
   * @private
   */
  active: computed.not('collapsed'),

  /**
   * Reference to the parent `Components.Accordion` class.
   *
   * @property accordion
   * @private
   */
  accordion: null,

  /**
   * @event onClick
   * @public
   */
  onClick() {}

});
