import { computed } from '@ember/object';
import BaseTooltipElement from 'ember-bootstrap/components/base/bs-tooltip/element';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

export default class TooltipElement extends BaseTooltipElement {
  /**
   * @property arrowClass
   * @private
   */
  @defaultValue
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
