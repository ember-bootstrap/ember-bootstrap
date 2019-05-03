import FormElement from 'ember-bootstrap/components/base/bs-form/element';

export default FormElement.extend({
  init() {
    this._super(...arguments);
    this.set('doNotShowValidationForEventTargets', [
      '.input-group-append',
      '.input-group-prepend',
    ]);
  }
});
