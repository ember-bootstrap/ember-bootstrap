import { computed, assert } from '@ember/object';
import Form from 'ember-bootstrap/components/base/bs-form';

export default Form.extend({
  layoutClass: computed('formLayout', function() {
    assert('must provide a `formLayout` attribute.', this.get('formLayout'));
    let layout = this.get('formLayout');
    return layout === 'vertical' ? 'form' : `form-${layout}`;
  }).readOnly()
});
