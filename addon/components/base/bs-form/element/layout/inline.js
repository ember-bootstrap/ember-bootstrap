import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import FormElementLayout from '../layout';
import layout from 'ember-bootstrap/templates/components/bs-form/element/layout/vertical';

/**

 @class FormElementLayoutInline
 @namespace Components
 @extends Components.FormElementLayout
 @private
 */
@classic
@templateLayout(layout)
export default class Inline extends FormElementLayout {}
