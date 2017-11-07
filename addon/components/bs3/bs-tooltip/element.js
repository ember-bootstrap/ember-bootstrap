import TooltipElement from 'ember-bootstrap/components/base/bs-tooltip/element';
import { computed } from '@ember/object';

export default TooltipElement.extend({
  /**
   * @property arrowClass
   * @private
   */
  arrowClass: 'tooltip-arrow',

  popperClassNames: computed('fade', 'actualPlacement', 'showHelp', function() {
    let classes = ['tooltip', 'ember-bootstrap-tooltip', this.get('actualPlacement')];
    if (this.get('fade')) {
      classes.push('fade');
    }
    if (this.get('showHelp')) {
      classes.push('in');
    }
    return classes;
  })
});
