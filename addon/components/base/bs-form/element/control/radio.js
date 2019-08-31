import classic from 'ember-classic-decorator';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import Control from '../control';
import layout from 'ember-bootstrap/templates/components/bs-form/element/control/radio';

/**

 @class FormElementControlRadio
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
@classic
@templateLayout(layout)
@tagName('')
export default class Radio extends Control {
 /**
  * @property inline
  * @type {Boolean}
  * @default false
  * @public
  */
 inline = false;
}
