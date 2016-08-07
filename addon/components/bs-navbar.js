import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';
import layout from '../templates/components/bs-navbar';

/**
 Component to generate [bootstrap navbars](http://getbootstrap.com/components/#navbar).

 ### Usage

 Use in combination with the following components:

 - [Components.NavbarHeader](Components.NavbarHeader.html
 - [Components.NavbarContent](Components.NavbarContent.html
 - [Components.NavbarToggle](Components.NavbarToggle.html
 - [Components.NavbarBrand](Components.NavbarBrand.html
 - [Components.NavbarNav](Components.NavbarNav.html
 - [Components.NavItem](Components.NavItem.html)

 ```hbs
 {{#bs-navbar as |navbar|}}
   {{#bs-navbar-header}}
     {{#bs-navbar-toggle action=navbar.toggle}}
       <span class="sr-only">Toggle navigation</span>
       <span class="icon-bar"></span>
       <span class="icon-bar"></span>
       <span class="icon-bar"></span>
     {{/bs-navbar-toggle}}
     {{#bs-navbar-brand}}Brand{{/bs-navbar-brand}}
   {{/bs-navbar-header}}
   {{#bs-navbar-content collapsed=navbar.collapsed}}
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

 Other bootstrap navbar variations, such as forms, buttons, fixed to top, etc. can be supported through direct use of
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

  actions: {
    toggleNavbar() {
      this.toggleProperty('collapsed');
    }
  }
});
