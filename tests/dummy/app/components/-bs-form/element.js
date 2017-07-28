import Ember from 'ember';
import BsFormElement from 'ember-bootstrap/components/bs-form/element';

const {
  computed,
  defineProperty
} = Ember;

export default BsFormElement.extend({
  _attrValidations: null,
  notValidating: computed.not('isValidating').readOnly(),
  notDisabled: computed.not('disabled').readOnly(),
  _presenceEnabled: computed.not('_attrValidations.options.presence.disabled'),

  // Overwrite
  hasValidator: computed.notEmpty('_attrValidations').readOnly(),
  hasErrors: computed.and('_attrValidations.isInvalid', 'notValidating').readOnly(),
  isValidating: computed.readOnly('_attrValidations.isValidating'),

  // mark as required only if:
  // - field is not disabled,
  // - presence validator requires presence
  // - presence validator is enabled
  required: computed.and('notDisabled', '_attrValidations.options.presence.presence', '_presenceEnabled'),

  setupValidations() {
    defineProperty(this, '_attrValidations', computed.readOnly(`model.validations.attrs.${this.get('property')}`));
    defineProperty(this, 'errors', computed.readOnly('_attrValidations.messages'));
    defineProperty(this, 'warnings', computed.readOnly('_attrValidations.warningMessages'));
  }
});