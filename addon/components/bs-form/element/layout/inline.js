import { layout as templateLayout } from '@ember-decorators/component';
import FormElementLayout from '../layout';
import layout from 'ember-bootstrap/templates/components/bs-form/element/layout/vertical';

/**

 @class FormElementLayoutInline
 @namespace Components
 @extends Components.FormElementLayout
 @private
 */
@templateLayout(layout)
export default class FormElementLayoutInline extends FormElementLayout {}
