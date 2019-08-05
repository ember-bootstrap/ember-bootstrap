import { computed } from '@ember/object';

export default function usesTransition() {
  return computed('fade', 'fastboot.isFastBoot', function() {
    return !this.get('fastboot.isFastBoot') && this.get('fade');
  })
}
