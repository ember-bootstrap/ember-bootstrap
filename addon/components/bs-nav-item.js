import
Ember
from
'ember';
import
layout
from
'../templates/components/bs-nav-item';
import
ComponentParent
from
'ember-bootstrap/mixins/component-parent';

const { computed, LinkComponent } = Ember;

/**

 Component for each item within a [Components.Nav](Components.Nav.html) component. Have a look there for examples.

 @class NavItem
 @namespace Components
 @extends Ember.Component
 @uses Mixins.ComponentParent
 @public
 */
export default
Ember.Component.extend(ComponentParent, {
  layout,
  classNameBindings: ['disabled', 'active'],
  tagName: 'li',
  ariaRole: 'presentation',

  /**
   * Render the nav item as disabled (see [Bootstrap docs](http://getbootstrap.com/components/#nav-disabled-links)).
   * By default it will look at any nested `link-to` components and make itself disabled if there is a disabled link.
   * See the [link-to API](http://emberjs.com/api/classes/Ember.Templates.helpers.html#toc_disabling-the-code-link-to-code-component)
   *
   * @property disabled
   * @type boolean
   * @public
   */
  disabled: computed.gt('disabledChildLinks.length', 0),

  /**
   * Render the nav item as active.
   * By default it will look at any nested `link-to` components and make itself active if there is an active link
   * (i.e. the link points to the current route).
   * See the [link-to API](http://emberjs.com/api/classes/Ember.Templates.helpers.html#toc_handling-current-route)
   *
   * @property active
   * @type boolean
   * @public
   */
  active: computed.gt('activeChildLinks.length', 0),

  /**
   * Collection of all `Ember.LinkComponent`s that are children
   *
   * @property childLinks
   * @private
   */
  childLinks: computed.filter('children', function(view) {
    return view instanceof LinkComponent;
  }),

  activeChildLinks: computed.filterBy('childLinks', 'active'),
  disabledChildLinks: computed.filterBy('childLinks', 'disabled')
});
