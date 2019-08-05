import FormElementControlInput from 'ember-bootstrap/components/base/bs-form/element/control/input';
import formValidationClass from 'ember-bootstrap/utils/cp/form-validation-class';
import sizeClass from 'ember-bootstrap/utils/cp/size-class';

export default FormElementControlInput.extend({
  classNameBindings: ['formValidationClass', 'sizeClass'],
  formValidationClass: formValidationClass(),

  /**
   * Property for size styling, set to 'lg', 'sm' or 'xs'
   *
   * Also see the [Bootstrap docs](https://getbootstrap.com/docs/4.3/components/forms/#sizing)
   *
   * @property size
   * @type String
   * @public
   */
  size: null,
  sizeClass: sizeClass('form-control'),
});
