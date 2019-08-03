import FormElementControlInput from 'ember-bootstrap/components/base/bs-form/element/control/input';
import SizeClass from 'ember-bootstrap/mixins/size-class';
import formValidationClass from 'ember-bootstrap/utils/form-validation-class';

export default FormElementControlInput.extend(SizeClass, {
  classTypePrefix: 'form-control',
  classNameBindings: ['formValidationClass'],
  formValidationClass: formValidationClass()
});
