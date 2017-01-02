import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';
import layout from '../templates/components/bs-navbar';

/**
 Component to generate [bootstrap navbars](http://getbootstrap.com/components/#navbar).

 ### Usage

 Uses the following components by a contextual reference:

 - [Components.NavbarHeader](Components.NavbarHeader.html)
 - [Components.NavbarContent](Components.NavbarContent.html)
 - [Components.NavbarToggle](Components.NavbarToggle.html)
 - [Components.NavbarBrand](Components.NavbarBrand.html)
 - [Components.NavbarNav](Components.NavbarNav.html)

 ```hbs
 {{#bs-navbar as |navbar|}}
   <div class="navbar-header">
     {{#navbar.toggle}}
       <span class="sr-only">Toggle navigation</span>
       <span class="icon-bar"></span>
       <span class="icon-bar"></span>
       <span class="icon-bar"></span>
     {{/navbar.toggle}}
     <a class="navbar-brand" href="#">Brand</a>
   </div>
   {{#navbar.content}}
     {{#navbar.nav as |nav|}}
       {{#nav.item}}{{#nav.link-to "alert"}}Alert{{/nav.link-to}}{{/nav.item}}
       {{#nav.item}}{{#nav.link-to "button"}}Buttons{{/nav.link-to}}{{/nav.item}}
       {{#nav.item}}{{#nav.link-to "dropdown"}}Dropdown{{/nav.link-to}}{{/nav.item}}
       {{#nav.item}}{{#nav.link-to "forms"}}Forms{{/nav.link-to}}{{/nav.item}}
       {{#nav.item}}{{#nav.link-to "accordion"}}Accordion{{/nav.link-to}}{{/nav.item}}
       {{#nav.item}}{{#nav.link-to "collapse"}}Collapse{{/nav.link-to}}{{/nav.item}}
       {{#nav.item}}{{#nav.link-to "modal"}}Modals{{/nav.link-to}}{{/nav.item}}
       {{#nav.item}}{{#nav.link-to "progress"}}Progress bars{{/nav.link-to}}{{/nav.item}}
       {{#nav.item}}{{#nav.link-to "navs"}}Navs{{/nav.link-to}}{{/nav.item}}
       {{#nav.item}}{{#nav.link-to "navbars"}}Navbars{{/nav.link-to}}{{/nav.item}}
     {{/navbar.nav}}
   {{/navbar.content}}
 {{/bs-navbar}}
 ```

 ### Navbar styles

 The component supports the default bootstrap navbar styling options "default" and "inverse" through the `type`
 property. Bootstrap navbars [do not currently support justified nav links](http://getbootstrap.com/components/#navbar-default),
 so those are explicitly disallowed.

 Other bootstrap navbar variations, such as forms, buttons, etc. can be supported through direct use of
 bootstrap styles applied through the `class` attribute on the components.

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
   * Specifies the position classes for the navbar, currently supporting none, "fixed-top", "fixed-bottom", and "static-top".
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
    let validPositions = ['fixed-top', 'fixed-bottom', 'static-top'];

    if (validPositions.indexOf(position) === -1) {
      return null;
    }

    return `navbar-${position}`;
  }),

  actions: {
    toggleNavbar() {
      this.toggleProperty('collapsed');
    }
  }
});
