import { computed } from '@ember/object';

export default function formValidationClass() {
  return computed('validationType', function() {
    let validationType = this.get('validationType');
    switch (validationType) {
      case 'error':
        return 'is-invalid';
      case 'success':
        return 'is-valid';
      case 'warning':
        return 'is-warning'; // not officially supported in BS4 :(
    }
  });
}