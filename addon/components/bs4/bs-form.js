import Ember from 'ember';
import Form from 'ember-bootstrap/components/base/bs-form';

export default Form.extend({
  layoutClass: Ember.computed('formLayout', function() {
    let layout = this.get('formLayout');
    return layout === 'inline' ? 'form-inline' : null;
  })
});
