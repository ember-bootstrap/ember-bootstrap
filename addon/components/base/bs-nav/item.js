import { classNameBindings, layout as templateLayout, tagName } from '@ember-decorators/component';
import { observes } from '@ember-decorators/object';
import { filter, filterBy, gt } from '@ember/object/computed';
import Component from '@ember/component';
import '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import LinkComponent from '@ember/routing/link-component';
import layout from 'ember-bootstrap/templates/components/bs-nav/item';
import ComponentParent from 'ember-bootstrap/mixins/component-parent';
import overrideableCP from 'ember-bootstrap/utils/cp/overrideable';
import { assert } from '@ember/debug';

/**

 Component for each item within a [Components.Nav](Components.Nav.html) component. Have a look there for examples.

 @class NavItem
 @namespace Components
 @extends Ember.Component
 @uses Mixins.ComponentParent
 @public
 */
@templateLayout(layout)
@classNameBindings('disabled', 'active')
@tagName('li')
export default class NavItem extends Component.extend(ComponentParent) {
  /**
   * Render the nav item as disabled (see [Bootstrap docs](http://getbootstrap.com/components/#nav-disabled-links)).
   * By default it will look at any nested `link-to` components and make itself disabled if there is a disabled link.
   * See the [link-to API](http://emberjs.com/api/classes/Ember.Templates.helpers.html#toc_disabling-the-code-link-to-code-component)
   *
   * @property disabled
   * @type boolean
   * @public
   */
  @overrideableCP('_disabled', function() {
    return this.get('_disabled');
  })
  disabled;

  _disabled = false;

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
  @overrideableCP('_active', function() {
    return this.get('_active');
  })
  active;

  _active = false;

  /**
   * Collection of all `Ember.LinkComponent`s that are children
   *
   * @property childLinks
   * @private
   */
  @filter('children', function(view) {
    return view instanceof LinkComponent;
  })
  childLinks;

  @filterBy('childLinks', 'active')
  activeChildLinks;

  @gt('activeChildLinks.length', 0)
  hasActiveChildLinks;

  @filterBy('childLinks', 'disabled')
  disabledChildLinks;

  @gt('disabledChildLinks.length', 0)
  hasDisabledChildLinks;

  /**
   * Called when clicking the nav item
   *
   * @event onClick
   * @public
   */
  onClick() {
  }

  click() {
    this.onClick();
  }

  init() {
    super.init(...arguments);
    let { model, models } = this.getProperties('model', 'models');
    assert('You cannot pass both `@model` and `@models` to a nav item component!', !model || !models);

    this.get('activeChildLinks');
    this.get('disabledChildLinks');
  }

  @observes('activeChildLinks.[]')
  _observeActive() {
    scheduleOnce('afterRender', this, this._updateActive);
  }

  _updateActive() {
    this.set('_active', this.get('hasActiveChildLinks'));
  }

  @observes('disabledChildLinks.[]')
  _observeDisabled() {
    scheduleOnce('afterRender', this, this._updateDisabled);
  }

  _updateDisabled() {
    this.set('_disabled', this.get('hasDisabledChildLinks'));
  }
}
