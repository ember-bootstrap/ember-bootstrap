import BaseFormGroup from 'ember-bootstrap/components/base/bs-form/element';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

export default class FormElement extends BaseFormGroup {
  @defaultValue
  doNotShowValidationForEventTargets = [
    '.input-group-append',
    '.input-group-prepend',
  ];
}
