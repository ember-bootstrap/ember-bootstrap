import { computed } from '@ember/object';
import BasePopoverElement from 'ember-bootstrap/components/base/bs-popover/element';

export default class PopoverElement extends BasePopoverElement {
  @computed('fade', 'actualPlacement', 'showHelp')
  get popperClassNames() {
    let classes = ['popover', 'ember-bootstrap-popover', this.get('actualPlacement')];
    if (this.get('fade')) {
      classes.push('fade');
    }
    if (this.get('showHelp')) {
      classes.push('in');
    }
    return classes;
  }

  /**
   * @property titleClass
   * @private
   */
  titleClass = 'popover-title';

  /**
   * @property contentClass
   * @private
   */
  contentClass = 'popover-content';
}
