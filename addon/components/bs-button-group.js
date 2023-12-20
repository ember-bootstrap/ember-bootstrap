import { action } from '@ember/object';
import Component from '@glimmer/component';
import { A, isArray } from '@ember/array';

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

  *Note that only invoking the component in a template as shown above is considered part of its public API. Extending from it (subclassing) is generally not supported, and may break at any time.*

  @class ButtonGroup
  @namespace Components
  @extends Glimmer.Component
  @public
*/
export default class ButtonGroup extends Component {
  /**
   * @property buttonComponent
   * @type {String}
   * @private
   */

  /**
   * Set to true for a vertically stacked button group, see http://getbootstrap.com/components/#btn-groups-vertical
   *
   * @property vertical
   * @type boolean
   * @default false
   * @public
   */

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
   * Property for size styling, set to 'lg', 'sm' or 'xs'
   *
   * Also see the [Bootstrap docs](https://getbootstrap.com/docs/4.3/components/button-group/#sizing)
   *
   * @property size
   * @type String
   * @public
   */

  /**
   * This action is called whenever the button group's value should be changed because the user clicked a button.
   * You will receive the new value of the button group (based on the `type` property), which you should use to update the
   * `value` property.
   *
   * @event onChange
   * @param {*} value
   * @public
   */

  @action
  buttonPressed(pressedValue) {
    if (!this.args.onChange) {
      return;
    }
    let newValue;

    if (this.args.type === 'radio') {
      if (pressedValue === this.args.value) {
        return;
      }
      newValue = pressedValue;
    } else {
      if (!isArray(this.args.value)) {
        newValue = [pressedValue];
      } else {
        if (this.args.value.includes(pressedValue)) {
          newValue = this.args.value.filter((v) => v !== pressedValue);
        } else {
          newValue = [...this.args.value, pressedValue];
        }
      }

      // For compatibility we continue to return an EmberArray instance for now
      // @todo this should be changed for the next major release!
      newValue = A(newValue);
    }

    this.args.onChange(newValue);
  }
}
