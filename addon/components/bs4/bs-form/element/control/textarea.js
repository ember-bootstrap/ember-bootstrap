import { classNameBindings } from '@ember-decorators/component';
import BaseFormElementControlTextarea from 'ember-bootstrap/components/base/bs-form/element/control/textarea';
import formValidationClass from 'ember-bootstrap/utils/cp/form-validation-class';

@classNameBindings('formValidationClass')
export default class FormElementControlTextarea extends BaseFormElementControlTextarea {
  @formValidationClass('validationType')
  formValidationClass;
}
