import BaseFormElement from 'ember-bootstrap/components/base/bs-form/element';

export default class FormElement extends BaseFormElement {
  doNotShowValidationForEventTargets = [
    '.input-group-addon',
    '.input-group-btn',
  ];
}
