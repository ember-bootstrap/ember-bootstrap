import { computed } from '@ember/object';
import Form from 'ember-bootstrap/components/base/bs-form';

export default Form.extend({
  layoutClass: computed('formLayout', function() {
    let layout = this.get('formLayout');
    return layout === 'inline' ? 'form-inline' : null;
  }).readOnly()
});
