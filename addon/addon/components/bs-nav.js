import Component from '@glimmer/component';

/**
  Component to generate [bootstrap navs](http://getbootstrap.com/components/#nav)

  ### Usage

  Use in combination with the yielded components

  * [Components.NavItem](Components.NavItem.html)
  * [`nav.dropdown`](Components.Dropdown.html)

  ```hbs
  <BsNav @type="pills" as |nav|>
    <nav.item>
      <nav.linkTo @route="foo">
        Foo
      </nav.linkTo>
    </nav.item>
    <nav.item>
      <nav.linkTo @route="bar" @model={{this.model}}>
        Bar
      </nav.linkTo>
    </nav.item>
  </BsNav>
  ```

  > Note: the use of angle brackets `<nav.linkTo>` as shown above is only supported for Ember >= 3.10, as it relies on
  > Ember's native implementation of the [`LinkComponent`](https://api.emberjs.com/ember/3.12/classes/Ember.Templates.helpers/methods/link-to?anchor=link-to).
  > For older Ember versions please use the legacy syntax with positional arguments: `{{#nav.link-to "bar" this.model}}Bar{{/nav.link-to}}`

  ### Nav styles

  The component supports the default bootstrap nav styling options "pills" and "tabs" through the `type`
  property, as well as the `justified`, `fill` and `stacked` properties.

  ### Active items

  Bootstrap 3 expects to have the `active` class on the `<li>` element that should be the active (highlighted)
  navigation item. To achieve that use the `@route` and optionally `@model` (or `@models`) and `@query` properties
  of the yielded `nav.linkTo` component just as you would for Ember's `<LinkTo>` component to create a link with proper
  `active` class support.

  ### Dropdowns

  Use the `nav.dropdown` contextual version of the [Components.Dropdown](Components.Dropdown.html) component
  with a `tagName` of "li" to integrate a dropdown into your nav:

  ```hbs
  <BsNav @type="pills" as |nav|>
    <nav.item>
      <nav.linkTo @route="index">
        Home
      </nav.linkTo>
    </nav.item>
    <nav.dropdown as |dd|>
      <dd.toggle>Dropdown <span class="caret"></span></dd.toggle>
      <dd.menu as |ddm|>
        <ddm.item><ddm.linkTo @route="foo">Foo</ddm.linkTo></ddm.item>
        <ddm.item><ddm.linkTo @route="bar">Bar</ddm.linkTo></ddm.item>
      </dd.menu>
    </nav.dropdown>
  </BsNav>
  ```

  ### Bootstrap 3/4 Notes

  Use [`nav.linkTo`](Components.NavLinkTo.html) for in-app links to ensure proper styling regardless of
  Bootstrap version. Explicit use of `<a>` tags in Bootstrap 4 must apply the `nav-link` class and manage
  the `active` state explicitly.

  The `fill` styling is only available with Bootstrap 4

  *Note that only invoking the component in a template as shown above is considered part of its public API. Extending from it (subclassing) is generally not supported, and may break at any time.*

  @class Nav
  @namespace Components
  @extends Component
  @public

 */
export default class Nav extends Component {
  get typeClass() {
    let type = this.type;
    return type ? `nav-${type}` : undefined;
  }

  /**
   * Special type of nav, either "pills" or "tabs"
   *
   * @property type
   * @type String
   * @default null
   * @public
   */
  get type() {
    return this.args.type ?? null;
  }

  /**
   * Make the nav justified, see [bootstrap docs](http://getbootstrap.com/components/#nav-justified)
   *
   * @property justified
   * @type boolean
   * @default false
   * @public
   */
  get justified() {
    return this.args.justified ?? false;
  }

  /**
   * Make the nav pills stacked, see [bootstrap docs](http://getbootstrap.com/components/#nav-pills)
   *
   * @property stacked
   * @type boolean
   * @default false
   * @public
   */
  get stacked() {
    return this.args.stacked ?? false;
  }

  /**
   * Make the nav flex fill (BS4 only), see [bootstrap docs](http://getbootstrap.com/docs/4.1/components/navs/#fill-and-justify)
   *
   * @property fill
   * @type boolean
   * @default false
   * @public
   */
  get fill() {
    return this.args.fill ?? false;
  }

  /**
   * @property itemComponent
   * @type {String}
   * @private
   */

  /**
   * @property linkToComponent
   * @type {String}
   * @private
   */

  /**
   * @property dropdownComponent
   * @type {String}
   * @private
   */
}
