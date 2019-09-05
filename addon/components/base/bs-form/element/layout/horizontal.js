import { layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { assert } from '@ember/debug';
import { isBlank } from '@ember/utils';
import FormElementLayout from '../layout';
import layout from 'ember-bootstrap/templates/components/bs-form/element/layout/horizontal';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

/**

 @class FormElementLayoutHorizontal
 @namespace Components
 @extends Components.FormElementLayout
 @private
 */
@templateLayout(layout)
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
    if (isBlank(this.get('horizontalLabelGridClass'))) {
      return undefined;
    }
    let parts = this.get('horizontalLabelGridClass').split('-');
    assert('horizontalInputGridClass must match format bootstrap grid column class', parts.length === 3);
    parts[2] = 12 - parts[2];
    return parts.join('-');
  }
}
