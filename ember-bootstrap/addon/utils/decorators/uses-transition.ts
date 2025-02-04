import isFastBoot from '../is-fastboot';
import type Component from '@glimmer/component';
import { assert } from '@ember/debug';

/**
 * @internal
 */
function arg<S>(
  fadeProperty: string,
): (target: object, property: string) => void {
  assert(
    'You have to provide a fadeProperty for typeClass',
    typeof fadeProperty === 'string',
  );

  return function () {
    return {
      get(this: Component<S>) {
        return (
          !isFastBoot(this) &&
          this.args[fadeProperty as keyof typeof this.args] !== false
        );
      },
    };
  };
}

export default arg;
