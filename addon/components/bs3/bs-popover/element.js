import PopoverElement from 'ember-bootstrap/components/base/bs-popover/element';
import { computed } from '@ember/object';

export default PopoverElement.extend({
  popperClassNames: computed('fade', 'placement', 'showHelp', function() {
    let classes = ['popover', 'ember-bootstrap-popover', this.get('placement')];
    if (this.get('fade')) {
      classes.push('fade');
    }
    if (this.get('showHelp')) {
      classes.push('in');
    }
    return classes;
  })
});
