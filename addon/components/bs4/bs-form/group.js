import Ember from 'ember';
import FormGroup from 'ember-bootstrap/components/base/bs-form/group';

const { computed } = Ember;

export default FormGroup.extend({
  classNameBindings: ['isHorizontal:row', 'isCheckbox:form-check:form-group'],
  classTypePrefix: 'form-control',

  /**
   * Indicates whether the type of the control widget equals `checkbox`
   *
   * @property isCheckbox
   * @type boolean
   * @private
   */
  isCheckbox: computed.equal('controlType', 'checkbox').readOnly(),

  /**
   * Indicates whether the form type equals `horizontal`
   *
   * @property isHorizontal
   * @type boolean
   * @private
   */
  isHorizontal: computed.equal('formLayout', 'horizontal').readOnly(),

  _validationType: computed('validation', function() {
    let validation = this.get('validation');
    return validation === 'error' ? 'danger' : validation;
  }).readOnly()
});
