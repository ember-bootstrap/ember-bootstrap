import { layout as templateLayout } from '@ember-decorators/component';
import BaseFormElementLayoutHorizontal from '../horizontal';
import layout from 'ember-bootstrap/templates/components/bs-form/element/layout/horizontal/checkbox';

/**

 @class FormElementLayoutHorizontalCheckbox
 @namespace Components
 @extends Components.FormElementLayout
 @private
 */
@templateLayout(layout)
export default class FormElementLayoutHorizontal extends BaseFormElementLayoutHorizontal {}
