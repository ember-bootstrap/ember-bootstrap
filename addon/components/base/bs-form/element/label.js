import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { equal } from '@ember/object/computed';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-form/element/label';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

/**

 @class FormElementLabel
 @namespace Components
 @extends Ember.Component
 @private
 */
@templateLayout(layout)
@tagName('')
export default class FormElementLabel extends Component {
  /**
   * @property label
   * @type string
   * @public
   */

  /**
   * @property invisibleLabel
   * @type boolean
   * @public
   */
  @defaultValue
  invisibleLabel = false;

  /**
   * @property formElementId
   * @type {String}
   * @public
   */

  /**
   * @property labelClass
   * @type {String}
   * @public
   */

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
  @defaultValue
  formLayout = 'vertical';

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
  @defaultValue
  controlType = 'text';

  /**
   * Indicates whether the type of the control widget equals `checkbox`
   *
   * @property isCheckbox
   * @type boolean
   * @private
   */
  @(equal('controlType', 'checkbox').readOnly())
  isCheckbox;

  /**
   * Indicates whether the form type equals `horizontal`
   *
   * @property isHorizontal
   * @type boolean
   * @private
   */
  @(equal('formLayout', 'horizontal').readOnly())
  isHorizontal;
}
