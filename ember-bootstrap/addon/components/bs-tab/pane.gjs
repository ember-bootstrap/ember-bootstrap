import Component from '@glimmer/component';
import { scheduleOnce } from '@ember/runloop';
import transitionEnd from 'ember-bootstrap/utils/transition-end';
import usesTransition from 'ember-bootstrap/utils/decorators/uses-transition';
import { guidFor } from '@ember/object/internals';
import { ref } from 'ember-ref-bucket';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

/**
 The tab pane of a tab component.
 See [Components.Tab](Components.Tab.html) for examples.

 @class TabPane
 @namespace Components
 @extends Component
 @public
 */
export default class TabPane extends Component {
  /**
   * @property id
   * @type null | HTMLElement
   */
  @ref('mainNode') _element = null;
  /**
   * @property id
   * @type string
   * @public
   */
  get id() {
    return this.args.id ?? guidFor(this);
  }

  /**
   * @property activeId
   * @private
   */
  get activeId() {
    return this.args.activeId ?? null;
  }

  /**
   * True if this pane is active (visible)
   *
   * @property isActive
   * @type boolean
   * @readonly
   * @private
   */
  get isActive() {
    return this.activeId === this.id;
  }

  /**
   * Used to apply Bootstrap's "active" class
   *
   * @property active
   * @type boolean
   * @default false
   * @private
   */
  @tracked
  active = this.args.active ?? false;

  /**
   * Used to trigger the Bootstrap visibility classes.
   *
   * @property showContent
   * @type boolean
   * @default false
   * @private
   */
  @tracked
  showContent = this.args.showContent ?? false;

  /**
   * The title for this tab pane. This is used by the `bs-tab` component to automatically generate
   * the tab navigation.
   * See the [Components.Tab](Components.Tab.html) for examples.
   *
   * @property title
   * @type string
   * @default null
   * @public
   */
  get title() {
    return this.args.title ?? null;
  }

  /**
   * An optional group title used by the `bs-tab` component to group all panes with the same group title
   * under a common drop down in the tab navigation.
   * See the [Components.Tab](Components.Tab.html) for examples.
   *
   * @property groupTitle
   * @type string
   * @default null
   * @public
   */
  get groupTitle() {
    return this.args.groupTitle ?? null;
  }

  /**
   * Use fade animation when switching tabs.
   *
   * @property fade
   * @type boolean
   * @private
   */
  get fade() {
    return this.args.fade ?? true;
  }

  /**
   * The duration of the fade out animation
   *
   * @property fadeDuration
   * @type number
   * @default 150
   * @private
   */
  get fadeDuration() {
    return this.args.fadeDuration ?? 150;
  }

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
   * Show the pane
   *
   * @method show
   * @protected
   */
  show() {
    if (this.usesTransition) {
      if (!this._element) {
        // _element is initially set by `{{create-ref}}` which happens in next run loop, so can be undefined here.
        this.active = true;
        this.showContent = true;
      } else {
        transitionEnd(this._element, this.fadeDuration).then(() => {
          if (!this.isDestroyed) {
            this.active = true;
            this.showContent = true;
          }
        });
      }
    } else {
      this.active = true;
    }
  }

  /**
   * Hide the pane
   *
   * @method hide
   * @protected
   */
  hide() {
    if (this.usesTransition) {
      transitionEnd(this._element, this.fadeDuration).then(() => {
        if (!this.isDestroyed) {
          this.active = false;
        }
      });
      this.showContent = false;
    } else {
      this.active = false;
    }
  }

  @action
  showHide() {
    if (this.isActive) {
      this.show();
    } else {
      this.hide();
    }
  }

  _setActive() {
    this.active = this.isActive;
    this.showContent = this.isActive && this.fade;
  }

  constructor(owner, args) {
    super(owner, args);

    args.registerChild?.(this);

    // isActive comes from parent component, so only available after render...
    scheduleOnce('afterRender', this, this._setActive);
  }

  willDestroy() {
    super.willDestroy();
    this.args.unregisterChild?.(this);
  }

  @action
  updateActive() {
    this.active = this.args.active;
  }

  @action
  updateShowContent() {
    this.showContent = this.args.showContent;
  }
}
