import classic from 'ember-classic-decorator';
import { classNames, classNameBindings } from '@ember-decorators/component';
import { equal } from '@ember/object/computed';
import FormGroup from 'ember-bootstrap/components/base/bs-form/group';

@classic
@classNames('form-group')
@classNameBindings('isHorizontal:row')
export default class Group extends FormGroup {
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
