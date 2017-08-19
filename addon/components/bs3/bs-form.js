import { computed } from '@ember/object';
import { assert } from '@ember/debug';

import Form from 'ember-bootstrap/components/base/bs-form';

export default Form.extend({
  layoutClass: computed('formLayout', function() {
    let layout = this.get('formLayout');
    let supportedTypes = ['vertical', 'horizontal', 'inline'];
    assert('must provide a valid `formLayout` attribute.',
      (supportedTypes.indexOf(layout) >= 0));
    return layout === 'vertical' ? 'form' : `form-${layout}`;
  }).readOnly()
});
