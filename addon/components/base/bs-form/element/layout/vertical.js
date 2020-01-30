import { layout as templateLayout, tagName } from '@ember-decorators/component';
import FormElementLayout from '../layout';
import layout from 'ember-bootstrap/templates/components/bs-form/element/layout/vertical';

/**

 @class FormElementLayoutVertical
 @namespace Components
 @extends Components.FormElementLayout
 @private
 */
@tagName("")
@templateLayout(layout)
export default class FormElementLayoutVertical extends FormElementLayout {}
