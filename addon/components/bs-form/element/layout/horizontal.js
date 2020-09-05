import { computed } from '@ember/object';
import { assert } from '@ember/debug';
import { isBlank } from '@ember/utils';
import FormElementLayout from '../layout';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import { macroCondition, getOwnConfig } from '@embroider/macros';

/**

 @class FormElementLayoutHorizontal
 @namespace Components
 @extends Components.FormElementLayout
 @private
 */
export default class FormElementLayoutHorizontal extends FormElementLayout {
  /**
   * The Bootstrap grid class for form labels within a horizontal layout form.
   *
   * @property horizontalLabelGridClass
   * @type string
   * @public
   */
  @defaultValue
  horizontalLabelGridClass = null;

  /**
   * Computed property that specifies the Bootstrap grid class for form controls within a horizontal layout form.
   *
   * @property horizontalInputGridClass
   * @type string
   * @readonly
   * @private
   */
  @(computed('horizontalLabelGridClass').readOnly())
  get horizontalInputGridClass() {
    if (isBlank(this.horizontalLabelGridClass)) {
      return undefined;
    }
    let parts = this.horizontalLabelGridClass.split('-');
    assert('horizontalInputGridClass must match format bootstrap grid column class', parts.length === 3);
    parts[2] = 12 - parts[2];
    return parts.join('-');
  }

  /**
   * Computed property that specifies the Bootstrap offset grid class for form controls within a horizontal layout
   * form, that have no label.
   *
   * @property horizontalInputOffsetGridClass
   * @type string
   * @readonly
   * @private
   */
  @computed('horizontalLabelGridClass')
  get horizontalInputOffsetGridClass() {
    if (isBlank(this.horizontalLabelGridClass)) {
      return undefined;
    }
    let parts = this.horizontalLabelGridClass.split('-');
    if (macroCondition(getOwnConfig().isBS3)) {
      parts.splice(2, 0, 'offset');
    } else {
      parts.splice(0, 1, 'offset');
    }
    return parts.join('-');
  }
}
