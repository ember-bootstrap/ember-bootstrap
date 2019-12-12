import { classNameBindings, classNames, layout as templateLayout, tagName } from '@ember-decorators/component';
import { observes } from '@ember-decorators/object';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import typeClass from 'ember-bootstrap/utils/cp/type-class';
import layout from 'ember-bootstrap/templates/components/bs-navbar';
import listenTo from 'ember-bootstrap/utils/cp/listen-to';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

/**
  Component to generate [Bootstrap navbars](http://getbootstrap.com/components/#navbar).

  ### Usage

  Uses the following components by a contextual reference:

  ```hbs
  <BsNavbar as |navbar|>
    <div class="navbar-header">
      <navbar.toggle />
      <a class="navbar-brand" href="#">Brand</a>
    </div>
    <navbar.content>
      <navbar.nav as |nav|>
        <nav.item>
          <nav.linkTo @route="home">Home</nav.linkTo>
        </nav.item>
        <nav.item>
          <nav.linkTo @route="navbars">Navbars</nav.linkTo>
        </nav.item>
      </navbar.nav>
    </navbar.content>
  </BsNavbar>
  ```

  **Note:** the `<div class="navbar-header">` is required for BS3 to hold the elements visible on a mobile breakpoint,
  when the actual content is collapsed. It should *not* be used for BS4!

  The component yields references to the following contextual components:

  * [Components.NavbarContent](Components.NavbarContent.html)
  * [Components.NavbarToggle](Components.NavbarToggle.html)
  * [Components.NavbarNav](Components.NavbarNav.html)

  Furthermore references to the following actions are yielded:

  * `collapse`: triggers the `onCollapse` action and collapses the navbar (mobile)
  * `expand`: triggers the `onExpand` action and expands the navbar (mobile)
  * `toggleNavbar`: triggers the `toggleNavbar` action and toggles the navbar (mobile)

  ### Responsive Design

  For the mobile breakpoint the Bootstrap styles will hide the navbar content (`{{navbar.content}}`). Clicking on the
  navbar toggle button (`{{navbar.toggle}}`) will expand the menu. By default all nav links (`<nav.linkTo @route="...">`) are already
  wired up to call the navbar's `collapse` action, so clicking any of them will collapse the navbar. To selectively
  prevent that, you can set its `collapseNavbar` property to false:

  ```hbs
  <nav.item>
    <nav.linkTo @route="index" @collapseNavbar={{false}}>Don't collapse</nav.linkTo>
  </nav.item>
  ```

  To collapse the navbar when clicking on some nav items that are not internal links, you can use the yielded `collapse`
  action:

  ```hbs
  <BsNavbar as |navbar|>
    <navbar.content>
      <navbar.nav as |nav|>
        <nav.item>
          <a onclick={{action navbar.collapse}}>Collapse</a>
        </nav.item>
      </navbar.nav>
    </navbar.content>
  </BsNavbar>
  ```

  ### Navbar styles

  The component supports the default bootstrap navbar styling options through the `type`
  property. Bootstrap navbars [do not currently support justified nav links](http://getbootstrap.com/components/#navbar-default),
  so those are explicitly disallowed.

  Other bootstrap navbar variations, such as forms, buttons, etc. can be supported through direct use of
  bootstrap styles applied through the `class` attribute on the components.

  ### Bootstrap 3/4 Notes

  Bootstrap 4 changed the default navbar styling option from `navbar-default` to `navbar-light`.
  If you explicitly specified "default" in Bootstrap 3 and are migrating, you will need to change
  this in your code. Bootstrap 4 changes `navbar-inverse` to `navbar-dark`.

  Bootstrap 4 navbars are fluid by default without the need for an additional container. An
  additional container is added like with Bootstrap 3 if `fluid` is `false`.

  @class Navbar
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@tagName('nav')
@classNames('navbar')
@classNameBindings('positionClass', 'typeClass')
export default class Navbar extends Component {
  /**
   * Manages the state for the responsive menu between the toggle and the content.
   *
   * @property collapsed
   * @type boolean
   * @default true
   * @public
   */
  @defaultValue
  collapsed = true;

  /**
   * @property _collapsed
   * @private
   */
  @listenTo('collapsed')
  _collapsed;

  /**
   * Controls whether the wrapping div is a fluid container or not.
   *
   * @property fluid
   * @type boolean
   * @default true
   * @public
   */
  @defaultValue
  fluid = true;

  /**
   * Specifies the position classes for the navbar, currently supporting none, "fixed-top", "fixed-bottom", and
   * either "static-top" (BS3) or "sticky-top" (BS4).
   * See the [bootstrap docs](http://getbootstrap.com/components/#navbar-fixed-top) for details.
   *
   * @property position
   * @type String
   * @default null
   * @public
   */
  @defaultValue
  position = null;

  @computed('position')
  get positionClass() {
    let position = this.get('position');
    let validPositions = this.get('_validPositions');
    let positionPrefix = this.get('_positionPrefix');

    if (validPositions.indexOf(position) === -1) {
      return null;
    }

    return `${positionPrefix}${position}`;
  }

  /**
   * Property for type styling
   *
   * For the available types see the [Bootstrap docs](https://getbootstrap.com/docs/4.3/components/navbar/#color-schemes)
   *
   * @property type
   * @type String
   * @default 'default'
   * @public
   */
  @defaultValue
  type = 'default';

  @typeClass('navbar', 'type')
  typeClass;

  /**
   * The action to be sent when the navbar is about to be collapsed.
   *
   * You can return false to prevent collapsing the navbar automatically, and do that in your action by
   * setting `collapsed` to true.
   *
   * @event onCollapse
   * @public
   */
  onCollapse() {}

  /**
   * The action to be sent after the navbar has been collapsed (including the CSS transition).
   *
   * @event onCollapsed
   * @public
   */
  onCollapsed() {}

  /**
   * The action to be sent when the navbar is about to be expanded.
   *
   * You can return false to prevent expanding the navbar automatically, and do that in your action by
   * setting `collapsed` to false.
   *
   * @event onExpand
   * @public
   */
  onExpand() {}

  /**
   * The action to be sent after the navbar has been expanded (including the CSS transition).
   *
   * @event onExpanded
   * @public
   */
  onExpanded() {}

  @observes('_collapsed')
  _onCollapsedChange() {
    let collapsed = this.get('_collapsed');
    let active = this.get('active');
    if (collapsed !== active) {
      return;
    }
    if (collapsed === false) {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * @method expand
   * @private
   */
  @action
  expand() {
    if (this.onExpand() !== false) {
      this.set('_collapsed', false);
    }
  }

  /**
   * @method collapse
   * @private
   */
  @action
  collapse() {
    if (this.onCollapse() !== false) {
      this.set('_collapsed', true);
    }
  }

  @action
  toggleNavbar() {
    if (this.get('_collapsed')) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  /**
   * Bootstrap 4 Only: Defines the responsive toggle breakpoint size. Options are the standard
   * two character Bootstrap size abbreviations. Used to set the `navbar-expand-*`
   * class. Set to `null` to disable collapsing.
   *
   * @property toggleBreakpoint
   * @type String
   * @default 'lg'
   * @public
   */

  /**
   * Bootstrap 4 Only: Sets the background color for the navbar. Can be any color
   * in the set that composes the `bg-*` classes and can be extended by creating your
   * own `bg-*` classes.
   *
   * @property backgroundColor
   * @type String
   * @default 'light'
   * @public
   */

  /**
   * @property toggleComponent
   * @type {String}
   * @private
   */
  @defaultValue
  toggleComponent = 'bs-navbar/toggle';

  /**
   * @property contentComponent
   * @type {String}
   * @private
   */
  @defaultValue
  contentComponent = 'bs-navbar/content';

  /**
   * @property navComponent
   * @type {String}
   * @private
   */
  @defaultValue
  navComponent = 'bs-navbar/nav';

  /**
   * @property linkToComponent
   * @type {String}
   * @private
   */
  @defaultValue
  linkToComponent = 'bs-navbar/link-to';
}
