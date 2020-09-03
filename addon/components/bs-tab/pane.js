import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { addObserver } from '@ember/object/observers';
import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import ComponentChild from 'ember-bootstrap/mixins/component-child';
import transitionEnd from 'ember-bootstrap/utils/transition-end';
import usesTransition from 'ember-bootstrap/utils/cp/uses-transition';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import { guidFor } from '@ember/object/internals';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';
import { ref } from 'ember-ref-bucket';

/**
 The tab pane of a tab component.
 See [Components.Tab](Components.Tab.html) for examples.

 @class TabPane
 @namespace Components
 @extends Ember.Component
 @uses Mixins.ComponentChild
 @public
 */
@tagName('')
@deprecateSubclassing
export default class TabPane extends Component.extend(ComponentChild) {
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
  id = guidFor(this);

  /**
   * @property activeId
   * @private
   */
  @defaultValue
  activeId = null;

  /**
   * True if this pane is active (visible)
   *
   * @property isActive
   * @type boolean
   * @readonly
   * @private
   */
  @(computed('activeId', 'id').readOnly())
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
  @defaultValue
  active = false;

  /**
   * Used to trigger the Bootstrap visibility classes.
   *
   * @property showContent
   * @type boolean
   * @default false
   * @private
   */
  @defaultValue
  showContent = false;

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
  @defaultValue
  title = null;

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
  @defaultValue
  groupTitle = null;

  /**
   * Use fade animation when switching tabs.
   *
   * @property fade
   * @type boolean
   * @private
   */
  @defaultValue
  fade = true;

  /**
   * The duration of the fade out animation
   *
   * @property fadeDuration
   * @type integer
   * @default 150
   * @private
   */
  @defaultValue
  fadeDuration = 150;

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
        this.setProperties({
          active: true,
          showContent: true,
        });
      } else {
        transitionEnd(this._element, this.fadeDuration).then(() => {
          if (!this.isDestroyed) {
            this.setProperties({
              active: true,
              showContent: true,
            });
          }
        });
      }
    } else {
      this.set('active', true);
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
          this.set('active', false);
        }
      });
      this.set('showContent', false);
    } else {
      this.set('active', false);
    }
  }

  _showHide() {
    if (this.isActive) {
      this.show();
    } else {
      this.hide();
    }
  }

  _setActive() {
    this.set('active', this.isActive);
    this.set('showContent', this.isActive && this.fade);
  }

  init() {
    super.init(...arguments);

    // isActive comes from parent component, so only available after render...
    scheduleOnce('afterRender', this, this._setActive);

    addObserver(this, 'isActive', null, this._showHide, true);
  }
}
