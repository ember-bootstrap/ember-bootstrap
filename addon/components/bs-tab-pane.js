import Ember from 'ember';
import layout from '../templates/components/bs-tab-pane';
import ComponentChild from 'ember-bootstrap/mixins/component-child';
import Tab from './bs-tab';

const { computed, observer } = Ember;

/**
 The tab pane of a tab component.
 See [Components.Tab](Components.Tab.html) for examples.

 @class TabPane
 @namespace Components
 @extends Ember.Component
 @uses Mixins.ComponentChild
 @public
 */
export default Ember.Component.extend(ComponentChild, {
  layout,
  classNameBindings: ['active', 'fade', 'in'],
  classNames: ['tab-pane'],
  ariaRole: 'tabpanel',

  /**
   * True if this pane is active (visible)
   *
   * @property isActive
   * @type boolean
   * @protected
   */
  isActive: computed('tab.activeId', 'elementId', function() {
    return this.get('tab.activeId') === this.get('elementId');
  }),

  /**
   * Used to apply Bootstrap's "active" class
   *
   * @property active
   * @type boolean
   * @default false
   * @protected
   */
  active: false,

  /**
   * Used to apply Bootstrap's "in" class
   *
   * @property in
   * @type boolean
   * @default false
   * @protected
   */
  'in': false,

  /**
   * Use CSS transitions when showing/hiding the pane?
   *
   * @property usesTransition
   * @type boolean
   * @readonly
   * @protected
   */
  usesTransition: computed('fade', function() {
    return Ember.$.support.transition && this.get('fade');
  }),

  /**
   * The parent [Components.Tab](Components.Tab.html) instance.
   *
   * @property tab
   * @type {Components.Tab}
   * @protected
   */
  tab: computed(function() {
    return this.nearestOfType(Tab);
  }),

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
   * @readonly
   * @protected
   */
  fade: computed.readOnly('tab.fade'),

  /**
   * The duration of the fade out animation
   *
   * @property fadeDuration
   * @type integer
   * @readonly
   * @protected
   */
  fadeDuration: computed.readOnly('tab.fadeDuration'),

  /**
   * Show the pane
   *
   * @method show
   * @protected
   */
  show() {
    if (this.get('usesTransition')) {
      this.$()
        .one('bsTransitionEnd', Ember.run.bind(this, function() {
          if (!this.get('isDestroyed')) {
            this.setProperties({
              active: true,
              in: true
            });
          }
        }))
        .emulateTransitionEnd(this.get('fadeDuration'));
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
      this.$()
        .one('bsTransitionEnd', Ember.run.bind(this, function() {
          if (!this.get('isDestroyed')) {
            this.set('active', false);
          }
        }))
        .emulateTransitionEnd(this.get('fadeDuration'));
      this.set('in', false);
    } else {
      this.set('active', false);
    }
  },

  _showHide: observer('isActive', function() {
    this.get('isActive') ? this.show() : this.hide();
  }),

  init() {
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, function() {
      // isActive comes from parent component, so only available after render...
      this.set('active', this.get('isActive'));
      this.set('in', this.get('isActive') && this.get('fade'));
    });
  }

});
