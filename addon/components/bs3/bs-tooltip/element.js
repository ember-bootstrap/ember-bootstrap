import TooltipElement from 'ember-bootstrap/components/base/bs-tooltip/element';
import { computed } from '@ember/object';

export default TooltipElement.extend({
  popperClassNames: computed('fade', 'placement', 'showHelp', function() {
    let classes = ['tooltip', this.get('placement')];
    if (this.get('fade')) {
      classes.push('fade');
    }
    if (this.get('showHelp')) {
      classes.push('in');
    }
    return classes;
  })
});
