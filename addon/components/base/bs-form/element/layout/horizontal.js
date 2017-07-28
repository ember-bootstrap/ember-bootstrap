import Ember from 'ember';
import FormElementLayout from '../layout';
import layout from 'ember-bootstrap/templates/components/bs-form/element/layout/horizontal';

const { assert, computed, isBlank } = Ember;

/**

 @class FormElementLayoutHorizontal
 @namespace Components
 @extends Components.FormElementLayout
 @private
 */
export default FormElementLayout.extend({
  layout,

  /**
   * The Bootstrap grid class for form labels within a horizontal layout form.
   *
   * @property horizontalLabelGridClass
   * @type string
   * @public
   */
  horizontalLabelGridClass: null,

  /**
   * Computed property that specifies the Bootstrap grid class for form controls within a horizontal layout form.
   *
   * @property horizontalInputGridClass
   * @type string
   * @readonly
   * @private
   */
  horizontalInputGridClass: computed('horizontalLabelGridClass', function() {
    if (isBlank(this.get('horizontalLabelGridClass'))) {
      return;
    }
    let parts = this.get('horizontalLabelGridClass').split('-');
    assert('horizontalInputGridClass must match format bootstrap grid column class', parts.length === 3);
    parts[2] = 12 - parts[2];
    return parts.join('-');
  }).readOnly(),

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
