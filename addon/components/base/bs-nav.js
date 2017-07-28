import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-nav';

const { isPresent } = Ember;

/**

 Component to generate [bootstrap navs](http://getbootstrap.com/components/#nav)

 ### Usage

 Use in combination with the yielded components

 * [Components.NavItem](Components.NavItem.html)
 * [Components.NavLinkTo](Components.NavLinkTo.html)
 * [`nav.dropdown`](Components.Dropdown.html)

 ```hbs
 {{#bs-nav type="pills" as |nav|}}
   {{#nav.item}}
      {{#nav.link-to "foo"}}Foo{{/nav.link-to}}
   {{/nav.item}}
   {{#nav.item}}
     {{#nav.link-to "bar"}}Bar{{/nav.link-to}}
   {{/nav.item}}
 {{/bs-nav}}
 ```

 ### Nav styles

 The component supports the default bootstrap nav styling options "pills" and "tabs" through the `type`
 property, as well as the `justified` and `stacked` properties.

 ### Active items

 Bootstrap expects to have the `active` class on the `<li>` element that should be the active (highlighted)
 navigation item. To achieve that just use the `link-to` helper as usual. If the link is active, i.e
 it points to the current route, the `bs-nav-item` component will detect that and apply the `active` class
 automatically. The same applies for the `disabled` state.

 ### Dropdowns

 Use the `nav.dropdown` contextual version of the [Components.Dropdown](Components.Dropdown.html) component
 with a `tagName` of "li" to integrate a dropdown into your nav:

 ```hbs
 {{#bs-nav type="pills" as |nav|}}
   {{#nav.item}}{{#nav.link-to "index"}}Home{{/nav.link-to}}{{/nav.item}}
   {{#nav.dropdown tagName="li" as |dd|}}
     {{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}
     {{#dd.menu as |ddm|}}
       {{#ddm.item}}{{#link-to "foo"}}Foo{{/link-to}}{{/ddm.item}}
       {{#ddm.item}}{{#link-to "bar"}}Bar{{/link-to}}{{/ddm.item}}
     {{/dd.menu}}
   {{/nav.dropdown}}
 {{/bs-nav}}
 ```

 ### Bootstrap 3/4 Notes

 Use [`nav.link-to`](Components.NavLinkTo.html) for in-app links to ensure proper styling regardless of
 Bootstrap version. Explicit use of `<a>` tags in Bootstrap 4 must apply the `nav-link` class and manage
 the `active` state explicitly.

 You can override `tagName` if you want to use Bootstrap 4's ability to represent more structural
 components with `div` tags.

 @class Nav
 @namespace Components
 @extends Ember.Component
 @public

 */
export default Ember.Component.extend({
  layout,

  tagName: 'ul',
  classNames: ['nav'],

  classNameBindings: ['typeClass', 'justified:nav-justified'],

  typeClass: Ember.computed('type', function() {
    let type = this.get('type');
    if (isPresent(type)) {
      return `nav-${type}`;
    }
  }),

  /**
   * Special type of nav, either "pills" or "tabs"
   *
   * @property type
   * @type String
   * @default null
   * @public
   */
  type: null,

  /**
   * Make the nav justified, see [bootstrap docs](http://getbootstrap.com/components/#nav-justified)
   *
   * @property justified
   * @type boolean
   * @default false
   * @public
   */
  justified: false,

  /**
   * Make the nav pills stacked, see [bootstrap docs](http://getbootstrap.com/components/#nav-pills)
   *
   * @property stacked
   * @type boolean
   * @default false
   * @public
   */
  stacked: false,

  /**
   * @property itemComponent
   * @type {String}
   * @private
   */
  itemComponent: 'bs-nav/item',

  /**
   * @property linkToComponent
   * @type {String}
   * @private
   */
  linkToComponent: 'bs-nav/link-to',

  /**
   * @property dropdownComponent
   * @type {String}
   * @private
   */
  dropdownComponent: 'bs-dropdown'
});
