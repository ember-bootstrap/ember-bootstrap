import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import FormElementControlTextarea from 'ember-bootstrap/components/base/bs-form/element/control/textarea';
import formValidationClass from 'ember-bootstrap/utils/cp/form-validation-class';

@classic
@classNameBindings('formValidationClass')
export default class Textarea extends FormElementControlTextarea {
  @formValidationClass('validationType')
  formValidationClass;
}
