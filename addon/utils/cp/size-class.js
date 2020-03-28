import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { assert } from '@ember/debug';

export default function sizeClass(prefix, sizeProperty) {
  assert('You have to provide a prefix for sizeClass', typeof prefix === 'string');
  assert('You have to provide a sizeProperty for sizeClass', typeof sizeProperty === 'string');

  return computed('size', function () {
    let size = this[sizeProperty];
    assert('The value of `size` must be a string', !size || (typeof size === 'string' && size !== ''));

    return isBlank(size) ? null : `${prefix}-${size}`;
  });
}
