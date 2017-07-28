import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-accordion/title';

/**
 Component for an accordion item title.

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionTitle
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Component.extend({
  layout,
  ariaRole: 'tab',
  classNameBindings: ['collapsed:collapsed:expanded'],

  /**
   * @property collapsed
   * @type boolean
   * @public
   */
  collapsed: null,

  /**
   * @event onClick
   * @public
   */
  onClick() {},

  click(e) {
    e.preventDefault();
    this.get('onClick')();
  }

});
