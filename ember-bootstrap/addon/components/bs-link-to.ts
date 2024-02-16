import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';
import type RouterService from '@ember/routing/router-service';

export interface BsLinkToSignature {
  // TODO: Should rely on Element of LinkTo signature instead
  Element: HTMLAnchorElement;
  Args: {
    route?: string;
    model?: unknown;
    models?: unknown[];
    query?: string;
    disabled?: boolean;

    // private args, for internal use only!
    /**
     * @internal
     */
    attrClassInternal?: string;
  };
  Blocks: {
    default: [];
  };
}

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
export default class LinkComponent extends Component<BsLinkToSignature> {
  @service declare router: RouterService;

  get active() {
    if (!this.args.route) {
      return false;
    }

    return this.router.isActive(this.args.route, ...this.models, {
      queryParams: this.query,
    });
  }

  get models() {
    const { model, models } = this.args;

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
