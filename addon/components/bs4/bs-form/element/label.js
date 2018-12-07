import FormElementLabel from 'ember-bootstrap/components/base/bs-form/element/label';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';

export default FormElementLabel.extend({
  tagName: 'label',

  classNames: [],
  classNameBindings: ['invisibleLabel:sr-only', 'isHorizontalAndNotCheckbox:col-form-label', 'isCheckbox:form-check-label', 'labelClass', 'sizeClass'],
  attributeBindings: ['formElementId:for'],

  isHorizontalAndNotCheckbox: computed('isHorizontal', 'isCheckbox', function() {
    return this.get('isHorizontal') && !this.get('isCheckbox');
  }),

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
