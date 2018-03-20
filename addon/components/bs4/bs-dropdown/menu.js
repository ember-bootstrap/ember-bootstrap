import DropdownMenu from 'ember-bootstrap/components/base/bs-dropdown/menu';
import { computed } from '@ember/object';
import { notEmpty } from '@ember/object/computed';

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

  inDom: notEmpty('toggleElement').readOnly(),

  popperPlacement: computed('direction', 'align', function() {
    let placement = 'bottom-start';
    let { direction, align } = this.getProperties('direction', 'align');

    if (direction === 'up') {
      placement = 'top-start';
      if (align === 'right') {
        placement = 'top-end';
      }
    } else if (direction === 'left') {
      placement = 'left-start';
    } else if (direction === 'right') {
      placement = 'right-start';
    } else if (align === 'right') {
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
