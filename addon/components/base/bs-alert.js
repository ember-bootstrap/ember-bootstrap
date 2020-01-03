import { classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import { action } from '@ember/object';
import { and, not } from '@ember/object/computed';
import { addObserver } from '@ember/object/observers';
import Component from '@ember/component';
import { later } from '@ember/runloop';
import layout from 'ember-bootstrap/templates/components/bs-alert';
import typeClass from 'ember-bootstrap/utils/cp/type-class';
import listenTo from 'ember-bootstrap/utils/cp/listen-to';
import usesTransition from 'ember-bootstrap/utils/cp/uses-transition';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

/**
  Implements [Bootstrap alerts](http://getbootstrap.com/components/#alerts)

  ### Usage

  By default it is a user dismissible alert with a fade out animation, both of which can be disabled. Be sure to set the
  `type` property for proper styling.

  ```hbs
  <BsAlert @type="success">
    <strong>Well done!</strong> You successfully read this important alert message.
  </BsAlert>
  ```

  @class Alert
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNameBindings('alert', 'fade', 'dismissible:alert-dismissible', 'typeClass')
export default class Alert extends Component {
  /**
   * A dismissible alert will have a close button in the upper right corner, that the user can click to dismiss
   * the alert.
   *
   * @property dismissible
   * @type boolean
   * @default true
   * @public
   */
  @defaultValue
  dismissible = true;

  /**
   * If true the alert is completely hidden. Will be set when the fade animation has finished.
   *
   * @property hidden
   * @type boolean
   * @default false
   * @readonly
   * @private
   */
  @defaultValue
  hidden = !this.get('_visible');

  /**
   * This property controls if the alert should be visible. If false it might still be in the DOM until the fade animation
   * has completed.
   *
   * When the alert is dismissed by user interaction this property will not update by using two-way bindings in order
   * to follow DDAU best practices. If you want to react to such changes, subscribe to the `onDismiss` action
   *
   * @property visible
   * @type boolean
   * @default true
   * @public
   */
  @defaultValue
  visible = true;

  /**
   * @property _visible
   * @private
   */
  @listenTo('visible')
  _visible;

  /**
   * @property notVisible
   * @private
   */
  @not('_visible')
  notVisible;

  /**
   * Set to false to disable the fade out animation when hiding the alert.
   *
   * @property fade
   * @type boolean
   * @default true
   * @public
   */
  @defaultValue
  fade = true;

  /**
   * Computed property to set the alert class to the component div. Will be false when dismissed to have the component
   * div (which cannot be removed form DOM by the component itself) without any markup.
   *
   * @property alert
   * @type boolean
   * @private
   */
  @not('hidden')
  alert;

  @and('_visible', 'fade')
  showAlert;

  /**
   * The duration of the fade out animation
   *
   * @property fadeDuration
   * @type number
   * @default 150
   * @public
   */
  @defaultValue
  fadeDuration = 150;

  /**
   * Property for type styling
   *
   * For the available types see the [Bootstrap docs](https://getbootstrap.com/docs/4.3/components/alerts/)
   *
   * @property type
   * @type String
   * @default 'default'
   * @public
   */
  @defaultValue
  type = 'default';

  @typeClass('alert', 'type')
  typeClass;

  /**
   * Use CSS transitions?
   *
   * @property usesTransition
   * @type boolean
   * @readonly
   * @private
   */
  @usesTransition('fade')
  usesTransition;

  /**
   * The action to be sent after the alert has been dismissed (including the CSS transition).
   *
   * @event onDismissed
   * @public
   */
  onDismissed() {}

  /**
   * The action is called when the close button is clicked.
   *
   * You can return false to prevent closing the alert automatically, and do that in your action by
   * setting `visible` to false.
   *
   * @event onDismiss
   * @public
   */
  onDismiss() {}

  @action
  dismiss() {
    if (this.get('onDismiss')() !== false) {
      this.set('_visible', false);
    }
  }

  /**
   * Call to make the alert visible again after it has been hidden
   *
   * @method show
   * @private
   */
  show() {
    this.set('hidden', false);
  }

  /**
   * Call to hide the alert. If the `fade` property is true, this will fade out the alert before being finally
   * dismissed.
   *
   * @method hide
   * @private
   */
  hide() {
    if (this.get('usesTransition')) {
      later(this, function() {
        if (!this.get('isDestroyed')) {
          this.set('hidden', true);
          this.get('onDismissed')();
        }
      }, this.get('fadeDuration'));
    } else {
      this.set('hidden', true);
      this.get('onDismissed')();
    }
  }

  _observeIsVisible() {
    if (this.get('_visible')) {
      this.show();
    } else {
      this.hide();
    }
  }

  init() {
    super.init(...arguments);

    addObserver(this, '_visible', null, this._observeIsVisible, true);
  }
}
