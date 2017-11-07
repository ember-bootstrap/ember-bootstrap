import DropdownMenu from 'ember-bootstrap/components/base/bs-dropdown/menu';
import { computed } from '@ember/object';

export default DropdownMenu.extend({
  tagName: '',

  isOpen: computed({
    get() {
      return false;
    },
    set(key, value) {
      let update = this.get('_popperApi.update');
      update && update();
      return value;
    }
  }),

  flip: true,

  _popperApi: null,

  popperPlacement: computed('direction', 'align', function() {
    let placement = 'bottom-start';

    if (this.get('direction') === 'up') {
      placement = 'top-start';
      if (this.get('align') === 'right') {
        placement = 'top-end';
      }
    } else if (this.get('align') === 'right') {
      placement = 'bottom-end';
    }
    return placement;
  }),

  popperModifiers: computed('inNav', 'flip', function() {
    return {
      // @todo add offset config
      applyStyle: {
        enabled: !this.get('inNav')
      },
      flip: {
        enabled: this.get('flip')
      }
    };
  }),

  actions: {
    registerPopperApi(api) {
      this.set('_popperApi', api);
    }
  }
});
