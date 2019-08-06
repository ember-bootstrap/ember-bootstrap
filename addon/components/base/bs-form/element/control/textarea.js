import Control from '../control';
import { baseAttributes } from './input';

/**

 @class FormElementControlTextarea
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default Control.extend({
  attributeBindings: [
    ...baseAttributes,
    'value',
    'placeholder',
    'minlength',
    'maxlength',
    'autocomplete',
    'autocapitalize',
    'autocorrect',
    'spellcheck',
    'rows',
    'cols',
    'wrap'
  ],
  tagName: 'textarea',
  classNames: ['form-control'],

  change(event) {
    this.get('onChange')(event.target.value);
  },

  input(event) {
    this.get('onChange')(event.target.value);
  }
});
