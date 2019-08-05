import { computed } from '@ember/object';
import { assert } from '@ember/debug';

export default function typeClass(prefix, typeProperty) {
  assert('You have to provide a prefix for typeClass', typeof prefix === 'string');
  assert('You have to provide a typeProperty for typeClass', typeof typeProperty === 'string');

  return computed('type', function() {
    let type = this.get(typeProperty) || 'default';
    assert('The value of `type` must be a string', typeof type === 'string' && type !== '');

    if (this.get('outline')) {
      return `${prefix}-outline-${type}`;
    }
    return `${prefix}-${type}`;
  });
}
