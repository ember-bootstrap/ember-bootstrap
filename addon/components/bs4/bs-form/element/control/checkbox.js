import FormElementControlCheckbox from 'ember-bootstrap/components/base/bs-form/element/control/checkbox';
import formValidationClass from 'ember-bootstrap/utils/cp/form-validation-class';

export default FormElementControlCheckbox.extend({
  classNames: ['form-check-input'],
  classNameBindings: ['formValidationClass'],
  formValidationClass: formValidationClass()
});
