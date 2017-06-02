import Ember from 'ember';
import FormElementLabel from 'ember-bootstrap/components/base/bs-form/element/label';

const {
  computed
} = Ember;

export default FormElementLabel.extend({
  tagName: 'label',

  classNames: [],
  classNameBindings: ['invisibleLabel:sr-only', 'isHorizontal:col-form-label', 'isCheckbox:form-check-label', 'labelClass'],
  attributeBindings: ['formElementId:for'],

  /**
   * The form layout used for the markup generation (see http://getbootstrap.com/css/#forms):
   *
   * * 'horizontal'
   * * 'vertical'
   * * 'inline'
   *
   * Defaults to the parent `form`'s `formLayout` property.
   *
   * @property formLayout
   * @type string
   * @default 'vertical'
   * @public
   */
  formLayout: 'vertical',

  /**
   * The type of the control widget.
   * Supported types:
   *
   * * 'text'
   * * 'checkbox'
   * * 'textarea'
   * * any other type will use an input tag with the `controlType` value as the type attribute (for e.g. HTML5 input
   * types like 'email'), and the same layout as the 'text' type
   *
   * @property controlType
   * @type string
   * @default 'text'
   * @public
   */
  controlType: 'text',

  /**
   * Indicates whether the type of the control widget equals `checkbox`
   *
   * @property isCheckbox
   * @type boolean
   * @public
   */
  isCheckbox: computed.equal('controlType', 'checkbox').readOnly(),

  /**
   * Indicates whether the form type equals `horizontal`
   *
   * @property isHorizontal
   * @type boolean
   * @public
   */
  isHorizontal: computed.equal('formLayout', 'horizontal').readOnly()
});
