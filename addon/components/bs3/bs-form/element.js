import FormElement from 'ember-bootstrap/components/base/bs-form/element';

export default class BsFormElement extends FormElement {
  doNotShowValidationForEventTargets = [
    '.input-group-addon',
    '.input-group-btn',
  ];
}
