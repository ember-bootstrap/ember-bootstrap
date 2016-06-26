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

  active: computed('tab.activeId', 'elementId', function() {
    return this.get('tab.activeId') === this.get('elementId');
  }),

  tab: computed(function() {
    return this.nearestOfType(Tab);
  }),

  title: null
});
