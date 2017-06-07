import FormElementLabel from 'ember-bootstrap/components/base/bs-form/element/label';

export default FormElementLabel.extend({
  tagName: 'label',

  classNames: [],
  classNameBindings: ['invisibleLabel:sr-only', 'isHorizontal:col-form-label', 'isCheckbox:form-check-label', 'labelClass'],
  attributeBindings: ['formElementId:for']
});
