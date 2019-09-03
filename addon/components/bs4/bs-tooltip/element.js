import { computed } from '@ember/object';
import BaseTooltipElement from 'ember-bootstrap/components/base/bs-tooltip/element';

export default class TooltipElement extends BaseTooltipElement {
  @computed('fade', 'actualPlacement', 'showHelp')
  get popperClassNames() {
    let classes = ['tooltip', `bs-tooltip-${this.get('actualPlacement')}`];
    if (this.get('fade')) {
      classes.push('fade');
    }
    if (this.get('showHelp')) {
      classes.push('show');
    }
    return classes;
  }
}
