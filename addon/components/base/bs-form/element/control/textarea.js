import classic from 'ember-classic-decorator';
import { classNames, attributeBindings, tagName } from '@ember-decorators/component';
import Control from '../control';
import { baseAttributes } from './input';

/**

 @class FormElementControlTextarea
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
@classic
@attributeBindings(
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
)
@tagName('textarea')
@classNames('form-control')
export default class Textarea extends Control {
  change(event) {
    this.get('onChange')(event.target.value);
  }

  input(event) {
    this.get('onChange')(event.target.value);
  }
}
