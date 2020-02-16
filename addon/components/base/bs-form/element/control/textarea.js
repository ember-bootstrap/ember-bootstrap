import { attributeBindings, classNames, tagName } from '@ember-decorators/component';
import Control from '../control';

/**

 @class FormElementControlTextarea
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
@attributeBindings(
  'disabled',
  'readonly',
  'ariaDescribedBy:aria-describedby',
  'value'
)
@tagName('textarea')
@classNames('form-control')
export default class FormElementControlTextarea extends Control {
  change(event) {
    this.get('onChange')(event.target.value);
  }

  input(event) {
    this.get('onChange')(event.target.value);
  }
}
