import FormElementLayoutHorizontal from 'ember-bootstrap/components/base/bs-form/element/layout/horizontal';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

export default FormElementLayoutHorizontal.extend({
  /**
   * Computed property that specifies the Bootstrap offset grid class for form controls within a horizontal layout
   * form, that have no label.
   *
   * @property horizontalInputOffsetGridClass
   * @type string
   * @readonly
   * @private
   */
  horizontalInputOffsetGridClass: computed('horizontalLabelGridClass', function() {
    if (isBlank(this.get('horizontalLabelGridClass'))) {
      return;
    }
    let parts = this.get('horizontalLabelGridClass').split('-');
    parts.splice(2, 0, 'offset');
    return parts.join('-');
  })
});
