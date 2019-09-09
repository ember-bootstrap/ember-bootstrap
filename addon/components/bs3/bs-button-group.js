import { classNameBindings } from '@ember-decorators/component';
import BaseButtonGroup from 'ember-bootstrap/components/base/bs-button-group';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

@classNameBindings('justified:btn-group-justified')
export default class ButtonGroup extends BaseButtonGroup {
  /**
   * Set to true for the buttons to stretch at equal sizes to span the entire width of its parent.
   *
   * *Important*: You have to wrap every button component in a `div class="btn-group">`:
   *
   * ```handlebars
   * <div class="btn-group" role="group">
   * {{#bs-button}}My Button{{/bs-button}}
   * </div>
   * ```
   *
   * See http://getbootstrap.com/components/#btn-groups-justified
   *
   * @property justified
   * @type boolean
   * @default false
   * @public
   */
  @defaultValue
  justified = false;
}
