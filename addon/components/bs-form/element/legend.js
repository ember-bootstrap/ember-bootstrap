import { layout as templateLayout, tagName } from '@ember-decorators/component';
import FormElementLabel from 'ember-bootstrap/components/bs-form/element/label';
import layout from 'ember-bootstrap/templates/components/bs-form/element/legend';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

@templateLayout(layout)
@tagName('')
@deprecateSubclassing
export default class FormElementLegend extends FormElementLabel {}
