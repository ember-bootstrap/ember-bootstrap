import { computed } from '@ember/object';
import FormElementControlInput from 'ember-bootstrap/components/base/bs-form/element/control/input';

export default FormElementControlInput.extend({
  classNameBindings: ['formFeedbackClass'],

  validationType: null,

  formFeedbackClass: computed('validationType', function() {
    let validationType = this.get('validationType');
    return validationType ? `form-control-${validationType}` : null;
  })
});
