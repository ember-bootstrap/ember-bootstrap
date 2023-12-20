import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';
import usesTransition from 'ember-bootstrap/utils/decorators/uses-transition';
import arg from 'ember-bootstrap/utils/decorators/arg';

/**
  Implements [Bootstrap alerts](http://getbootstrap.com/components/#alerts)

  ### Usage

  By default, it is a user dismissible alert with a fade out animation, both of which can be disabled. Be sure to set the
  `type` property for proper styling.

  ```hbs
  <BsAlert @type="success">
    <strong>Well done!</strong> You successfully read this important alert message.
  </BsAlert>
  ```

  Optionally you can render a header for the alert using named blocks syntax:

  ```hbs
  <BsAlert>
    <:header>
      Well done!
    </:header>
    <:body>
      You successfully read this important alert message.
    </:body>
  </BsAlert>
  ```

  The header is rendered using a `<h4>` element by default. You can customize
  that one by setting `@headerTag` argument of `<BsAlert>`.

  Using named block syntax as shown above may require installing
  [ember-named-blocks-polyfill](https://github.com/ember-polyfills/ember-named-blocks-polyfill)
  in your project depending on the Ember version used.

  *Note that only invoking the component in a template as shown above is considered part of its public API. Extending from it (subclassing) is generally not supported, and may break at any time.*

  @class Alert
  @namespace Components
  @extends Glimmer.Component
  @public
*/
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
  @arg
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
  @tracked
  hidden = !this.visible;

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
  get visible() {
    return this._visible ?? true;
  }

  /**
   * @property _visible
   * @private
   */
  @tracked
  _visible = this.args.visible;

  /**
   * Set to false to disable the fade out animation when hiding the alert.
   *
   * @property fade
   * @type boolean
   * @default true
   * @public
   */
  @arg
  fade = true;

  get showAlert() {
    return this.visible && this.args.fade !== false;
  }

  /**
   * The duration of the fade out animation
   *
   * @property fadeDuration
   * @type number
   * @default 150
   * @public
   */
  @arg
  fadeDuration = 150;

  /**
   * Property for type styling
   *
   * For the available types see the [Bootstrap docs](https://getbootstrap.com/docs/4.3/components/alerts/)
   *
   * @property type
   * @type String
   * @public
   */

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

  /**
   * The action is called when the close button is clicked.
   *
   * You can return false to prevent closing the alert automatically, and do that in your action by
   * setting `visible` to false.
   *
   * @event onDismiss
   * @public
   */

  @action
  dismiss() {
    if (this.args.onDismiss?.() !== false) {
      this._visible = false;
    }
  }

  /**
   * Call to make the alert visible again after it has been hidden
   *
   * @method show
   * @private
   */
  show() {
    this.hidden = false;
  }

  /**
   * Call to hide the alert. If the `fade` property is true, this will fade out the alert before being finally
   * dismissed.
   *
   * @method hide
   * @private
   */
  hide() {
    if (this.hidden) {
      return;
    }

    if (this.usesTransition) {
      later(
        this,
        function () {
          if (!this.isDestroyed) {
            this.hidden = true;
            this.args.onDismissed?.();
          }
        },
        this.fadeDuration,
      );
    } else {
      this.hidden = true;
      this.args.onDismissed?.();
    }
  }

  @action
  showOrHide() {
    if (this.visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  @action
  updateVisibility() {
    this._visible = this.args.visible;
  }
}
