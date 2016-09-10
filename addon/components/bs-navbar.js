import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';
import layout from '../templates/components/bs-navbar';

/**
 Component to generate [bootstrap navbars](http://getbootstrap.com/components/#navbar).

 ### Usage

 Used in combination with the following components:

 - [Components.NavbarContent](Components.NavbarContent.html)
 - [Components.NavbarToggle](Components.NavbarToggle.html)
 - [Components.NavbarNav](Components.NavbarNav.html)
 - [Components.NavItem](Components.NavItem.html)

 ```hbs
 {{#bs-navbar}}
   <div class="navbar-header">
     {{#bs-navbar-toggle}}
       <span class="sr-only">Toggle navigation</span>
       <span class="icon-bar"></span>
       <span class="icon-bar"></span>
       <span class="icon-bar"></span>
     {{/bs-navbar-toggle}}
     <a class="navbar-brand" href="#">Brand</a>
   </div>
   {{#bs-navbar-content}}
     {{#bs-navbar-nav}}
       {{#bs-nav-item}}{{#link-to "alert"}}Alert{{/link-to}}{{/bs-nav-item}}
       {{#bs-nav-item}}{{#link-to "button"}}Buttons{{/link-to}}{{/bs-nav-item}}
       {{#bs-nav-item}}{{#link-to "dropdown"}}Dropdown{{/link-to}}{{/bs-nav-item}}
       {{#bs-nav-item}}{{#link-to "forms"}}Forms{{/link-to}}{{/bs-nav-item}}
       {{#bs-nav-item}}{{#link-to "accordion"}}Accordion{{/link-to}}{{/bs-nav-item}}
       {{#bs-nav-item}}{{#link-to "collapse"}}Collapse{{/link-to}}{{/bs-nav-item}}
       {{#bs-nav-item}}{{#link-to "modal"}}Modals{{/link-to}}{{/bs-nav-item}}
       {{#bs-nav-item}}{{#link-to "progress"}}Progress bars{{/link-to}}{{/bs-nav-item}}
       {{#bs-nav-item}}{{#link-to "navs"}}Navs{{/link-to}}{{/bs-nav-item}}
       {{#bs-nav-item}}{{#link-to "navbars"}}Navbars{{/link-to}}{{/bs-nav-item}}
     {{/bs-navbar-nav}}
   {{/bs-navbar-content}}
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
