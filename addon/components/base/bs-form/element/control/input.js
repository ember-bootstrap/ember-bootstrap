import Control from '../control';
import ControlAttributes from 'ember-bootstrap/mixins/control-attributes';

/**

 @class FormElementControlInput
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default Control.extend(ControlAttributes, {
  attributeBindings: [
    'value',
    'type',
    'placeholder',
    'size',
    'minlength',
    'maxlength',
    'min',
    'max',
    'pattern',
    'accept',
    'autocomplete',
    'autosave',
    'inputmode',
    'multiple',
    'step',
    'spellcheck'
  ],
  classNames: ['form-control'],

  /**
   * @property type
   * @type {String}
   * @public
   */
  type: 'text',

  change(event) {
    this.get('onChange')(event.target.value);
  },

  input(event) {
    this.get('onChange')(event.target.value);
  }

});