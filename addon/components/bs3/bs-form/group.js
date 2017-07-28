import { computed } from '@ember/object';
import FormGroup from 'ember-bootstrap/components/base/bs-form/group';

export default FormGroup.extend({
  classNames: ['form-group'],
  classNameBindings: ['hasFeedback'],

  classTypePrefix: 'form-group',

  _validationType: computed.readOnly('validation')
});
