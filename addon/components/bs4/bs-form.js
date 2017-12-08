import { computed, get } from '@ember/object';

import Form from 'ember-bootstrap/components/base/bs-form';

export default Form.extend({
  layoutClass: computed('formLayout', function() {
    let layout = get(this, 'formLayout');
    return layout === 'inline' ? 'form-inline' : false;
  }).readOnly()
});
