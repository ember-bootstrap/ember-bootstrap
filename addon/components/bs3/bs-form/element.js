import FormElement from 'ember-bootstrap/components/base/bs-form/element';
import { computed } from '@ember/object';

export default FormElement.extend({
  doNotShowValidationForEventTargets: computed(function() {
    return [
      '.input-group-addon',
      '.input-group-btn',
    ];
  }),
});
