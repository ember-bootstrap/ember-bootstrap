import { action } from '@ember/object';
import { classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import { equal } from '@ember/object/computed';
import Component from '@ember/component';
import { A, isArray } from '@ember/array';
import layout from 'ember-bootstrap/templates/components/bs-button-group';
import sizeClass from 'ember-bootstrap/utils/cp/size-class';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

/**
  Bootstrap-style button group, that visually groups buttons, and optionally adds radio/checkbox like behaviour.
  See http://getbootstrap.com/components/#btn-groups

  Use as a block level component with any number of [Components.Button](Components.Button.html) components provided as
  a yielded pre-configured contextual component:

  ```handlebars
  <BsButtonGroup as |bg|>
    <bg.button>1</bg.button>
    <bg.button>2</bg.button>
    <bg.button>3</bg.button>
  </BsButtonGroup>
  ```

  ### Radio-like behaviour

  Use the `type` property set to "radio" to make the child buttons toggle like radio buttons, i.e. only one button can be active.
  Set the `value` property of the buttons to something meaningful. The `value` property of the button group will then reflect
  the value of the active button:

  ```handlebars
  <BsButtonGroup @value={{this.buttonGroupValue}} @type="radio" @onChange={{action (mut this.buttonGroupValue}} as |bg|>
    <bg.button @type="default" @value={{1}}>1</bg.button>
    <bg.button @type="default" @value={{2}}>2</bg.button>
    <bg.button @type="default" @value={{3}}>3</bg.button>
  </BsButtonGroup>

  You selected: {{this.buttonGroupValue}}!
  ```

  ### Checkbox-like behaviour

  Set `type` to "checkbox" to make any number of child buttons selectable. The `value` property will be an array
  of all the values of the active buttons:

  ```handlebars
  <BsButtonGroup @value={{this.buttonGroupValue}} @type="checkbox" @onChange={{action (mut this.buttonGroupValue}} as |bg|>
    <bg.button @type="default" @value={{1}}>1</bg.button>
    <bg.button @type="default" @value={{2}}>2</bg.button>
    <bg.button @type="default" @value={{3}}>3</bg.button>
  </BsButtonGroup>

  You selected:
  <ul>
    {{#each value in this.buttonGroupValue}}
      <li>{{value}}</li>
    {{/each}}
  </ul>
  ```

  @class ButtonGroup
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNameBindings('vertical:btn-group-vertical:btn-group', 'sizeClass')
export default class ButtonGroup extends Component {
  ariaRole = 'group';

  /**
   * @property buttonComponent
   * @type {String}
   * @private
   */
  @defaultValue
  buttonComponent = 'bs-button-group/button';

  /**
   * Set to true for a vertically stacked button group, see http://getbootstrap.com/components/#btn-groups-vertical
   *
   * @property vertical
   * @type boolean
   * @default false
   * @public
   */
  @defaultValue
  vertical = false;

  /**
   * The type of the button group specifies how child buttons behave and how the `value` property will be computed:
   *
   * ### null
   * If `type` is not set (null), the button group will add no functionality besides Bootstrap styling
   *
   * ### radio
   * if `type` is set to "radio", the buttons will behave like radio buttons:
   * * the `value` property of the button group will reflect the `value` property of the active button
   * * thus only one button may be active
   *
   * ### checkbox
   * if `type` is set to "checkbox", the buttons will behave like checkboxes:
   * * any number of buttons may be active
   * * the `value` property of the button group will be an array containing the `value` properties of all active buttons
   *
   * @property type
   * @type string
   * @default null
   * @public
   */

  /**
   * The value of the button group, computed by its child buttons.
   * See the `type` property for how the value property is constructed.
   *
   * When you set the value, the corresponding buttons will be activated:
   * * use a single value for a radio button group to activate the button with the same value
   * * use an array of values for a checkbox button group to activate all the buttons with values contained in the array
   *
   * @property value
   * @type array
   * @public
   */

  /**
   * @property isRadio
   * @type boolean
   * @private
   */
  @(equal('type', 'radio').readOnly())
  isRadio;

  /**
   * Property for size styling, set to 'lg', 'sm' or 'xs'
   *
   * Also see the [Bootstrap docs](https://getbootstrap.com/docs/4.3/components/button-group/#sizing)
   *
   * @property size
   * @type String
   * @public
   */
  @defaultValue
  size = null;

  @sizeClass('btn-group', 'size')
  sizeClass;

  /**
   * This action is called whenever the button group's value should be changed because the user clicked a button.
   * You will receive the new value of the button group (based on the `type` property), which you should use to update the
   * `value` property.
   *
   * @event onChange
   * @param {*} value
   * @public
   */
  onChange() {}

  @action
  buttonPressed(pressedValue) {
    let newValue;

    if (this.get('isRadio')) {
      newValue = pressedValue;
    } else {
      if (!isArray(this.get('value'))) {
        newValue = A([pressedValue]);
      } else {
        newValue = A(this.get('value').slice());
        if (newValue.includes(pressedValue)) {
          newValue.removeObject(pressedValue);
        } else {
          newValue.pushObject(pressedValue);
        }
      }
    }

    this.get('onChange')(newValue);
  }
}
