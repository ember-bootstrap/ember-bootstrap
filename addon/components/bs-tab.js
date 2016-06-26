import Ember from 'ember';
import layout from '../templates/components/bs-tab';
import ComponentParent from 'ember-bootstrap/mixins/component-parent';
import TabPane from './bs-tab-pane';

const { computed } = Ember;

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

  actions: {
    select(id) {
      this.set('activeId', id);
    }
  }
});
