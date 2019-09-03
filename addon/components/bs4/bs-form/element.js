import BaseFormGroup from 'ember-bootstrap/components/base/bs-form/element';

export default class FormElement extends BaseFormGroup {
  doNotShowValidationForEventTargets = [
    '.input-group-append',
    '.input-group-prepend',
  ];
}
