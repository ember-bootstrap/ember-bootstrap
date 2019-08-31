import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Navbar from 'ember-bootstrap/components/base/bs-navbar';
import { isBlank } from '@ember/utils';

@classic
@classNameBindings('breakpointClass', 'backgroundClass')
export default class BsNavbar extends Navbar {
  @computed('appliedType')
  get type() {
    return this.get('appliedType');
  }

  set type(value) {
    let newValue = (!value || value === 'default') ? 'light' : value;
    this.set('appliedType', newValue);
    return newValue;
  }

  appliedType = 'light';

  /**
   * Defines the responsive toggle breakpoint size. Options are the standard
   * two character Bootstrap size abbreviations. Used to set the `navbar-expand[-*]`
   * class. Set to `null` to disable collapsing.
   *
   * @property toggleBreakpoint
   * @type String
   * @default 'lg'
   * @public
   */
  toggleBreakpoint = 'lg';

  /**
   * Sets the background color for the navbar. Can be any color
   * in the set that composes the `bg-*` classes.
   *
   * @property backgroundColor
   * @type String
   * @default 'light'
   * @public
   */
  backgroundColor = 'light';

  @computed('toggleBreakpoint')
  get breakpointClass() {
    let toggleBreakpoint = this.get('toggleBreakpoint');

    if (isBlank(toggleBreakpoint)) {
      return 'navbar-expand';
    } else {
      return `navbar-expand-${toggleBreakpoint}`;
    }
  }

  @computed('backgroundColor')
  get backgroundClass() {
    let backgroundColor = this.get('backgroundColor');

    return `bg-${backgroundColor}`;
  }

  _validPositions = null;
  _positionPrefix = '';

  init() {
    super.init(...arguments);
    this.set('_validPositions', ['fixed-top', 'fixed-bottom', 'sticky-top']);
  }
}
