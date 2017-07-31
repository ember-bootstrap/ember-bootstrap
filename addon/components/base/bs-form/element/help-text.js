import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-form/element/help-text';

/**

 @class FormElementHelpText
 @namespace Components
 @extends Ember.Component
 @private
 */
export default Component.extend({
  layout,

  /**
   * @property text
   * @type {string}
   * @public
   */
  text: null
});
