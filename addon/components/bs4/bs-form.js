import Ember from 'ember';
import Form from 'ember-bootstrap/components/base/bs-form';

const { computed } = Ember;

export default Form.extend({
  layoutClass: computed('formLayout', function() {
    let layout = this.get('formLayout');
    return layout === 'inline' ? 'form-inline' : null;
  }).readOnly()
});
