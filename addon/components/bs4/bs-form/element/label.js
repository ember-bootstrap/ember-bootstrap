import FormElementLabel from 'ember-bootstrap/components/base/bs-form/element/label';

export default FormElementLabel.extend({
  tagName: 'label',

  classNames: ['col-form-label'],
  classNameBindings: ['invisibleLabel:sr-only', 'labelClass'],
  attributeBindings: ['formElementId:for']
});
