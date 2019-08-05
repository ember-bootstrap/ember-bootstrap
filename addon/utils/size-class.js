import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { assert } from '@ember/debug';

export default function sizeClass(prefix) {
  assert('You have to provide a prefix for sizeClass', prefix);

  return computed('size', function() {
    let size = this.get('size');
    return isBlank(size) ? null : `${prefix}-${size}`;
  });
}
