import Ember from 'ember';
import FormGroup from 'ember-bootstrap/components/base/bs-form/group';

export default FormGroup.extend({
  classNameBindings: ['isHorizontal:row'],
  classTypePrefix: 'form-control',

  isHorizontal: Ember.computed.equal('formLayout', 'horizontal')
});
