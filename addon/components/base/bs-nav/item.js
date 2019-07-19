import Component from '@ember/component';
import { observer } from '@ember/object';
import { filter, filterBy, gt } from '@ember/object/computed';
import { scheduleOnce } from '@ember/runloop';
import LinkComponent from '@ember/routing/link-component';
import layout from 'ember-bootstrap/templates/components/bs-nav/item';
import ComponentParent from 'ember-bootstrap/mixins/component-parent';
import overrideableCP from '../../../utils/overrideable-cp';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';

/**

 Component for each item within a [Components.Nav](Components.Nav.html) component. Have a look there for examples.

 @class NavItem
 @namespace Components
 @extends Ember.Component
 @uses Mixins.ComponentParent
 @public
 */
export default Component.extend(ComponentParent, {
  layout,
  classNameBindings: ['disabled', 'active'],
  tagName: 'li',
  router: service(),

  /**
   * If set will wrap the item's content in a link to the given route name. Same as the `route` property of `<LinkTo>`,
   * see https://api.emberjs.com/ember/3.10/classes/LinkComponent/properties/route?anchor=route
   *
   * @property route
   * @type {string}
   * @public
   */

  /**
   * The model of a dynamic route. Same as the `model` property of `<LinkTo>`,
   * see https://api.emberjs.com/ember/3.10/classes/LinkComponent/properties/route?anchor=model
   *
   * @property model
   * @type {object|string}
   * @public
   */

  /**
   * The models of a dynamic route. Same as the `models` property of `<LinkTo>`,
   * see https://api.emberjs.com/ember/3.10/classes/LinkComponent/properties/route?anchor=models
   *
   * @property models
   * @type {array}
   * @public
   */

  /**
   * The query params of a dynamic route. Same as the `query` property of `<LinkTo>`,
   * see https://api.emberjs.com/ember/3.10/classes/LinkComponent/properties/route?anchor=query
   *
   * @property query
   * @type {object}
   * @public
   */

  /**
   * Render the nav item as disabled (see [Bootstrap docs](http://getbootstrap.com/components/#nav-disabled-links)).
   * By default it will look at any nested `link-to` components and make itself disabled if there is a disabled link.
   * See the [link-to API](http://emberjs.com/api/classes/Ember.Templates.helpers.html#toc_disabling-the-code-link-to-code-component)
   *
   * @property disabled
   * @type boolean
   * @public
   */
  disabled: overrideableCP('_disabled', function() {
    return this.get('_disabled');
  }),
  _disabled: false,

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
  active: overrideableCP('_active', 'route', 'model', 'models', 'query', 'router.currentURL', function() {
    let { route, model, models, query } = this.getProperties('route', 'model', 'models', 'query');
    let params = [];

    if (route) {
      params.push(route);
    }

    if (model) {
      params.push(model);
    }

    if (models) {
      params.push(...models);
    }

    if (query) {
      params.push({ queryParams: true, ...query});
    }

    return params.length ? this.get('router').isActive(...params) : this.get('_active');
  }),
  _active: false,

  /**
   * Collection of all `Ember.LinkComponent`s that are children
   *
   * @property childLinks
   * @private
   */
  childLinks: filter('children', function(view) {
    return view instanceof LinkComponent;
  }),

  activeChildLinks: filterBy('childLinks', 'active'),
  hasActiveChildLinks: gt('activeChildLinks.length', 0),

  disabledChildLinks: filterBy('childLinks', 'disabled'),
  hasDisabledChildLinks: gt('disabledChildLinks.length', 0),

  /**
   * Called when clicking the nav item
   *
   * @event onClick
   * @public
   */
  onClick() {},

  click() {
    this.onClick();
  },

  init() {
    this._super(...arguments);
    let { model, models } = this.getProperties('model', 'models');
    assert('You cannot pass both `@model` and `@models` to a nav item component!', !model || !models);

    this.get('activeChildLinks');
    this.get('disabledChildLinks');
  },

  _observeActive: observer('activeChildLinks.[]', function() {
    scheduleOnce('afterRender', this, this._updateActive);
  }),

  _updateActive() {
    this.set('_active', this.get('hasActiveChildLinks'));
  },

  _observeDisabled: observer('disabledChildLinks.[]', function() {
    scheduleOnce('afterRender', this, this._updateDisabled);
  }),

  _updateDisabled() {
    this.set('_disabled', this.get('hasDisabledChildLinks'));
  }
});
