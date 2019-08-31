import FormElement from 'ember-bootstrap/components/base/bs-form/element';

export default class BsFormElement extends FormElement {
  doNotShowValidationForEventTargets = [
    '.input-group-append',
    '.input-group-prepend',
  ];
}
