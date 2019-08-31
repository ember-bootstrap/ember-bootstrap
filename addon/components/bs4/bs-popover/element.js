import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import PopoverElement from 'ember-bootstrap/components/base/bs-popover/element';

@classic
export default class Element extends PopoverElement {
  @computed('fade', 'actualPlacement', 'showHelp')
  get popperClassNames() {
    let classes = ['popover', `bs-popover-${this.get('actualPlacement')}`];
    if (this.get('fade')) {
      classes.push('fade');
    }
    if (this.get('showHelp')) {
      classes.push('show');
    }
    return classes;
  }

  /**
   * @property titleClass
   * @private
   */
  titleClass = 'popover-header';

  /**
   * @property contentClass
   * @private
   */
  contentClass = 'popover-body';
}
