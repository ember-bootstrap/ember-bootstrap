import Control from '../control';
import ControlAttributes from 'ember-bootstrap/mixins/control-attributes';

/**

 @class FormElementControlTextarea
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default Control.extend(ControlAttributes, {
  attributeBindings: [
    'value',
    'placeholder',
    'minlength',
    'maxlength',
    'autocomplete',
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
