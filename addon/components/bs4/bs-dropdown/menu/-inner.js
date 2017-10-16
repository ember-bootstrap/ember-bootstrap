import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  isOpen: computed({
    get() {
      return false;
    },
    set(key, value) {
      if (value === true) {
        this.get('updatePopper')();
      }
    }
  })
});
