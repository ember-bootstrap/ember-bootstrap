import classic from 'ember-classic-decorator';
import { attributeBindings, classNameBindings, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import FormElementLabel from 'ember-bootstrap/components/base/bs-form/element/label';
import { isBlank } from '@ember/utils';

@classic
@tagName('label')
@classNameBindings(
  'invisibleLabel:sr-only',
  'isHorizontalAndNotCheckbox:col-form-label',
  'isCheckbox:form-check-label',
  'labelClass',
  'sizeClass'
)
@attributeBindings('formElementId:for')
export default class Label extends FormElementLabel {
  @computed('isHorizontal', 'isCheckbox')
  get isHorizontalAndNotCheckbox() {
    return this.get('isHorizontal') && !this.get('isCheckbox');
  }

  @computed('size', 'isHorizontal')
  get sizeClass() {
    if (!this.get('isHorizontal')) {
      return undefined;
    }
    let size = this.get('size');
    return isBlank(size) ? null : `col-form-label-${size}`;
  }

  /**
   * Property for size styling, set to 'lg', 'sm'
   *
   * @property size
   * @type String
   * @public
   */
  size = null;
}
