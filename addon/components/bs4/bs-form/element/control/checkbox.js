import { classNameBindings, classNames } from '@ember-decorators/component';
import BaseFormElementControlCheckbox from 'ember-bootstrap/components/base/bs-form/element/control/checkbox';
import formValidationClass from 'ember-bootstrap/utils/cp/form-validation-class';

@classNames('form-check-input')
@classNameBindings('formValidationClass')
export default class FormElementControlCheckbox extends BaseFormElementControlCheckbox {
  @formValidationClass('validationType')
  formValidationClass;
}
