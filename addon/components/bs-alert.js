import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';

const { computed, observer } = Ember;

/**
 Implements Bootstrap alerts, see http://getbootstrap.com/components/#alerts

 By default it is a user dismissible alert with a fade out animation, both of which can be disabled. Be sure to set the
 `type` property for proper styling.

 ```hbs
 {{#bs-alert type="success"}}
 <strong>Well done!</strong> You successfully read this important alert message.
 {{/bs-alert}}
 ```

 @class Alert
 @namespace Components
 @extends Ember.Component
 @uses Mixins.TypeClass
 @public
 */
export default Ember.Component.extend(TypeClass, {
  classNameBindings: ['alert', 'fade', 'in'],

  /**
   * A dismissible alert will have a close button in the upper right corner, that the user can click to dismiss
   * the alert.
   *
   * @property dismissible
   * @type boolean
   * @default true
   * @public
   */
  dismissible: true,

  /**
   * If true the alert is completely hidden. Will be set when the fade animation has finished.
   *
   * @property hidden
   * @type boolean
   * @default false
   * @readonly
   * @protected
   */
  hidden: false,

  /**
   * This property controls if the alert should be visible. If false it might still be in the DOM until the fade animation
   * has completed.
   *
   * @property visible
   * @type boolean
   * @default true
   * @public
   */
  visible: true,
  notVisible: computed.not('visible'),

  /**
   * Set to false to disable the fade out animation when hiding the alert.
   *
   * @property fade
   * @type boolean
   * @default true
   * @public
   */
  fade: true,

  /**
   * Computed property to set the alert class to the component div. Will be false when dismissed to have the component
   * div (which cannot be removed form DOM by the component itself) without any markup.
   *
   * @property alert
   * @type boolean
   * @private
   */
  alert: computed.not('hidden'),
  in: computed.and('visible', 'fade'),

  /**
   * @property classTypePrefix
   * @type String
   * @default 'alert'
   * @protected
   */
  classTypePrefix: 'alert',

  /**
   * The duration of the fade out animation
   *
   * @property fadeDuration
   * @type integer
   * @default 150
   * @public
   */
  fadeDuration: 150,

  /**
   * The action to be sent after the alert has been dismissed (including the CSS transition).
   *
   * @property dismissedAction
   * @type string
   * @default null
   * @public
   */
  dismissedAction: null,

  actions: {
    dismiss() {
      this.set('visible', false);
    }
  },

  _onVisibleChange: observer('visible', function() {
    if (this.get('visible')) {
      this.show();
    } else {
      this.hide();
    }
  }),

  /**
   * Call to make the alert visible again after it has been hidden
   *
   * @method show
   * @private
   */
  show() {
    this.setProperties({
      hidden: false
    });
  },

  /**
   * Call to hide the alert. If the `fade` property is true, this will fade out the alert before being finally
   * dismissed.
   *
   * @method hide
   * @private
   */
  hide() {
    if (this.get('fade')) {
      Ember.run.later(this, function() {
        if (!this.get('isDestroyed')) {
          this.set('hidden', true);
          this.sendAction('dismissedAction');
        }
      }, this.get('fadeDuration'));
    } else {
      this.setProperties({
        hidden: true
      });
      this.sendAction('dismissedAction');
    }
  },

  init() {
    this._super(...arguments);
    this.set('hidden', !this.get('visible'));
  }
});