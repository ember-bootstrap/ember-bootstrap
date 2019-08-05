import FormElementControlTextarea from 'ember-bootstrap/components/base/bs-form/element/control/textarea';
import formValidationClass from 'ember-bootstrap/utils/cp/form-validation-class';

export default FormElementControlTextarea.extend({
  classNameBindings: ['formValidationClass'],
  formValidationClass: formValidationClass('validationType')
});
