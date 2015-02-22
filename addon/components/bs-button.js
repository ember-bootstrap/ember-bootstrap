import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';
import SizeClass from 'ember-bootstrap/mixins/size-class';

/**
 Implements a HTML button element, with support for all [Bootstrap button CSS styles](http://getbootstrap.com/css/#buttons)
 as well as advanced functionality such as button states.

 ### Basic Usage

 ```handlebars
 \{{#bs-button type="primary" icon="glyphicon glyphicon-download"}}Download{{/bs-button}}
 ```

 ### Actions

 Set the action property of the component to send an action to your controller. The following parameters will be sent:
 * value: the button's value, see the `value` property
 * event: the browsers event object
 * callback: a function that may be called from the action handler to supply a Promise to the button component for automatic state handling

 ```handlebars
 \{{#bs-button type="primary" icon="glyphicon glyphicon-download" action="download"}}
    Download
 {{/bs-button}}
 ```

 ### States

 Use the `textState` property to change the label of the button. You can bind it to a controller property to set a "loading" state for example.
 The label of the button will be taken from the `<state>Text` property.

 ```handlebars
 {{bs-button type="primary" icon="glyphicon glyphicon-download" textState=buttonState defaultText="Download" loadingText="Loading..." action="download"}}
 ```

 ```js
 App.ApplicationController = Ember.Controller.extend({
   buttonState: "default"
   actions: {
     download: function() {
       this.set("buttonState", "loading");
     }
   }
 });
 ```

 ### Promise support for automatic state change

 When using the callback function of the click action to supply a Promise for any asynchronous operation the button will
 manage its `textState` property automatically, changing its value according to the state of the promise:
 "default" > "pending" > "resolved"/"rejected"

 ```handlebars
 {{bs-button type="primary" icon="glyphicon glyphicon-download" defaultText="Download" pendingText="Loading..." resolvedText="Completed!" rejectedText="Oups!?" action="download"}}
 ```

 ```js
 App.ApplicationController = Ember.Controller.extend({
   actions: {
     download: function(actionParam, evt, cb) {
       promise = new Ember.RSVP.Promise(...);
       cb(promise);
     }
   }
 });
 ```

 @class Button
 @namespace Bootstrap
 @extends Ember.Component
 @uses Bootstrap.TypeClass
 @uses Bootstrap.SizeClass
*/
export default Ember.Component.extend(TypeClass, SizeClass, {
    tagName: 'button',

    /**
     * @property classNames
     * @type array
     * @default ['btn']
     * @protected
     */
    classNames: ['btn'],

    /**
     * @property classNameBindings
     * @type array
     * @default ['active', 'block:btn-block']
     * @protected
     */
    classNameBindings: ['active', 'block:btn-block'],

    /**
     * @property classTypePrefix
     * @type String
     * @default 'btn'
     * @protected
     */
    classTypePrefix: 'btn',

    /**
     * @property attributeBindings
     * @type array
     * @default ['id', 'disabled', 'buttonType:type']
     * @protected
     */
    attributeBindings: ['id', 'disabled', 'buttonType:type'],

    /**
     * Default label of the button. Not need if used as a block component
     *
     * @property defaultText
     */
    defaultText: null,

    /**
     * Property to disable the button
     *
     * @property disabled
     */
    disabled: false,

    /**
     * Set the type of the button, either 'button' or 'submit'
     *
     * @property buttonType
     * @type String
     * @default 'button'
     */
    buttonType: 'button',

    /**
     * Set the 'active' class to apply active/pressed CSS styling
     *
     * @property active
     * @type boolean
     * @default false
     */
    active: false,

    /**
     * Property for block level buttons
     *
     * See the [Bootstrap docs](http://getbootstrap.com/css/#buttons-sizes)
     * @property block
     * @type boolean
     * @default false
     */
    block: false,

    /**
     * If toggle property is true, clicking the button will toggle the active state
     *
     * @property toggle
     * @type boolean
     * @default false
     */
    toggle: false,

    /**
     * If button is active and this is set, the icon property will match this property
     *
     * @property iconActive
     * @type String
     */
    iconActive: null,

    /**
     * If button is inactive and this is set, the icon property will match this property
     *
     * @property iconInactive
     * @type String
     */
    iconInactive: null,

    /**
     * Property for type styling
     *
     * For the available types see the [Bootstrap docs](http://getbootstrap.com/css/#buttons-options) (use without "btn-" prefix)
     * A button has the default type 'default'.
     *
     * @property type
     * @type String
     * @default 'default'
     */
    type: 'default',

    /**
     * Class(es) (e.g. glyphicons or font awesome) to use as a button icon
     * This will render a <i class="{{icon}}"></i> element in front of the button's label
     *
     * @property icon
     * @type String
     */
    icon: Ember.computed('active', function() {
        if (this.get('active')) {
            return this.get('iconActive');
        } else {
            return this.get('iconInactive');
        }
    }),


    /**
     * Supply a value that will be associated with this button. This will be send
     * as a parameter of the default action triggered when clicking the button
     *
     * @property value
     * @type any
     */
    value: null,

    /**
     * State of the button. The button's label (if not used as a block component) will be set to the
     * `<state>Text` property.
     * This property will automatically be set when using a click action that supplies the callback with an promise
     *
     * @property textState
     * @type String
     * @default 'default'
     */
    textState: 'default',

    /**
     * Set this to true to reset the state. A typical use case is to bind this attribute with ember-data isDirty flag.
     *
     * @property reset
     * @type boolean
     */
    reset: null,

    /**
     * This will reset the state property to 'default', and with that the button's label to defaultText
     *
     * @method resetState
     */
    resetState: function() {
        this.set('textState', 'default');
    },

    resetObserver: Ember.observer('reset', function(){
        if(this.get('reset')){
            this.resetState();
        }
    }),

    text: Ember.computed('textState', 'defaultText', 'pendingText', 'resolvedText', 'rejectedText', function() {
        return this.getWithDefault(this.get('textState') + 'Text', this.get('defaultText'));
    }),

    /**
     * Click handler. This will send the default "action" action, with the following parameters:
     * * value of the button (that is the value of the "value" property)
     * * original event object of the click event
     * * callback: call that with a promise object, and the buttons state will automatically set to "pending", "resolved" and/or "rejected"
     *
     * @method click
     * @protected
     * @param evt
     */
    click: function(evt) {
        if (this.get('toggle')) {
            this.toggleProperty('active');
        }
        var that = this;
        var callback = function(promise) {
            if (promise) {
                that.set('textState', 'pending');
                promise.then(
                    function(){
                        if (!that.get('isDestroyed')) {
                            that.set('textState', 'resolved');
                        }
                    },
                    function(){
                        if (!that.get('isDestroyed')) {
                            that.set('textState', 'rejected');
                        }
                    }
                );
            }
        };
        this.sendAction('action', this.get('value'), evt, callback);
    }


});
