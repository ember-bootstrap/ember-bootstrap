import Control from '../control';
import layout from 'ember-bootstrap/templates/components/bs-form/element/control/radio';

/**

 @class FormElementControlRadio
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default Control.extend({
  layout,
  tagName: '',

  /**
   * @property inline
   * @type {Boolean}
   * @default false
   * @public
   */
  inline: false
});
