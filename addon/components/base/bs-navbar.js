import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';
import layout from 'ember-bootstrap/templates/components/bs-navbar';

/**
 Component to generate [Bootstrap navbars](http://getbootstrap.com/components/#navbar).

 ### Usage

 Uses the following components by a contextual reference:

 - [Components.NavbarContent](Components.NavbarContent.html)
 - [Components.NavbarToggle](Components.NavbarToggle.html)
 - [Components.NavbarNav](Components.NavbarNav.html)

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
   * @protected
   */
  collapsed: true,

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

  actions: {
    toggleNavbar() {
      this.toggleProperty('collapsed');
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
