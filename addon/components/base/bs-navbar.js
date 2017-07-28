import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';
import layout from 'ember-bootstrap/templates/components/bs-navbar';
import listenTo from 'ember-bootstrap/utils/listen-to-cp';

const { observer } = Ember;

/**
 Component to generate [Bootstrap navbars](http://getbootstrap.com/components/#navbar).

 ### Usage

 Uses the following components by a contextual reference:

 ```hbs
 {{#bs-navbar as |navbar|}}
   <div class="navbar-header">
     {{navbar.toggle}}
     <a class="navbar-brand" href="#">Brand</a>
   </div>
   {{#navbar.content}}
     {{#navbar.nav as |nav|}}
       {{#nav.item}}
         {{#nav.link-to "home"}}Home{{/nav.link-to}}
       {{/nav.item}}
       {{#nav.item}}
         {{#nav.link-to "navbars"}}Navbars{{/nav.link-to}}
       {{/nav.item}}
     {{/navbar.nav}}
   {{/navbar.content}}
 {{/bs-navbar}}
 ```

 The component yields references to the following contextual components:

 * [Components.NavbarContent](Components.NavbarContent.html)
 * [Components.NavbarToggle](Components.NavbarToggle.html)
 * [Components.NavbarNav](Components.NavbarNav.html)

 Furthermore references to the following actions are yielded:

 * `collapse`: triggers the `onCollapse` action and collapses the navbar (mobile)
 * `expand`: triggers the `onExpand` action and expands the navbar (mobile)

 ### Responsive Design

 For the mobile breakpoint the Bootstrap styles will hide the navbar content (`{{navbar.content}}`). Clicking on the
 navbar toggle button (`{{navbar.toggle}}`) will expand the menu. By default all nav links (`{{nav.link-to}}`) are already
 wired up to call the navbar's `collapse` action, so clicking any of them will collapse the navbar. To selectively
 prevent that, you can set its `collapseNavbar` property to false:

 ```hbs
 {{#nav.item}}
   {{#nav.link-to "index" collapseNavbar=false}}Don't collapse{{/nav.link-to}}
 {{/nav.item}}
 ```

 To collapse the navbar when clicking on some nav items that are not internal links, you can use the yielded `collapse`
 action:

 ```hbs
 {#bs-navbar as |navbar|}}
   {{#navbar.content}}
     {{#navbar.nav as |nav|}}
       {{#nav.item}}
         <a {{action navbar.collapse}}>Collapse</a>
       {{/nav.item}}
     {{/navbar.nav}}
   {{/navbar.content}}
 {{/bs-navbar}}
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
 this in your code. Both versions retain the `navbar-inverse` style.

 Bootstrap 4 navbars are fluid by default without the need for an additional container. An
 additional container is added like with Bootstrap 3 if `fluid` is `false`.

 @class Navbar
 @namespace Components
 @extends Ember.Component
 @uses Mixins.TypeClass
 @public

 */
export default Ember.Component.extend(TypeClass, {
  layout,

  tagName: 'nav',
  classNames: ['navbar'],
  classNameBindings: ['positionClass'],

  classTypePrefix: 'navbar',

  /**
   * Manages the state for the responsive menu between the toggle and the content.
   *
   * @property collapsed
   * @type boolean
   * @default true
   * @public
   */
  collapsed: true,

  /**
   * @property _collapsed
   * @private
   */
  _collapsed: listenTo('collapsed'),

  /**
   * Controls whether the wrapping div is a fluid container or not.
   *
   * @property fluid
   * @type boolean
   * @default true
   * @public
   */
  fluid: true,

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
  position: null,

  positionClass: Ember.computed('position', function() {
    let position = this.get('position');
    let validPositions = this.get('_validPositions');
    let positionPrefix = this.get('_positionPrefix');

    if (validPositions.indexOf(position) === -1) {
      return null;
    }

    return `${positionPrefix}${position}`;
  }),

  /**
   * The action to be sent when the navbar is about to be collapsed.
   *
   * You can return false to prevent collapsing the navbar automatically, and do that in your action by
   * setting `collapsed` to true.
   *
   * @event onCollapse
   * @public
   */
  onCollapse() {},

  /**
   * The action to be sent after the navbar has been collapsed (including the CSS transition).
   *
   * @event onCollapsed
   * @public
   */
  onCollapsed() {},

  /**
   * The action to be sent when the navbar is about to be expanded.
   *
   * You can return false to prevent expanding the navbar automatically, and do that in your action by
   * setting `collapsed` to false.
   *
   * @event onExpand
   * @public
   */
  onExpand() {},

  /**
   * The action to be sent after the navbar has been expanded (including the CSS transition).
   *
   * @event onExpanded
   * @public
   */
  onExpanded() {},

  _onCollapsedChange: observer('_collapsed', function() {
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
  }),

  /**
   * @method expand
   * @private
   */
  expand() {
    if (this.onExpand() !== false) {
      this.set('_collapsed', false);
    }
  },

  /**
   * @method collapse
   * @private
   */
  collapse() {
    if (this.onCollapse() !== false) {
      this.set('_collapsed', true);
    }
  },

  actions: {
    expand() {
      this.expand();
    },
    collapse() {
      this.collapse();
    },
    toggleNavbar() {
      if (this.get('_collapsed')) {
        this.expand();
      } else {
        this.collapse();
      }
    }
  }

  /**
   * Bootstrap 4 Only: Defines the responsive toggle breakpoint size. Options are the standard
   * two character Bootstrap size abbreviations. Used to set the `navbar-toggleable-*`
   * class.
   *
   * @property toggleBreakpoint
   * @type String
   * @default 'md'
   * @public
   */

  /**
   * Bootstrap 4 Only: Sets the background color for the navbar. Can be any color
   * in the set that composes the `bg-*` classes and can be extended by creating your
   * own `bg-*` classes.
   *
   * @property backgroundColor
   * @type String
   * @default 'faded'
   * @public
   */
});
