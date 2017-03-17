import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-dropdown';

const {
  computed,
  $,
  run: { bind }
} = Ember;

/**
 Bootstrap style [dropdown menus](http://getbootstrap.com/components/#dropdowns), consisting
 of a toggle element, and the dropdown menu itself.

 ### Usage

 Use this component together with the yielded contextual components:
 * [Components.DropdownToggle](Components.DropdownToggle.html)
 * [Components.DropdownButton](Components.DropdownButton.html)
 * [Components.DropdownMenu](Components.DropdownMenu.html)
   * [Components.DropdownMenuItem](Components.DropdownMenuItem.html)
   * [Components.DropdownMenuDivider](Components.DropdownMenuDivider.html)

 ```hbs
 {{#bs-dropdown as |dd|}}
   {{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}
   {{#dd.menu as |ddm|}}
     {{#ddm.item}}{{#link-to "index"}}Something{{/link-to}}{{/ddm.item}}
     {{ddm.divider}}
     {{#ddm.item}}{{#link-to "index"}}Something different{{/link-to}}{{/ddm.item}}
   {{/dd.menu}}
 {{/bs-dropdown}}
 ```

 If you need to use dropdowns in a [nav](Components.Nav.html), use the `bs-nav.dropdown`
 contextual component rather than a standalone dropdown to ensure the correct styling
 regardless of your Bootstrap version.

 ### Button dropdowns

 To use a button as the dropdown toggle element (see http://getbootstrap.com/components/#btn-dropdowns), use the
 `Components.DropdownButton` component as the toggle:

 ```hbs
 {{#bs-dropdown as |dd|}}
   {{#dd.button}}Dropdown <span class="caret"></span>{{/dd.button}}
   {{#dd.menu as |ddm|}}
       {{#ddm.item}}{{#link-to "index"}}Something{{/link-to}}{{/ddm.item}}
       {{#ddm.item}}{{#link-to "index"}}Something different{{/link-to}}{{/ddm.item}}
     {{/dd.menu}}
 {{/bs-dropdown}}
 ```

 It has all the functionality of a `Components.Button` with additional dropdown support.

 ### Split button dropdowns

 To have a regular button with a dropdown button as in http://getbootstrap.com/components/#btn-dropdowns-split, use a
 `Components.Button` component and a `Components.DropdownButton`:

 ```hbs
 {{#bs-dropdown as |dd|}}
   {{#bs-button}}Dropdown{{/bs-button}}
   {{#dd.button}}Dropdown <span class="caret"></span>{{/dd.button}}
   {{#dd.menu as |ddm|}}
     {{#ddm.item}}{{#link-to "index"}}Something{{/link-to}}{{/ddm.item}}
     {{#ddm.item}}{{#link-to "index"}}Something different{{/link-to}}{{/ddm.item}}
   {{/dd.menu}}
   {{/bs-dropdown}}
 ```

 ### Dropup style

 Set the `direction` property to "up" to switch to a "dropup" style:

 ```hbs
 {{#bs-dropdown direction="up" as |dd|}}
 ...
 {{/bs-dropdown}}
 ```

 ### Bootstrap 3/4 Notes

 If you need to use dropdowns in a [nav](Components.Nav.html), use the `bs-nav.dropdown`
 contextual component rather than a standalone dropdown to ensure the correct styling
 regardless of your Bootstrap version.

 If you use the [dropdown divider](Component.DropdownMenuDivider), you don't have to worry
 about differences in the markup between versions.

 @class Dropdown
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Ember.Component.extend({
  layout,
  classNameBindings: ['containerClass'],

  /**
   * This property reflects the state of the dropdown, whether it is open or closed.
   *
   * @property isOpen
   * @default false
   * @type boolean
   * @private
   */
  isOpen: false,

  /**
   * By default clicking on an open dropdown menu will close it. Set this property to false for the menu to stay open.
   *
   * @property closeOnMenuClick
   * @default true
   * @type boolean
   * @public
   */
  closeOnMenuClick: true,

  /**
   * jQuery click event name, namespaced to this component's instance to prevent interference between multiple dropdowns.
   *
   * @property clickEventName
   * @type string
   * @private
   */
  clickEventName: undefined,

  /**
   * By default the dropdown menu will expand downwards. Set to 'up' to expand upwards.
   *
   * @property direction
   * @type string
   * @default 'down'
   * @public
   */
  direction: 'down',

  /**
   * Indicates the dropdown is being used as a navigation item dropdown.
   *
   * @property inNav
   * @type boolean
   * @default false
   * @private
   */
  inNav: false,

  /**
   * A computed property to generate the suiting class for the dropdown container, either "dropdown", "dropup" or "btn-group".
   *
   * @property containerClass
   * @type string
   * @readonly
   * @private
   */
  containerClass: computed('toggle.tagName', 'direction', function() {
    if (this.get('toggle.tagName') === 'button' && !this.get('toggle.block')) {
      return this.get('direction') === 'up' ? 'btn-group dropup' : 'btn-group';
    } else {
      return this.get('direction') === 'up' ? 'dropup' : 'dropdown';
    }
  }),

  /**
   * Reference to the child toggle (Toggle or Button)
   *
   * @property toggle
   * @private
   */
  toggle: null,

  /**
   * Action is called when dropdown is about to be shown
   *
   * @event onShow
   * @param {*} value
   * @public
   */
  onShow(value) {}, // eslint-disable-line no-unused-vars

  /**
   * Action is called when dropdown is about to be hidden
   *
   * @event onHide
   * @param {*} value
   * @public
   */
  onHide(value) {}, // eslint-disable-line no-unused-vars

  actions: {
    toggleDropdown() {
      if (this.get('isOpen')) {
        this.send('closeDropdown');
      } else {
        this.send('openDropdown');
      }
    },

    openDropdown() {
      this.set('isOpen', true);
      $(document).on(this.clickEventName, bind(this, this.closeOnClickHandler));
      this.get('onShow')();
    },

    closeDropdown() {
      this.set('isOpen', false);
      $(document).off(this.clickEventName);
      this.get('onHide')();
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    $(document).off(this.clickEventName);
  },

  init() {
    this._super(...arguments);
    // click event name that is namespaced to our component instance, so multiple dropdowns do not interfere
    // with each other
    this.clickEventName = `click.${this.get('elementId')}`;
  },

  /**
   * Handler for click events to close the dropdown
   *
   * @method closeOnClickHandler
   * @param e
   * @protected
   */
  closeOnClickHandler(e) {
    let $target = $(e.target);
    if (!this.get('isDestroyed')
      && $target.closest(this.$().find('.dropdown-toggle')).length === 0
      && ($target.closest(this.$().find('.dropdown-menu')).length === 0 || this.get('closeOnMenuClick'))) {
      this.send('closeDropdown');
    }
  }
});
