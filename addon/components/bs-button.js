import Ember from 'ember';
import TypeClass from 'ember-bootstrap-components/mixins/type-class';
import SizeClass from 'ember-bootstrap-components/mixins/size-class';
import I18nSupport from 'ember-bootstrap-components/mixins/i18n-support';
import ComponentChild from 'ember-bootstrap-components/mixins/component-child';
import Waves from 'ember-bootstrap-components/mixins/waves';

/**
 Implements a HTML button element, with support for all [Bootstrap button CSS styles](http://getbootstrap.com/css/#buttons)
 as well as advanced functionality such as button states.

 ### Basic Usage

 ```hbs
 \{{#bs-button type="primary" icon="glyphicon glyphicon-download"}}
    Downloads
 \{{/bs-button}}
 ```

 ### Actions

 Set the action property of the component to send an action to your controller. The following parameters will be sent:
 * value: the button's value, see the `value` property
 * event: the browsers event object
 * callback: a function that may be called from the action handler to supply a Promise to the button component for automatic state handling

 ```hbs
 \{{#bs-button type="primary" icon="glyphicon glyphicon-download" action="download"}}
    Download
 \{{/bs-button}}
 ```

 ### States

 Use the `textState` property to change the label of the button. You can bind it to a controller property to set a "loading" state for example.
 The label of the button will be taken from the `<state>Text` property.

 ```hbs
 \{{bs-button type="primary" icon="glyphicon glyphicon-download" textState=buttonState defaultText="Download" loadingText="Loading..." action="download"}}
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

 ```hbs
 \{{bs-button type="primary" icon="glyphicon glyphicon-download" defaultText="Download" pendingText="Loading..." resolvedText="Completed!" rejectedText="Oups!?" action="download"}}
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

 ### I18n support

 Supports translateable properties if [ember-i18n](https://github.com/jamesarosen/ember-i18n) is present.
 See {{#crossLink "Mixins.I18nSupport"}}{{/crossLink}}


 @class Button
 @namespace Components
 @extends Ember.Component
 @uses Mixins.TypeClass
 @uses Mixins.SizeClass
 @uses Mixins.I18nSupport
*/
export default Ember.Component.extend(Ember._ProxyMixin, ComponentChild, TypeClass, SizeClass, I18nSupport, Waves, {
    tagName: 'button',
    classNames: ['btn'],
    classNameBindings: ['active', 'block:btn-block'],

    /**
     * @property classTypePrefix
     * @type String
     * @default 'btn'
     * @protected
     */
    classTypePrefix: 'btn',

    attributeBindings: ['disabled', 'buttonType:type', 'dismiss:data-dismiss', 'contentDismiss:data-dismiss', '_type:type', 'style'],

    getPojoProperties: function(pojo) {
      if (Ember.isEmpty(pojo)) {
        return [];
      }
      return Object.keys(pojo);
    },
    getProxiedProperties: function(proxyObject) {
      var contentProperties, objectProperties, prototypeProperties;
      contentProperties = this.getObjectProperties(proxyObject.get('content'));
      prototypeProperties = Object.keys(proxyObject.constructor.prototype);
      objectProperties = this.getPojoProperties(proxyObject);
      return contentProperties.concat(prototypeProperties).concat(objectProperties).uniq();
    },
    getEmberObjectProperties: function(emberObject) {
      var objectProperties, prototypeProperties;
      prototypeProperties = Object.keys(emberObject.constructor.prototype);
      objectProperties = this.getPojoProperties(emberObject);
      return prototypeProperties.concat(objectProperties).uniq();
    },
    getEmberDataProperties: function(emberDataObject) {
      var attributes, keys;
      attributes = Ember.get(emberDataObject.constructor, 'attributes');
      keys = Ember.get(attributes, 'keys.list');
      return Ember.getProperties(emberDataObject, keys);
    },
    getObjectProperties: function(object) {
      if (object instanceof DS.Model) {
        return this.getEmberDataProperties(object);
      } else if (object instanceof Ember.ObjectProxy || Ember._ProxyMixin.detect(object)) {
        return this.getProxiedProperties(object);
      } else if (object instanceof Ember.Object) {
        return this.getEmberObjectProperties(object);
      } else {
        return this.getPojoProperties(object);
      }
    },

    init: function() {
      var me, properties;
      this._super();
      this.get('reset');
      me = this;
      if ((this.get('content') != null) && Ember.typeOf(this.get('content')) === 'instance') {
        properties = this.getObjectProperties(this.get('content'));
        if (Ember.isPresent(this.get('content.action'))) {
          this.set('action', this.get('content.action'));
        }
        return this.getProperties(properties);
      } else {
        let content = this.get('content');
        this.set('content', {});
        if (this.get('defaultText') == null) {
          this.initParameters();
          return this.set('defaultText', content);
        }
      }
    },

  initParameters: function() {
    this.setProperties({
      defaultText: null,
      disabled: false,
      buttonType: 'button',
      active: false,
      block: false,
      toggle: false,
      iconInactive: null,
      value: null,
      textState: 'default',
      reset: null
    })
  },

    /**
     * Default label of the button. Not need if used as a block component
     *
     * @property defaultText
     * @type string
     * @public
     */
    //defaultText: null,

    /**
     * Property to disable the button
     *
     * @property disabled
     * @type boolaen
     * @default false
     * @public
     */
    //disabled: false,

    /**
     * Set the type of the button, either 'button' or 'submit'
     *
     * @property buttonType
     * @type String
     * @default 'button'
     * @public
     */
    //buttonType: 'button',

    /**
     * Set the 'active' class to apply active/pressed CSS styling
     *
     * @property active
     * @type boolean
     * @default false
     * @public
     */
    //active: false,

    /**
     * Property for block level buttons
     *
     * See the [Bootstrap docs](http://getbootstrap.com/css/#buttons-sizes)
     * @property block
     * @type boolean
     * @default false
     * @public
     */
    //block: false,

    /**
     * If toggle property is true, clicking the button will toggle the active state
     *
     * @property toggle
     * @type boolean
     * @default false
     * @public
     */
    //toggle: false,

    /**
     * If button is active and this is set, the icon property will match this property
     *
     * @property iconActive
     * @type String
     * @public
     */
    //iconActive: null,

    /**
     * If button is inactive and this is set, the icon property will match this property
     *
     * @property iconInactive
     * @type String
     * @public
     */
    //iconInactive: null,

    /**
     * Class(es) (e.g. glyphicons or font awesome) to use as a button icon
     * This will render a <i class="{{icon}}"></i> element in front of the button's label
     *
     * @property icon
     * @type String
     * @readonly
     * @protected
     */
    icon: Ember.computed('active', function() {
        if (this.get('active')) {
            return this.get('iconActive');
        } else {
            return this.get('iconInactive');
        }
    }),

    contentDismiss: Ember.computed.alias('content.dismiss'),

    /**
     * Supply a value that will be associated with this button. This will be send
     * as a parameter of the default action triggered when clicking the button
     *
     * @property value
     * @type any
     * @public
     */
    //value: null,

    /**
     * State of the button. The button's label (if not used as a block component) will be set to the
     * `<state>Text` property.
     * This property will automatically be set when using a click action that supplies the callback with an promise
     *
     * @property textState
     * @type String
     * @default 'default'
     * @protected
     */
    //textState: 'default',

    /**
     * Set this to true to reset the state. A typical use case is to bind this attribute with ember-data isDirty flag.
     *
     * @property reset
     * @type boolean
     * @public
     */
    //reset: null,

    /**
     * This will reset the state property to 'default', and with that the button's label to defaultText
     *
     * @method resetState
     * @protected
     */
    resetState: function() {
        this.set('textState', 'default');
    },

    resetObserver: Ember.observer('reset', function(){
      if(this.get('reset')){
        Ember.run.scheduleOnce('actions', this, function() {
          this.set('textState', 'default');
        });

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
        var callback = function(promise, disablePending) {
            if (Ember.isNone(disablePending)) {
              disablePending = false;
            }
            if (promise) {
                that.set('textState', 'pending');
                if (disablePending) {
                  that.set('disabled', true);
                }
                promise.then(
                    function(){
                        if (!that.get('isDestroyed')) {
                          if (Ember.isPresent(that.get('resolvedText'))) {
                            that.set('textState', 'resolved');
                          }
                          else {
                            that.resetState();
                          }
                        }
                    },
                    function(){
                        if (!that.get('isDestroyed')) {
                          if (Ember.isPresent(that.get('rejectedText'))) {
                            that.set('textState', 'rejected');
                          }
                          else {
                            that.resetState();
                          }
                        }

                    }
                ).finally(function() {
                    if (disablePending) {
                      that.set('disabled', false);
                    }

                  });
            }
        };
        this.sendAction('action', this.get('value'), evt, callback);
    }

});
