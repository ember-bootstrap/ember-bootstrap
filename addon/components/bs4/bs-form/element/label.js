import FormElementLabel from 'ember-bootstrap/components/base/bs-form/element/label';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';

export default FormElementLabel.extend({
  tagName: 'label',

  classNames: [],
  classNameBindings: ['invisibleLabel:sr-only', 'isHorizontal:col-form-label', 'isCheckbox:form-check-label', 'labelClass', 'sizeClass'],
  attributeBindings: ['formElementId:for'],

  sizeClass: computed('size', 'isHorizontal', function() {
    if (!this.get('isHorizontal')) {
      return;
    }
    let size = this.get('size');
    return isBlank(size) ? null : `col-form-label-${size}`;
  }),

  /**
   * Property for size styling, set to 'lg', 'sm'
   *
   * @property size
   * @type String
   * @public
   */
  size: null
});
