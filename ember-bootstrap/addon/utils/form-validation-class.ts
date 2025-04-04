export type ValidationType = 'error' | 'success' | 'warning';

export default function formValidationClass(validationType: ValidationType) {
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
}
