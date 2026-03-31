import Component from '@glimmer/component';
import arg from 'ember-bootstrap/utils/decorators/arg';

/**

 @class FormElementLabel
 @namespace Components
 @extends Ember.Component
 @private
 */
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

  get isHorizontalAndNotCheckbox() {
    return this.isHorizontal && !this.isCheckbox;
  }

  /**
   * [BS4 only] Property for size styling, set to 'lg', 'sm'
   *
   * @property size
   * @type String
   * @public
   */

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
  @arg
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
  @arg
  controlType = 'text';

  /**
   * Indicates whether the type of the control widget equals `checkbox`
   *
   * @property isCheckbox
   * @type boolean
   * @private
   */
  get isCheckbox() {
    return this.args.controlType === 'checkbox';
  }

  /**
   * Indicates whether the form type equals `horizontal`
   *
   * @property isHorizontal
   * @type boolean
   * @private
   */
  get isHorizontal() {
    return this.args.formLayout === 'horizontal';
  }
}
