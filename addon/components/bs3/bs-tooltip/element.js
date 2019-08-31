import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import TooltipElement from 'ember-bootstrap/components/base/bs-tooltip/element';

@classic
export default class Element extends TooltipElement {
  /**
   * @property arrowClass
   * @private
   */
  arrowClass = 'tooltip-arrow';

  @computed('fade', 'actualPlacement', 'showHelp')
  get popperClassNames() {
    let classes = ['tooltip', 'ember-bootstrap-tooltip', this.get('actualPlacement')];
    if (this.get('fade')) {
      classes.push('fade');
    }
    if (this.get('showHelp')) {
      classes.push('in');
    }
    return classes;
  }
}
