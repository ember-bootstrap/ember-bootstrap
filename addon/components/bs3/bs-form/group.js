import Ember from 'ember';
import FormGroup from 'ember-bootstrap/components/base/bs-form/group';

const { computed } = Ember;

export default FormGroup.extend({
  classNameBindings: ['hasFeedback'],

  classTypePrefix: 'form-group',

  _validationType: computed.readOnly('validation')
});
