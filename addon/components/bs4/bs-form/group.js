import { equal, and } from '@ember/object/computed';
import FormGroup from 'ember-bootstrap/components/base/bs-form/group';

export default FormGroup.extend({
  classNameBindings: ['isHorizontal:row', 'isCheckbox:form-check:form-group', 'isInlineCheckbox:form-check-inline'],

  /**
   * Indicates whether the type of the control widget equals `checkbox`
   *
   * @property isCheckbox
   * @type boolean
   * @private
   */
  isCheckbox: equal('controlType', 'checkbox').readOnly(),

  /**
   * Indicates whether the form type equals `horizontal`
   *
   * @property isHorizontal
   * @type boolean
   * @private
   */
  isHorizontal: equal('formLayout', 'horizontal').readOnly(),

  isInline: equal('formLayout', 'inline').readOnly(),

  isInlineCheckbox: and('isCheckbox', 'isInline').readOnly()
});
