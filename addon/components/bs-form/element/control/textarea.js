import { action } from '@ember/object';
import { tagName } from '@ember-decorators/component';
import Control from '../control';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**

 @class FormElementControlTextarea
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
@tagName('')
@deprecateSubclassing
export default class FormElementControlTextarea extends Control {
  @action
  handleChange(event) {
    this.onChange(event.target.value);
  }

  @action
  handleInput(event) {
    this.onChange(event.target.value);
  }
}
