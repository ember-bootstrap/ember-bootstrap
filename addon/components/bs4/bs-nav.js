import { classNameBindings } from '@ember-decorators/component';
import BaseNav from 'ember-bootstrap/components/base/bs-nav';

@classNameBindings('stacked:flex-column', 'fill:nav-fill')
export default class Nav extends BaseNav {
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
