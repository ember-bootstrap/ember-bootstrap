import Ember from 'ember';
import layout from '../templates/components/bs-nav-item';
import ComponentParent from 'ember-bootstrap/mixins/component-parent';

const { computed, LinkComponent } = Ember;

export default Ember.Component.extend(ComponentParent, {
  layout,
  classNameBindings: ['disabled', 'active'],

  tagName: 'li',

  /**
   * @property disabled
   * @type boolean
   * @default false
   * @public
   */
  disabled: false,

  childLinks: computed.filter('children', function(view) {
    return view instanceof LinkComponent;
  }),

  activeChildLinks: computed.filterBy('childLinks', 'active', 'active'),

  active: computed.gt('activeChildLinks.length', 0)
});
