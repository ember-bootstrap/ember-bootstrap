/* eslint-disable ember/classic-decorator-no-classic-methods */
import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import { assert, deprecate } from '@ember/debug';
import ComponentChild from '../mixins/component-child';
import { dependentKeyCompat } from '@ember/object/compat';

/**
 This is largely copied from Ember.LinkComponent. It is used as extending from Ember.LinkComponent has been deprecated.
 We need this to
 * register ourselves to a parent component that needs to know `active` state due to Bootstrap markup requirements, see Nav/LinkTo
 * continue supporting positional params until we can remove support

 @class LinkComponent
 @namespace Components
 @extends Component
 @private
*/
@tagName('')
class LinkComponent extends Component.extend(ComponentChild) {
  @service('router')
  router;

  @dependentKeyCompat
  get active() {
    if (!this.route) {
      return false;
    }

    // Ember < 3.22 does not correctly entangle autotracking with routing state changes, so we manually do that here
    // See https://github.com/emberjs/ember.js/issues/19004
    // shamelessly stolen from https://github.com/rwjblue/ember-router-helpers/blob/master/addon/utils/track-active-route.js

    // ensure we recompute anytime `router.currentURL` changes
    this.router.currentURL;

    // ensure we recompute whenever the `router.currentRouteName` changes
    // this is slightly overlapping with router.currentURL but there are
    // cases where route.currentURL doesn't change but the
    // router.currentRouteName has (e.g. loading and error states)
    this.router.currentRouteName;

    return this.router.isActive(this.route, ...this._models, { queryParams: this._query });
  }

  get _models() {
    let { model, models } = this;

    if (model !== undefined) {
      return [model];
    } else if (models !== undefined) {
      assert('The `@models` argument must be an array.', Array.isArray(models));
      return models;
    } else {
      return [];
    }
  }

  get _query() {
    return this.query ?? {};
  }

  // eslint-disable-next-line ember/no-component-lifecycle-hooks
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let { params } = this;
    if (!params || params.length === 0) {
      return;
    }

    deprecate(
      `Positional arguments for ember-bootstrap's link-to components are deprecated. Switch to angle bracket invocation and named arguments.`,
      false,
      {
        id: `ember-bootstrap.link-to.positional-args`,
        until: '5.0.0',
        since: '4.7.0',
        for: 'ember-bootstrap',
      }
    );

    params = params.slice();

    // taken from original Ember.LnkComponent
    // Process the positional arguments, in order.

    // Skipping this, as we don't support this
    // 1. Inline link title comes first, if present.
    // if (!hasBlock) {
    //   this.set('linkTitle', params.shift());
    // }

    // 2. The last argument is possibly the `query` object.
    let queryParams = params[params.length - 1];

    if (queryParams && queryParams.isQueryParams) {
      this.set('query', params.pop().values);
    } else {
      this.set('query', undefined);
    }

    // 3. If there is a `route`, it is now at index 0.
    if (params.length === 0) {
      this.set('route', undefined);
    } else {
      this.set('route', params.shift());
    }

    // 4. Any remaining indices (if any) are `models`.
    this.set('model', undefined);
    this.set('models', params);
  }
}

LinkComponent.reopenClass({
  positionalParams: 'params',
});

export default LinkComponent;
