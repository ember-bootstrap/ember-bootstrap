import { classNameBindings } from '@ember-decorators/component';
import BaseFormElementControlInput from 'ember-bootstrap/components/base/bs-form/element/control/input';
import formValidationClass from 'ember-bootstrap/utils/cp/form-validation-class';
import sizeClass from 'ember-bootstrap/utils/cp/size-class';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

@classNameBindings('formValidationClass', 'sizeClass')
export default class FormElementControlInput extends BaseFormElementControlInput {
  @formValidationClass('validationType')
  formValidationClass;

  /**
   * Property for size styling, set to 'lg', 'sm' or 'xs'
   *
   * Also see the [Bootstrap docs](https://getbootstrap.com/docs/4.3/components/forms/#sizing)
   *
   * @property size
   * @type String
   * @public
   */
  @defaultValue
  size = null;

  @sizeClass('form-control', 'size')
  sizeClass;
}
