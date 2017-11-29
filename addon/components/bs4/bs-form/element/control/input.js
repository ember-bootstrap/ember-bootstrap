import FormElementControlInput from 'ember-bootstrap/components/base/bs-form/element/control/input';
import ControlValidationMixin from 'ember-bootstrap/mixins/control-validation';
import SizeClass from 'ember-bootstrap/mixins/size-class';

export default FormElementControlInput.extend(ControlValidationMixin, SizeClass, {
  classTypePrefix: 'form-control'
});
