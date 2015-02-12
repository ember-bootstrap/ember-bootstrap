import Ember from 'ember';
import Button from 'ember-bootstrap/components/bs-button';
import SizeClass from 'ember-bootstrap/mixins/size-class';

/**
 Bootstrap-style button group, that visually groups buttons, and optionally adds radio/checkbox like behaviour.
 See http://getbootstrap.com/components/#btn-groups

 Use as a block level component with any number of Button components as children:

 ```handlebars
 \{{#bs-button-group}}
    \{{#bs-button}}1\{{/bs-button}}
    \{{#bs-button}}2\{{/bs-button}}
    \{{#bs-button}}3\{{/bs-button}}
 \{{/bs-button-group}}
 ```

 ### Radio-like behaviour

 Use the `type` property set to "radio" to make the child buttons toggle like radio buttons, i.e. only one button can be active.
 Set the `value` property of the buttons to something meaningful. The `value` property of the button group will then reflect
 the value of the active button:

 ```handlebars
 \{{#bs-button-group value=buttonGroupValue type="radio"}}
    \{{#bs-button value=1}}1\{{/bs-button}}
    \{{#bs-button value=2}}2\{{/bs-button}}
    \{{#bs-button value=3}}3\{{/bs-button}}
 \{{/bs-button-group}}

 You selected: \{{buttonGroupValue}}!
 ```

 ### Checkbox-like behaviour

 Set `type` to "checkbox" to make any number of child buttons selectable. The `value` property will be an array
 of all the values of the active buttons:

 ```handlebars
 \{{#bs-button-group value=buttonGroupValue type="checkbox"}}
    \{{#bs-button value=1}}1\{{/bs-button}}
    \{{#bs-button value=2}}2\{{/bs-button}}
    \{{#bs-button value=3}}3\{{/bs-button}}
 \{{/bs-button-group}}

 You selected:
 <ul>
 \{{#each value in buttonGroupValue}}
    <li>\{{value}}</li>
 \{{/each}}
 </ul>
 ```

 @class Button-Group
 @namespace Bootstrap
 @extends Ember.Component
 @uses Bootstrap.SizeClass
 */
export default Ember.Component.extend(SizeClass, {

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
    classNameBindings: ['vertical:btn-group-vertical','justified:btn-group-justified'],

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
     * \{{#bs-button}}My Button{{/bs-button}}
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
     * See the {{#crossLink "Button-Group/type:attribute"}}`type` property{{/crossLink}} for how the value property is constructed.
     *
     * When you set the value, the corresponding buttons will be activated:
     * * use a single value for a radio button group to activate the button with the same value
     * * use an aray of values for a checkbox button group to activate all the buttons with values contained in the array
     *
     * @property value
     * @type array|any
     * @public
     */
    value: Ember.computed('activeChildren.@each.value','type',function(key, value){
        if (arguments.length>1) {
            var values = !Ember.isArray(value) ? [value] : value;
            this.get('childButtons')
                .forEach(function(button) {
                    button.set('active', values.contains(button.get('value')));
                });
            return value;
        }
        switch (this.get('type')) {
            case 'radio':
                return this.get('activeChildren.firstObject.value');
            case 'checkbox':
                return this.get('activeChildren').mapBy('value');
        }
        return 1;
    }),

    /**
     * Array of all child buttons (instances of Bootstrap.Button)
     * @property childButtons
     * @type array
     * @protected
     */
    childButtons: Ember.computed.filter('childViews', function(view) {
        return view instanceof Button;
    }),


    /**
     * Child buttons that are active (pressed)
     * @property activeChildren
     * @type array
     * @protected
     */
    activeChildren: Ember.computed.filterBy('childButtons', 'active', true),


    lastActiveChildren: [],
    newActiveChildren: Ember.computed.setDiff('activeChildren','lastActiveChildren'),
    _observeButtons: Ember.observer('activeChildren.[]','type', function() {
        if (this.get('type') !== 'radio') {
            return;
        }

        Ember.run.scheduleOnce('actions',this, function(){
            // the button that just became active
            var newActive = this.get('newActiveChildren.firstObject');

            if (newActive) {
                this.beginPropertyChanges();
                this.get('childButtons').forEach(function(button){
                    if (button !== newActive) {
                        button.set('active', false);
                    }
                });

                this.endPropertyChanges();
            }
            // remember activeChildren, used as a replacement for a before observer as they will be deprecated in the future...
            this.set('lastActiveChildren', this.get('activeChildren').slice());
        });
    }),

    _observeType: Ember.observer('type','childButtons.[]', function() {
        if (this.get('type') === 'radio' || this.get('type') === 'checkbox') {
            // set all child buttons to toggle
            this.get('childButtons').forEach(function(button) {
                button.set('toggle', true);
            });
        }
    }),

    init: function() {
        this._super();
        this.get('activeChildren');
    }




});
