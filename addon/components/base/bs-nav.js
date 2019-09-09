import { classNameBindings, classNames, layout as templateLayout, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-nav';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

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

  @class Nav
  @namespace Components
  @extends Ember.Component
  @public

 */
@templateLayout(layout)
@tagName('ul')
@classNames('nav')
@classNameBindings('typeClass', 'justified:nav-justified')
export default class Nav extends Component {
  @computed('type')
  get typeClass() {
    let type = this.get('type');
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
  @defaultValue
  type = null;

  /**
   * Make the nav justified, see [bootstrap docs](http://getbootstrap.com/components/#nav-justified)
   *
   * @property justified
   * @type boolean
   * @default false
   * @public
   */
  @defaultValue
  justified = false;

  /**
   * Make the nav pills stacked, see [bootstrap docs](http://getbootstrap.com/components/#nav-pills)
   *
   * @property stacked
   * @type boolean
   * @default false
   * @public
   */
  @defaultValue
  stacked = false;

  /**
   * @property itemComponent
   * @type {String}
   * @private
   */
  @defaultValue
  itemComponent = 'bs-nav/item';

  /**
   * @property linkToComponent
   * @type {String}
   * @private
   */
  @defaultValue
  linkToComponent = 'bs-nav/link-to';

  /**
   * @property dropdownComponent
   * @type {String}
   * @private
   */
  @defaultValue
  dropdownComponent = 'bs-dropdown';
}
