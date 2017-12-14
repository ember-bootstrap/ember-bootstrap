import Control from '../control';
import ControlAttributes from 'ember-bootstrap/mixins/control-attributes';
import { computed } from '@ember/object';

/**

 @class FormElementControlInput
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default Control.extend(ControlAttributes, {
  attributeBindings: [
    'value',
    'realType:type',
    'placeholder',
    'controlSize:size',
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
  classNameBindings: ['isPlain:form-control-plaintext'],

  /**
   * @property _isPlain
   * @type {Boolean}
   * @readonly
   * @private
   */
  isPlain: false,

  /**
   * @property controlType
   * @type {String}
   * @readonly
   * @private
   */
  realType: 'text',

  /**
   * @property type
   * @type {String}
   * @public
   */
  type: computed({
    get() {
      return this.get('realType');
    },
    set(key, value) {
      if (value.split('-').pop() === 'plain') {
        this.set('isPlain', true);
        this.set('realType', value.split('-').shift());
      } else {
        this.set('realType', value);
      }
    }
  }),

  change(event) {
    this.get('onChange')(event.target.value);
  },

  input(event) {
    this.get('onChange')(event.target.value);
  }

});