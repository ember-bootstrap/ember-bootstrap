import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-accordion/body';

/**
 Component for an accordion item body.

 See [Components.Accordion](Components.Accordion.html) for examples.

 @class AccordionBody
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Component.extend({
  layout,
  tagName: '',

  /**
   * @property collapsed
   * @type boolean
   * @public
   */

  /**
   * @property collapseComponent
   * @type {String}
   * @private
   */
  collapseComponent: 'bs-collapse',
});
