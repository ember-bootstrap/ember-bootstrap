import { computed } from '@ember/object';
import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import layout from 'ember-bootstrap/templates/components/bs-nav';

/**
  Component to generate [bootstrap navs](http://getbootstrap.com/components/#nav)

  ### Usage

  Use in combination with the yielded components

  * [Components.NavItem](Components.NavItem.html)
  * [`nav.dropdown`](Components.Dropdown.html)

  ```hbs
  <BsNav @type="pills" as |nav|>
    <nav.item>
      <nav.link-to @route="foo">
        Foo
      </nav.link-to>
    </nav.item>
    <nav.item>
      <nav.link-to @route="bar" @model={{this.model}}>
        Bar
      </nav.link-to>
    </nav.item>
  </BsNav>
  ```

  > Note: the use of angle brackets `<nav.link-to>` as shown above is only supported for Ember 3.10, as it relies on its
  > own native implementation of the `LinkComponent`. For older Ember versions please use the legacy syntax with positional
  > arguments: `{{#nav.link-to "bar" this.model}}Bar{{/nav.link-to}}`

  ### Nav styles

  The component supports the default bootstrap nav styling options "pills" and "tabs" through the `type`
  property, as well as the `justified`, `fill` and `stacked` properties.

  ### Active items

  Bootstrap 3 expects to have the `active` class on the `<li>` element that should be the active (highlighted)
  navigation item. To achieve that use the `@route` and optionally `@model` (or `@models`) and `@query` properties
  of the yielded `nav.link-to` component just as you would for Ember's `<LinkTo>` component to create a link with proper
  `active` class support.

  ### Dropdowns

  Use the `nav.dropdown` contextual version of the [Components.Dropdown](Components.Dropdown.html) component
  with a `tagName` of "li" to integrate a dropdown into your nav:

  ```hbs
  <BsNav @type="pills" as |nav|>
    <nav.item>
      <nav.link-to @route="index">
        Home
      </nav.link-to>
    </nav.item>
    <nav.dropdown as |dd|>
      <dd.toggle>Dropdown <span class="caret"></span></dd.toggle>
      <dd.menu as |ddm|>
        <ddm.item>{{#ddm.link-to "foo"}}Foo{{/ddm.link-to}}</ddm.item>
        <ddm.item>{{#ddm.link-to "bar"}}Bar{{/ddm.link-to}}</ddm.item>
      </dd.menu>
    </nav.dropdown>
  </BsNav>
  ```

  ### Bootstrap 3/4 Notes

  Use [`nav.link-to`](Components.NavLinkTo.html) for in-app links to ensure proper styling regardless of
  Bootstrap version. Explicit use of `<a>` tags in Bootstrap 4 must apply the `nav-link` class and manage
  the `active` state explicitly.

  The `fill` styling is only available with Bootstrap 4

  @class Nav
  @namespace Components
  @extends Ember.Component
  @public

 */
export default Component.extend({
  layout,

  tagName: 'ul',
  classNames: ['nav'],

  classNameBindings: ['typeClass', 'justified:nav-justified'],

  typeClass: computed('type', function() {
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
