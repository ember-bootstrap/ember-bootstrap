import { computed, assert } from '@ember/object';
import Form from 'ember-bootstrap/components/base/bs-form';

export default Form.extend({
  layoutClass: computed('formLayout', function() {
    let layout = this.get('formLayout');
    let supportedTypes = ['vertical', 'horizontal', 'inline'];
    assert('must provide a valid `formLayout` attribute.',
      supportedTypes.includes(this.get('formLayout')));
    return layout === 'vertical' ? 'form' : `form-${layout}`;
  }).readOnly()
});
