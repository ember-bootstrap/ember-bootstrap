import FormElementControlCheckbox from 'ember-bootstrap/components/base/bs-form/element/control/checkbox';
import ControlValidationMixin from 'ember-bootstrap/mixins/control-validation';

export default FormElementControlCheckbox.extend(ControlValidationMixin, {
  classNames: ['form-check-input']
});
