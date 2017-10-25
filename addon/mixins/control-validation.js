import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

/**
 * Mixin for BS4 validation styles added to form controls
 *
 * @class ControlValidation
 * @namespace Mixins
 * @private
 */
export default Mixin.create({
  classNameBindings: ['formFeedbackClass'],

  validationType: null,

  formFeedbackClass: computed('validationType', function() {
    let validationType = this.get('validationType');
    switch (validationType) {
      case 'error':
        return 'is-invalid';
      case 'success':
        return 'is-valid';
      case 'warning':
        return 'is-warning'; // not officially supported in BS4 :(
    }
  })
});
