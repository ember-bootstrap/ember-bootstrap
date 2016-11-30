import Ember from 'ember';
import layout from '../templates/components/bs-accordion';

const { K: noop } = Ember;

/**
 Bootstrap-style accordion group, with collapsible/expandable items.
 See http://getbootstrap.com/components/#btn-groups

 Use as a block level component with any number of yielded [Components.AccordionItem](Components.AccordionItem.html)
 components as children:

 ```handlebars
  {{#bs-accordion as |acc|}}
      {{#acc.item value=1 title="First item"}}
        <p>Lorem ipsum...</p>
      {{/acc.item}}
      {{#acc.item value=2 title="Second item"}}
        <p>Lorem ipsum...</p>
      {{/acc.item}}
      {{#acc.item value=3 title="Third item"}}
        <p>Lorem ipsum...</p>
      {{/acc.item}}
  {{/bs-accordion}}
 ```

 @class Accordion
 @namespace Components
 @extends Ember.Component
 @uses Mixins.ComponentParent
 @public
 */
export default Ember.Component.extend({
  layout,
  classNames: ['panel-group'],
  ariaRole: 'tablist',

  /**
   * The value of the currently selected accordion item
   *
   * @property selected
   * @public
   */
  selected: null,

  onChange: noop,

  actions: {
    change(newValue) {
      let oldValue = this.get('selected');
      if (oldValue === newValue) {
        newValue = null;
      }
      if (this.get('onChange')(newValue, oldValue) !== false) {
        this.set('selected', newValue);
      }
    }
  }

});
