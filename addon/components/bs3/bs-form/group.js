import { readOnly } from '@ember/object/computed';
import FormGroup from 'ember-bootstrap/components/base/bs-form/group';

export default FormGroup.extend({
  classNames: ['form-group'],
  classNameBindings: ['hasFeedback'],

  classTypePrefix: 'form-group',

  _validationType: readOnly('validation')
});
