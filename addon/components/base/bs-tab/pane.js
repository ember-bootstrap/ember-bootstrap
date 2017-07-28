import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-tab/pane';
import ComponentChild from 'ember-bootstrap/mixins/component-child';
import TransitionSupport from 'ember-bootstrap/mixins/transition-support';
import transitionEnd from 'ember-bootstrap/utils/transition-end';

const { computed, observer, run: { scheduleOnce } } = Ember;

/**
 The tab pane of a tab component.
 See [Components.Tab](Components.Tab.html) for examples.

 @class TabPane
 @namespace Components
 @extends Ember.Component
 @uses Mixins.ComponentChild
 @public
 */
export default Ember.Component.extend(ComponentChild, TransitionSupport, {
  layout,
  classNameBindings: ['active', 'usesTransition:fade'],
  classNames: ['tab-pane'],
  ariaRole: 'tabpanel',

  /**
   * @property activeId
   * @private
   */
  activeId: null,

  /**
   * True if this pane is active (visible)
   *
   * @property isActive
   * @type boolean
   * @readonly
   * @private
   */
  isActive: computed('activeId', 'elementId', function() {
    return this.get('activeId') === this.get('elementId');
  }).readOnly(),

  /**
   * Used to apply Bootstrap's "active" class
   *
   * @property active
   * @type boolean
   * @default false
   * @private
   */
  active: false,

  /**
   * Used to trigger the Bootstrap visibility classes.
   *
   * @property showContent
   * @type boolean
   * @default false
   * @private
   */
  showContent: false,

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
  title: null,

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
  groupTitle: null,

  /**
   * Use fade animation when switching tabs.
   *
   * @property fade
   * @type boolean
   * @private
   */
  fade: true,

  /**
   * The duration of the fade out animation
   *
   * @property fadeDuration
   * @type integer
   * @default 150
   * @private
   */
  fadeDuration: 150,

  /**
   * Show the pane
   *
   * @method show
   * @protected
   */
  show() {
    if (this.get('usesTransition')) {
      transitionEnd(this.get('element'), function() {
        if (!this.get('isDestroyed')) {
          this.setProperties({
            active: true,
            showContent: true
          });
        }
      }, this, this.get('fadeDuration'));
    } else {
      this.set('active', true);
    }
  },

  /**
   * Hide the pane
   *
   * @method hide
   * @protected
   */
  hide() {
    if (this.get('usesTransition')) {
      transitionEnd(this.get('element'), function() {
        if (!this.get('isDestroyed')) {
          this.set('active', false);
        }
      }, this, this.get('fadeDuration'));
      this.set('showContent', false);
    } else {
      this.set('active', false);
    }
  },

  _showHide: observer('isActive', function() {
    if (this.get('isActive')) {
      this.show();
    } else {
      this.hide();
    }
  }),

  init() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, function() {
      // isActive comes from parent component, so only available after render...
      this.set('active', this.get('isActive'));
      this.set('showContent', this.get('isActive') && this.get('fade'));
    });
  }

});
