import Ember from 'ember';
import layout from '../templates/components/bs-tab-pane';
import ComponentChild from 'ember-bootstrap/mixins/component-child';
import Tab from './bs-tab';

const { computed } = Ember;

export default Ember.Component.extend(ComponentChild, {
  layout,
  classNameBindings: ['active'],
  classNames: ['tab-pane'],
  ariaRole: 'tabpanel',

  /**
   * True if this pane is active (visible)
   *
   * @property active
   * @type boolean
   * @protected
   */
  active: computed('tab.activeId', 'elementId', function() {
    return this.get('tab.activeId') === this.get('elementId');
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
  groupTitle: null
});
