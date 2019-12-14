import { not, notEmpty, and, readOnly } from '@ember/object/computed';
import { defineProperty } from '@ember/object';
import BsFormElement from 'ember-bootstrap/components/bs-form/element';

export default BsFormElement.extend({
  _attrValidations: null,
  notValidating: not('isValidating').readOnly(),
  notDisabled: not('disabled').readOnly(),
  _presenceEnabled: not('_attrValidations.options.presence.disabled'),

  // Overwrite
  hasValidator: notEmpty('_attrValidations').readOnly(),
  hasErrors: and('_attrValidations.isInvalid', 'notValidating').readOnly(),
  isValidating: readOnly('_attrValidations.isValidating'),

  // mark as required only if:
  // - field is not disabled,
  // - presence validator requires presence
  // - presence validator is enabled
  required: and('notDisabled', '_attrValidations.options.presence.presence', '_presenceEnabled'),

  setupValidations() {
    defineProperty(this, '_attrValidations', readOnly(`model.validations.attrs.${this.get('property')}`));
    defineProperty(this, 'errors', readOnly('_attrValidations.messages'));
    defineProperty(this, 'warnings', readOnly('_attrValidations.warningMessages'));
  }
});