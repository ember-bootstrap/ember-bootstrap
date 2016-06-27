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

  activeId: computed.oneWay('childPanes.firstObject.elementId'),

  childPanes: computed.filter('children', function(view) {
    return view instanceof TabPane;
  }),

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
