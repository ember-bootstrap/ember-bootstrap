import { classNameBindings, classNames } from '@ember-decorators/component';
import { equal } from '@ember/object/computed';
import BaseFormGroup from 'ember-bootstrap/components/base/bs-form/group';

@classNames('form-group')
@classNameBindings('isHorizontal:row')
export default class FormGroup extends BaseFormGroup {
  /**
   * Indicates whether the form type equals `horizontal`
   *
   * @property isHorizontal
   * @type boolean
   * @private
   */
  @(equal('formLayout', 'horizontal').readOnly())
  isHorizontal;
}
