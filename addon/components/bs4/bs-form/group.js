import { equal } from '@ember/object/computed';
import FormGroup from 'ember-bootstrap/components/base/bs-form/group';

export default FormGroup.extend({
  classNames: ['form-group'],
  classNameBindings: ['isHorizontal:row'],

  /**
   * Indicates whether the form type equals `horizontal`
   *
   * @property isHorizontal
   * @type boolean
   * @private
   */
  isHorizontal: equal('formLayout', 'horizontal').readOnly()
});
