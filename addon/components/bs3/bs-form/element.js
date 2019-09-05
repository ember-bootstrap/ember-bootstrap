import BaseFormElement from 'ember-bootstrap/components/base/bs-form/element';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

export default class FormElement extends BaseFormElement {
  @defaultValue
  doNotShowValidationForEventTargets = [
    '.input-group-addon',
    '.input-group-btn',
  ];
}
