import Ember from 'ember';
import FormGroup from 'ember-bootstrap/components/base/bs-form/group';

export default FormGroup.extend({
  classTypePrefix: 'form-group',

  _validationType: Ember.computed('validation', function() {
    return this.get('validation');
  })
});
