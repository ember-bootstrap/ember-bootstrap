import Ember from 'ember';
import layout from '../templates/components/bs-tab';
import ComponentParent from 'ember-bootstrap/mixins/component-parent';
import TabPane from './bs-tab-pane';

const { computed, isPresent, A } = Ember;

export default Ember.Component.extend(ComponentParent, {
  layout,

  /**
   * Type of nav, either "pills" or "tabs"
   *
   * @property type
   * @type String
   * @default "tabs"
   * @public
   */
  type: "tabs",

  /**
   * By default the tabs will be automatically generated using the available [TabPane](Components.TabPane.html)
   * components. If set to true, you can deactivate this and setup the tabs manually. See the example above.
   *
   * @property customTabs
   * @type boolean
   * @default false
   * @public
   */
  customTabs: false,

  /**
   * The id (`elementId`) of the active [TabPane](Components.TabPane.html).
   * By default the first tab will be active, but this can be changed by setting this property
   *
   * ```hbs
   * {{#bs-tab activeId="pane2"}}
   *   {{#bs-tab-pane id="pane1" title="Tab 1"}}
   *      ...
   *   {{/bs-tab-pane}}
   *   {{#bs-tab-pane id="pane1" title="Tab 1"}}
   *     ...
   *   {{/bs-tab-pane}}
   * {{/bs-tab}}
   * ```
   *
   * @property activeId
   * @type string
   * @public
   */
  activeId: computed.oneWay('childPanes.firstObject.elementId'),

  /**
   * All `TabPane` child components
   *
   * @property childPanes
   * @type array
   * @readonly
   * @private
   */
  childPanes: computed.filter('children', function(view) {
    return view instanceof TabPane;
  }),

  /**
   * Array of objects that define the tab structure
   *
   * @property navItems
   * @type array
   * @readonly
   * @private
   */
  navItems: computed('childPanes.@each.{elementId,title,group}', function() {
    let items = A();
    this.get('childPanes').forEach((pane) => {
      let groupTitle = pane.get('groupTitle');
      let item = pane.getProperties('elementId', 'title');
      if (isPresent(groupTitle)) {
        let group = items.findBy('groupTitle', groupTitle);
        if (group) {
          group.children.push(item);
          group.childIds.push(item.elementId);
        } else {
          items.push({
            isGroup: true,
            groupTitle,
            children: A([item]),
            childIds: A([item.elementId])
          });
        }
      } else {
        items.push(item);
      }
    });
    return items;
  }),

  actions: {
    select(id) {
      this.set('activeId', id);
    }
  }
});
