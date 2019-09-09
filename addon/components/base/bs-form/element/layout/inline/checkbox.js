import { layout as templateLayout } from '@ember-decorators/component';
import FormElementLayoutInline from '../inline';
import layout from 'ember-bootstrap/templates/components/bs-form/element/layout/vertical/checkbox';

/**

 @class FormElementLayoutInlineCheckbox
 @namespace Components
 @extends Components.FormElementLayout
 @private
 */
@templateLayout(layout)
export default class FormElementLayoutInlineCheckbox extends FormElementLayoutInline {}
