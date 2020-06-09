import { DEBUG } from '@glimmer/env';
import { deprecate } from '@ember/debug';

export default function deprecateSubclassing(target) {
  if (DEBUG) {
    const originalInit = target.prototype.init;

    if (originalInit) {
      target.prototype.init = function () {
        deprecate(
          `Extending from ember-bootstrap component classes is not supported, and might break anytime. Detected subclassing of <Bs${target.name}> component.`,
          // the `__ember-bootstrap_subclass` flag is an escape hatch for "priviliged" addons like validations addons that currently still have to rely on subclassing
          target === this.constructor || this['__ember-bootstrap_subclass'] === true,
          {
            id: `ember-bootstrap.subclassing#${target.name}`,
            until: '5.0.0',
          }
        );

        return originalInit.apply(this, arguments);
      };
    }
  }
}
