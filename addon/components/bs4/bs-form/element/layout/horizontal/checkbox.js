import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import FormElementLayoutHorizontal from '../horizontal';
import layout from 'ember-bootstrap/templates/components/bs-form/element/layout/horizontal/checkbox';

/**

 @class FormElementLayoutHorizontalCheckbox
 @namespace Components
 @extends Components.FormElementLayout
 @private
 */
@classic
@templateLayout(layout)
export default class Checkbox extends FormElementLayoutHorizontal {}
