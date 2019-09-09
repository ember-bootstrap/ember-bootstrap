import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Control from '../control';
import layout from 'ember-bootstrap/templates/components/bs-form/element/control/radio';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

/**

 @class FormElementControlRadio
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
@templateLayout(layout)
@tagName('')
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
