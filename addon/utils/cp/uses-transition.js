import { computed } from '@ember/object';
import { assert } from '@ember/debug';
import isFastBoot from '../is-fastboot';

export default function usesTransition(fadeProperty) {
  assert('You have to provide a fadeProperty for typeClass', typeof fadeProperty === 'string');

  return computed(fadeProperty, function () {
    return !isFastBoot(this) && this[fadeProperty];
  });
}
