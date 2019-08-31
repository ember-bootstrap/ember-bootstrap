import classic from 'ember-classic-decorator';
import { classNames, classNameBindings } from '@ember-decorators/component';
import FormElementControlCheckbox from 'ember-bootstrap/components/base/bs-form/element/control/checkbox';
import formValidationClass from 'ember-bootstrap/utils/cp/form-validation-class';

@classic
@classNames('form-check-input')
@classNameBindings('formValidationClass')
export default class Checkbox extends FormElementControlCheckbox {
  @formValidationClass('validationType')
  formValidationClass;
}
