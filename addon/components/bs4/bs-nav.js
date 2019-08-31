import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import Nav from 'ember-bootstrap/components/base/bs-nav';

@classic
@classNameBindings('stacked:flex-column', 'fill:nav-fill')
export default class BsNav extends Nav {
  /**
    * Make the nav flex fill, see [bootstrap docs](http://getbootstrap.com/docs/4.1/components/navs/#fill-and-justify)
    *
    * @property fill
    * @type boolean
    * @default false
    * @public
    */
  fill = false;
}
