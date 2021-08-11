import { tagName } from '@ember-decorators/component';
import { computed, action } from '@ember/object';
import Control from '../control';
import { isEmpty } from '@ember/utils';
import sizeClass from 'ember-bootstrap/utils/cp/size-class';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**

 @class FormElementControlInput
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
@tagName('')
@deprecateSubclassing
export default class FormElementControlInput extends Control {
  /**
   * @property type
   * @type {String}
   * @public
   */
  type = 'text';

  @action
  handleChange(event) {
    this.onChange(event.target.value);
  }

  @action
  handleInput(event) {
    this.onChange(event.target.value);
  }

  /**
   * [BS4 only] Property for size styling, set to 'lg', 'sm' or 'xs'
   *
   * Also see the [Bootstrap docs](https://getbootstrap.com/docs/4.3/components/forms/#sizing)
   *
   * @property size
   * @type String
   * @public
   */
  @defaultValue
  size = null;

  @sizeClass('form-control', 'size')
  sizeClass;
}
