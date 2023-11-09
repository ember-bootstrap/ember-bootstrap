import { isBlank } from '@ember/utils';
import { assert } from '@ember/debug';

export default function sizeClass(prefix, size) {
  assert(
    'You have to provide a prefix for sizeClass',
    typeof prefix === 'string',
  );
  assert(
    'The value of `size` must be a string',
    !size || (typeof size === 'string' && size !== ''),
  );

  return isBlank(size) ? null : `${prefix}-${size}`;
}
