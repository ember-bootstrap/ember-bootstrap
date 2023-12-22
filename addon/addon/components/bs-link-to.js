import Component from '@glimmer/component';
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
export default class LinkComponent extends Component {
  @service('router')
  router;

  get active() {
    if (!this.args.route) {
      return false;
    }

    return this.router.isActive(this.args.route, ...this.models, {
      queryParams: this.query,
    });
  }

  get models() {
    let { model, models } = this.args;

    if (model !== undefined) {
      return [model];
    } else if (models !== undefined) {
      assert('The `@models` argument must be an array.', Array.isArray(models));
      return models;
    } else {
      return [];
    }
  }

  get query() {
    return this.args.query ?? {};
  }
}
