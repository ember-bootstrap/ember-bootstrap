import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import TooltipElement from 'ember-bootstrap/components/base/bs-tooltip/element';

@classic
export default class Element extends TooltipElement {
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
