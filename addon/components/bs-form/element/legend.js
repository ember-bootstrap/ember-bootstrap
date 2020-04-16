import { layout as templateLayout, tagName } from '@ember-decorators/component';
import FormElementLabel from 'ember-bootstrap/components/bs-form/element/label';
import layout from 'ember-bootstrap/templates/components/bs-form/element/legend';

@templateLayout(layout)
@tagName('')
export default class FormElementLegend extends FormElementLabel {}
