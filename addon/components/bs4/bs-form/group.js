import Ember from 'ember';
import FormGroup from 'ember-bootstrap/components/base/bs-form/group';

const { computed } = Ember;

export default FormGroup.extend({
  classNameBindings: ['isHorizontal:row'],
  classTypePrefix: 'form-control',

  isHorizontal: computed.equal('formLayout', 'horizontal').readOnly(),

  _validationType: computed('validation', function() {
    let validation = this.get('validation');
    return validation === 'error' ? 'danger' : validation;
  }).readOnly()
});
