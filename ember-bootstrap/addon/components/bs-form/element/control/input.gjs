import { action } from '@ember/object';
import Control from '../control';
import sizeClass from 'ember-bootstrap/utils/size-class';

/**

 @class FormElementControlInput
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
export default class FormElementControlInput extends Control {
  /**
   * @property type
   * @type {String}
   * @public
   */

  @action
  handleChange(event) {
    this.args.onChange(event.target.value);
  }

  @action
  handleInput(event) {
    this.args.onChange(event.target.value);
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

  get sizeClass() {
    return sizeClass('form-control', this.args.size);
  }
}
