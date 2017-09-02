import { computed } from '@ember/object';
import TooltipElement from 'ember-bootstrap/components/base/bs-tooltip/element';

export default TooltipElement.extend({
  popperClassNames: computed('fade', 'placement', 'showHelp', function() {
    let classes = ['tooltip', `tooltip-${this.get('placement')}`];
    if (this.get('fade')) {
      classes.push('fade');
    }
    if (this.get('showHelp')) {
      classes.push('show');
    }
    return classes;
  })
});
