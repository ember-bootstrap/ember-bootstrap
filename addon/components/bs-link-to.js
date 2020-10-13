/* eslint-disable ember/classic-decorator-no-classic-methods */
import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';

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
class LinkComponent extends Component {
  // We still need to use the private service, so this component can react to changes of `currentState`, e.g. changing
  // the model while the route in unchanged.
  // eslint-disable-next-line ember/no-private-routing-service
  @service('-routing')
  _routing;

  @computed('models', 'query', 'route', '_routing.currentState', 'current-when')
  get active() {
    let state = this._routing.currentState;

    if (state) {
      return this._isActive(state);
    } else {
      return false;
    }
  }

  @computed('model', 'models')
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

  _isActive(routerState) {
    let currentWhen = this['current-when'];

    if (typeof currentWhen === 'boolean') {
      return currentWhen;
    }

    let { _models: models, _routing: routing } = this;

    if (typeof currentWhen === 'string') {
      return currentWhen
        .split(' ')
        .some((route) => routing.isActiveForRoute(models, undefined, this._namespaceRoute(route), routerState));
    } else {
      return routing.isActiveForRoute(models, this.query || {}, this.route, routerState);
    }
  }

  // eslint-disable-next-line ember/no-component-lifecycle-hooks
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let { params } = this;
    if (!params || params.length === 0) {
      return;
    }

    params = params.slice();

    // Process the positional arguments, in order.
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
