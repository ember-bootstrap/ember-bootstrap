import { computed } from '@ember/object';
import { assert } from '@ember/debug';

export default function typeClass(prefix) {
  assert('You have to provide a prefix for typeClass', prefix);

  return computed('type', function() {
    let type = this.get('type') || 'default';

    if (this.get('outline')) {
      return `${prefix}-outline-${type}`;
    }
    return `${prefix}-${type}`;
  });
}
