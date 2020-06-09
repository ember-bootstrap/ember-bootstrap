import { layout as templateLayout } from '@ember-decorators/component';
import FormElementLayoutVertical from '../vertical';
import layout from 'ember-bootstrap/templates/components/bs-form/element/layout/vertical/checkbox';

/**

 @class FormElementLayoutVerticalCheckbox
 @namespace Components
 @extends Components.FormElementLayout
 @private
 */
@templateLayout(layout)
export default class FormElementLayoutVerticalCheckbox extends FormElementLayoutVertical {}
