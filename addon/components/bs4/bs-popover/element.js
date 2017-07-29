import { computed } from '@ember/object';
import PopoverElement from 'ember-bootstrap/components/base/bs-popover/element';

export default PopoverElement.extend({
  classNameBindings: ['placementClass', 'showHelp:show'],

  placementClass: computed('placement', function() {
    let placement = this.get('placement');

    return `popover-${placement}`;
  })
});
