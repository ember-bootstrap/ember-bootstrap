import { computed } from '@ember/object';
import { assert } from '@ember/debug';

/**
 * CP macro that created a regular computed property, which can be manually overriden.
 * This is needed after implicitly overrideable CPs have been deprecated:
 * https://deprecations-app-prod.herokuapp.com/deprecations/v3.x/#toc_computed-property-override
 *
 * @private
 */
export default function overrideableCP() {
  let fn = Array.prototype.slice.call(arguments, -1)[0];
  let args = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
  assert('Last argument for overrideableCP must be a function', typeof fn === 'function');

  return computed(...args, {
    get(key) {
      let overridden = this[`__${key}`];
      return overridden || fn.call(this);
    },
    set(key, value) {
      this[`__${key}`] = value;
      return value;
    },
  });
}
