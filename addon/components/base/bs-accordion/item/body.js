import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-accordion/body';

/**
 Component for an accordion item body.

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionBody
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Ember.Component.extend({
  layout,
  tagName: '',

  /**
   * @property collapsed
   * @type boolean
   * @public
   */
  collapsed: null

});
