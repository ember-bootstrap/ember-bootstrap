import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-accordion';
import listenTo from 'ember-bootstrap/utils/listen-to-cp';

/**
 Bootstrap-style [accordion group](http://getbootstrap.com/javascript/#collapse-example-accordion),
 with collapsible/expandable items.

 ### Usage

 Use as a block level component with any number of yielded [Components.AccordionItem](Components.AccordionItem.html)
 components as children:

 ```handlebars
  {{#bs-accordion as |acc|}}
      {{#acc.item value=1 title="First item"}}
        <p>Lorem ipsum...</p>
        <button {{action acc.change 2}}>Next</button>
      {{/acc.item}}
      {{#acc.item value=2 title="Second item"}}
        <p>Lorem ipsum...</p>
      {{/acc.item}}
      {{#acc.item value=3 title="Third item"}}
        <p>Lorem ipsum...</p>
      {{/acc.item}}
  {{/bs-accordion}}
 ```

 In the example above the first accordion item utilizes the yielded `change` action to add some custom behaviour.

 @class Accordion
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Ember.Component.extend({
  layout,
  ariaRole: 'tablist',

  /**
   * The value of the currently selected accordion item. Set this to change selection programmatically.
   *
   * When the selection is changed by user interaction this property will not update by using two-way bindings in order
   * to follow DDAU best practices. If you want to react to such changes, subscribe to the `onChange` action
   *
   * @property selected
   * @public
   */
  selected: null,

  /**
   * The value of the currently selected accordion item
   *
   * @property isSelected
   * @private
   */
  isSelected: listenTo('selected'),

  /**
   * Action when the selected accordion item is about to be changed.
   *
   * You can return false to prevent changing the active item, and do that in your action by
   * setting the `selected` accordingly.
   *
   * @event onChange
   * @param newValue
   * @param oldValue
   * @public
   */
  onChange(newValue, oldValue) {}, // eslint-disable-line no-unused-vars

  actions: {
    change(newValue) {
      let oldValue = this.get('isSelected');
      if (oldValue === newValue) {
        newValue = null;
      }
      if (this.get('onChange')(newValue, oldValue) !== false) {
        this.set('isSelected', newValue);
      }
    }
  }

});
