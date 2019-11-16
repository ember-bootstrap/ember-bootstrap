import BaseFormGroup from 'ember-bootstrap/components/base/bs-form/element';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import { computed } from '@ember/object';

export default class FormElement extends BaseFormGroup {
  @defaultValue
  doNotShowValidationForEventTargets = [
    '.input-group-append',
    '.input-group-prepend',
  ];

  @computed('controlType')
  get labelComponent() {
    return this.get('controlType') === 'radio' ? 'bs-form/element/legend' : 'bs-form/element/label';
  }
}
