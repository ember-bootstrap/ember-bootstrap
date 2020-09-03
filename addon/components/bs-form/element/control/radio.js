import { tagName } from '@ember-decorators/component';
import Control from '../control';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**

 @class FormElementControlRadio
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
@tagName('')
@deprecateSubclassing
export default class FormElementControlRadio extends Control {
  /**
   * @property inline
   * @type {Boolean}
   * @default false
   * @public
   */
  @defaultValue
  inline = false;
}
