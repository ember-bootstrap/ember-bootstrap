import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';
import SubComponent from 'ember-bootstrap/mixins/sub-component';

const { computed } = Ember;

/**
 A collapsible/expandable item within an accordion

 See [Components.Accordion](Components.Accordion.html) for examples.


 @class AccordionItem
 @namespace Components
 @extends Ember.Component
 @uses Mixins.TypeClass
 @uses Mixins.SubComponent
 @public
 */
export default Ember.Component.extend(TypeClass, SubComponent, {
  classNames: ['panel'],

  /**
   * @property classTypePrefix
   * @type String
   * @default 'panel'
   * @protected
   */
  classTypePrefix: 'panel',

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

  selected: computed.alias('parentView.selected'),

  collapsed: computed('value', 'selected', function() {
    return this.get('value') !== this.get('selected');
  }),
  active: computed.not('collapsed'),

  action: 'selected',

  actions: {
    toggleActive() {
      let value = this.get('value');
      let previous = this.get('selected');
      let active = this.get('active');
      if (!active) {
        this.set('selected', value);
        this.sendAction('action', value, previous);
      } else {
        this.set('selected', null);
        this.sendAction('action', null, previous);
      }
    }
  }

});
