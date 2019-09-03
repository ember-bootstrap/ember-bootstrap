import { computed } from '@ember/object';
import BaseTooltipElement from 'ember-bootstrap/components/base/bs-tooltip/element';

export default class TooltipElement extends BaseTooltipElement {
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
