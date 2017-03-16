import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-button-group';
import SizeClass from 'ember-bootstrap/mixins/size-class';

const {
  A,
  copy,
  computed,
  isArray
} = Ember;

/**
 Bootstrap-style button group, that visually groups buttons, and optionally adds radio/checkbox like behaviour.
 See http://getbootstrap.com/components/#btn-groups

 Use as a block level component with any number of [Components.Button](Components.Button.html) components provided as
 a yielded pre-configured contextual component:

 ```handlebars
 {{#bs-button-group as |bg|}}
   {{#bg.button}}1{{/bg.button}}
   {{#bg.button}}2{{/s-bg.button}}
   {{#bg.button}}3{{/bg.button}}
 {{/bs-button-group}}
 ```

 ### Radio-like behaviour

 Use the `type` property set to "radio" to make the child buttons toggle like radio buttons, i.e. only one button can be active.
 Set the `value` property of the buttons to something meaningful. The `value` property of the button group will then reflect
 the value of the active button:

 ```handlebars
 {{#bs-button-group value=buttonGroupValue type="radio" onChange=(action (mut buttonGroupValue)) as |bg|}}
   {{#bg.button type="default" value=1}}1{{/bg.button}}
   {{#bg.button type="default" value=2}}2{{/bg.button}}
   {{#bg.button type="default" value=3}}3{{/bg.button}}
 {{/bs-button-group}}

 You selected: {{buttonGroupValue}}!
 ```

 ### Checkbox-like behaviour

 Set `type` to "checkbox" to make any number of child buttons selectable. The `value` property will be an array
 of all the values of the active buttons:

 ```handlebars
 {{#bs-button-group value=buttonGroupValue type="checkbox" onChange=(action (mut buttonGroupValue)) as |bg|}}
   {{#bg.button type="default" value=1}}1{{/bg.button}}
   {{#bg.button type="default" value=2}}2{{/bg.button}}
   {{#bg.button type="default" value=3}}3{{/bg.button}}
 {{/bs-button-group}}

 You selected:
 <ul>
 {{#each value in buttonGroupValue}}
   <li>{{value}}</li>
 {{/each}}
 </ul>
 ```

 @class ButtonGroup
 @namespace Components
 @extends Ember.Component
 @uses Mixins.SizeClass
 @public
 */
export default Ember.Component.extend(SizeClass, {
  layout,
  ariaRole: 'group',
  classNameBindings: ['vertical:btn-group-vertical:btn-group', 'justified:btn-group-justified'],

  /**
   * @property classTypePrefix
   * @type String
   * @default 'btn-group'
   * @protected
   */
  classTypePrefix: 'btn-group',

  /**
   * Set to true for a vertically stacked button group, see http://getbootstrap.com/components/#btn-groups-vertical
   *
   * @property vertical
   * @type boolean
   * @default false
   * @public
   */
  vertical: false,

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
  justified: false,

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
  type: null,

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
  value: undefined,

  /**
   * @property isRadio
   * @type boolean
   * @private
   */
  isRadio: computed.equal('type', 'radio').readOnly(),

  /**
   * This action is called whenever the button group's value should be changed because the user clicked a button.
   * You will receive the new value of the button group (based on the `type` property), which you should use to update the
   * `value` property.
   *
   * @event onChange
   * @param {*} value
   * @public
   */
  onChange() {},

  actions: {
    buttonPressed(pressedValue) {
      let newValue = copy(this.get('value'));

      if (this.get('isRadio')) {
        if (newValue !== pressedValue) {
          newValue = pressedValue;
        }
      } else {
        if (!isArray(newValue)) {
          newValue = A([pressedValue]);
        } else {
          newValue = A(newValue);
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
});
