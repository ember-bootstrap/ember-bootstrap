import { tagName } from '@ember-decorators/component';
import FormElementLabel from 'ember-bootstrap/components/bs-form/element/label';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

@tagName('legend')
export default class FormElementLegend extends FormElementLabel {
  // FormElementLabel has an attribute binding `formElementId:for`. `attributeBindings` is a
  // concenated property. Therefor we can't remove the attribute binding but we can prevent
  // rendering it, by setting it to `null`.
  @defaultValue
  forAttribute = null;
}
