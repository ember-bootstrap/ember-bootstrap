import { computed } from '@ember/object';
import { assert } from '@ember/debug';

export default function formValidationClass(validationTypeProperty) {
  assert('formValidationClass needs validationTypeProperty argument', typeof validationTypeProperty === 'string');

  return computed(validationTypeProperty, function () {
    let validationType = this.get(validationTypeProperty);
    switch (validationType) {
      case 'error':
        return 'is-invalid';
      case 'success':
        return 'is-valid';
      case 'warning':
        return 'is-warning'; // not officially supported in BS4 :(
      default:
        return undefined;
    }
  });
}
