import { oneWay, not } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';
import TypeClass from 'ember-bootstrap/mixins/type-class';
import layout from 'ember-bootstrap/templates/components/bs-accordion/item';

/**
 A collapsible/expandable item within an accordion

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionItem
 @namespace Components
 @extends Ember.Component
 @uses Mixins.TypeClass
 @public
 */
export default Component.extend(TypeClass, {
  layout,

  /**
   * Add additional binding to mark the entire component area disabled
   */
  classNameBindings: ['disabled'],
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
  value: oneWay('elementId'),

  /**
   * @property selected
   * @private
   */
  selected: null,

  /**
   * @property titleComponent
   * @type {String}
   * @private
   */
  titleComponent: 'bs-accordion/item/title',

  /**
   * @property bodyComponent
   * @type {String}
   * @private
   */
  bodyComponent: 'bs-accordion/item/body',

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
  active: not('collapsed'),

  /**
   * @property disabled
   * @type boolean
   * @public
   */
  disabled: false,

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
