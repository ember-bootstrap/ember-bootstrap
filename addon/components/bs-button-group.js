import Ember from 'ember';
import SizeClass from 'ember-bootstrap/mixins/size-class';
import ComponentParent from 'ember-bootstrap/mixins/component-parent';

const { computed, observer } = Ember;

/**
 Bootstrap-style button group, that visually groups buttons, and optionally adds radio/checkbox like behaviour.
 See http://getbootstrap.com/components/#btn-groups

 Use as a block level component with any number of [Components.Button](Components.Button.html) components as children:

 ```handlebars
 {{#bs-button-group}}
   {{#bs-button}}1{{/bs-button}}
   {{#bs-button}}2{{/bs-button}}
   {{#bs-button}}3{{/bs-button}}
 {{/bs-button-group}}
 ```

 ### Radio-like behaviour

 Use the `type` property set to "radio" to make the child buttons toggle like radio buttons, i.e. only one button can be active.
 Set the `value` property of the buttons to something meaningful. The `value` property of the button group will then reflect
 the value of the active button:

 ```handlebars
 {{#bs-button-group value=buttonGroupValue type="radio"}}
   {{#bs-button value='foo'}}foo{{/bs-button}}
   {{#bs-button value='bar'}}bar{{/bs-button}}
   {{#bs-button value='baz'}}baz{{/bs-button}}
 {{/bs-button-group}}

 You selected: {{buttonGroupValue}}!
 ```

 ### Checkbox-like behaviour

 Set `type` to "checkbox" to make any number of child buttons selectable. The `value` property will be an array
 of all the values of the active buttons:

 ```handlebars
 {{#bs-button-group value=buttonGroupValue type="checkbox"}}
   {{#bs-button value='foo'}}foo{{/bs-button}}
   {{#bs-button value='bar'}}bar{{/bs-button}}
   {{#bs-button value='baz'}}baz{{/bs-button}}
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
export default Ember.Component.extend(ComponentParent, SizeClass, {
  /**
   * @type string
   * @property ariaRole
   * @default 'group'
   * @protected
   */
  ariaRole: 'group',

  /**
   * @property classNames
   * @type array
   * @default ['btn-group']
   * @protected
   */
  classNames: ['btn-group'],

  /**
   * @property classNameBindings
   * @type array
   * @protected
   */
  classNameBindings: ['vertical:btn-group-vertical', 'justified:btn-group-justified'],

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
   * * the buttons will toggle (`toggle` property of the child buttons will be set to true)
   * * only one button may be active
   * * the `value` property of the button group will reflect the `value` property of the active button
   *
   * ### checkbox
   * if `type` is set to "checkbox", the buttons will behave like checkboxes:
   * * the buttons will toggle (`toggle` property of the child buttons will be set to true)
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

  _syncValueToActiveButtons: observer('value', 'children.@each.value', '_inDOM', function() {
    if (!this._inDOM) {
      return;
    }
    let value = this.get('value');
    let values = Ember.A(!Ember.isArray(value) ? [value] : value);
    this.get('children')
      .forEach(function(button) {
        button.set('active', values.includes(button.get('value')));
      });
  }),

  /**
   * Child buttons that are active (pressed)
   * @property activeChildren
   * @type array
   * @protected
   */
  activeChildren: computed.filterBy('children', 'active', true),

  lastActiveChildren: null,
  newActiveChildren: computed.setDiff('activeChildren', 'lastActiveChildren'),
  _observeButtons: observer('activeChildren.[]', 'type', function() {
    let type = this.get('type');

    if (!this._inDOM || (type !== 'radio' && type !== 'checkbox')) {
      return;
    }

    Ember.run.scheduleOnce('actions', this, function() {
      // the button that just became active
      let value;

      switch (type) {
        case 'radio':
          let newActive = Ember.A(this.get('newActiveChildren')).objectAt(0);
          if (newActive) {
            value = newActive.get('value');
          } else {
            let lastActive = this.get('lastActiveChildren.firstObject');
            if (lastActive) {
              lastActive.set('active', true);
            }
          }
          break;
        case 'checkbox':
          value = this.get('activeChildren').mapBy('value');
          break;
      }
      if (typeof value !== 'undefined') {
        this.set('value', value);
      }
      // remember activeChildren, used as a replacement for a before observer as they will be deprecated in the future...
      this.set('lastActiveChildren', Ember.A(this.get('activeChildren').slice()));
    });
  }),

  _observeType: observer('type', 'children.[]', function() {
    if (this.get('type') === 'radio' || this.get('type') === 'checkbox') {
      // set all child buttons to toggle
      this.get('children').forEach(function(button) {
        button.set('toggle', true);
      });
    }
  }),

  init() {
    this._super();
    this.set('lastActiveChildren', Ember.A());
  },

  _inDOM: false,

  didInsertElement() {
    this.set('_inDOM', true);
    this.get('activeChildren');
  }
});
