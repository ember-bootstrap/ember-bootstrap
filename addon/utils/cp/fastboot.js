import { getOwner } from '@ember/application';
import { computed } from '@ember/object';

export default function fastboot() {
  return computed(function() {
    let owner = getOwner(this);
    return owner.lookup('service:fastboot');
  });
}
