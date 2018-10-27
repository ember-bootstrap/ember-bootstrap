import Nav from 'ember-bootstrap/components/base/bs-nav';

export default Nav.extend({
  classNameBindings: ['stacked:flex-column', 'fill:nav-fill'],

 /**
   * Make the nav flex fill, see [bootstrap docs](http://getbootstrap.com/docs/4.1/components/navs/#fill-and-justify)
   *
   * @property fill
   * @type boolean
   * @default false
   * @public
   */
  fill: false

});
