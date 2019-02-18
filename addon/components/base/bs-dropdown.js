import Component from '@ember/component';
import { computed } from '@ember/object';
import { bind } from '@ember/runloop';
import layout from 'ember-bootstrap/templates/components/bs-dropdown';

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
   * [Components.DropdownMenuLinkTo](Components.DropdownMenuLinkTo.html)

 Furthermore references to the following actions are yielded:

 * `toggleDropdown`
 * `openDropdown`
 * `closeDropdown`

 ```hbs
 {{#bs-dropdown as |dd|}}
   {{#dd.toggle}}Dropdown <span class="caret"></span>{{/dd.toggle}}
   {{#dd.menu as |ddm|}}
     {{#ddm.item}}
       {{#ddm.link-to "index"}}Something{{/ddm.link-to}}
     {{/ddm.item}}
     {{ddm.divider}}
     {{#ddm.item}}
       {{#ddm.link-to "index"}}Something different{{/ddm.link-to}}
     {{/ddm.item}}
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
       {{#ddm.item}}{{#ddm.link-to "index"}}Something{{/ddm.link-to}}{{/ddm.item}}
       {{#ddm.item}}{{#ddm.link-to "index"}}Something different{{/ddm.link-to}}{{/ddm.item}}
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
     {{#ddm.item}}{{#ddm.link-to "index"}}Something{{/ddm.link-to}}{{/ddm.item}}
     {{#ddm.item}}{{#ddm.link-to "index"}}Something different{{/ddm.link-to}}{{/ddm.item}}
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

 ### Open, close or toggle the dropdown programmatically

 If you wanted to control when the dropdown opens and closes programmatically, the `bs-dropdown` component yields the
 `openDropdown`, `closeDropdown` and `toggleDropdown` actions which you can then pass to your own handlers. For example:

 ```hbs
 {{#bs-dropdown closeOnMenuClick=false as |dd|}}
   {{#bs-button}}Dropdown{{/bs-button}}
   {{#dd.button}}Dropdown <span class="caret"></span>{{/dd.button}}
   {{#dd.menu as |ddm|}}
     {{#each items as |item|}}
       {{#ddm.item}}
         <a href onclick={{action "changeItems" item dd.closeDropdown}}>
           {{item.text}}
         </a>
       {{/ddm.item}}
     {{/each}}
   {{/dd.menu}}
   {{/bs-dropdown}}
 ```

 Then in your controller or component, optionally close the dropdown:

 ```js
 ...
 actions: {
   handleDropdownClicked(item, closeDropdown) {
     if(item.isTheRightOne) {
       this.chosenItems.pushObject(item);
       closeDropdown();
     } else {
       this.set('item', this.getRandomItems());
     }
   },
 }
 ```


 ### Bootstrap 3/4 Notes

 If you need to use dropdowns in a [nav](Components.Nav.html), use the `bs-nav.dropdown`
 contextual component rather than a standalone dropdown to ensure the correct styling
 regardless of your Bootstrap version.

 If you use the [dropdown divider](Components.DropdownMenuDivider), you don't have to worry
 about differences in the markup between versions.

 Be sure to use the [dropdown menu link-to](Component.DropdownMenuLinkTo), for in-application
 links as dropdown menu items. This is essential for proper styling regardless of Bootstrap
 version and will also provide automatic `active` highlighting on dropdown menu items. If you
 wish to have a dropdown menu item refer to an external link, be sure to apply the `dropdown-item`
 class to the `<a>` tag for Bootstrap 4 compatibility.

 The dropdown menu will be positioned using the `popper.js` library, just as the original Bootstrap
 version does. This also allows you to set `renderInPlace=false` on the menu component to render it in a wormhole,
 which you might want to do if you experience clipping issues by an outer `overflow: hidden` element.

 @class Dropdown
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Component.extend({
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
   * By default the dropdown menu will expand downwards. Other options include, 'up', 'left' and 'right'
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
   * BS4 only: "dropleft", "dropright"
   *
   * @property containerClass
   * @type string
   * @readonly
   * @private
   */
  containerClass: computed('toggle.tagName', 'direction', function() {
    if (this.get('toggle.tagName') === 'button' && !this.get('toggle.block')) {
      return this.get('direction') !== 'down' ? `btn-group drop${this.get('direction')}` : 'btn-group';
    } else {
      return `drop${this.get('direction')}`;
    }
  }),

  /**
   * @property menuElement
   * @private
   */
  menuElement: computed(function() {
    return document.getElementById(`${this.get('elementId')}__menu`);
  }),

  /**
   * @property toggleElement
   * @private
   */
  toggleElement: computed('toggle', function() {
    return typeof FastBoot === 'undefined' ? this.get('toggle.element') || null : null;
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
      this.addClickListener();
      this.get('onShow')();
    },

    closeDropdown() {
      this.set('isOpen', false);
      this.removeClickListener();
      this.get('onHide')();
    }
  },

  addClickListener() {
    if (!this.clickListener) {
      this.clickListener = bind(this, this.closeOnClickHandler);
      document.addEventListener('click', this.clickListener, true);
    }
  },

  removeClickListener() {
    if (this.clickListener)  {
      document.removeEventListener('click', this.clickListener, true);
      this.clickListener = null;
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    this.removeClickListener();
  },

  /**
   * Handler for click events to close the dropdown
   *
   * @method closeOnClickHandler
   * @param e
   * @protected
   */
  closeOnClickHandler(e) {
    let { target } = e;
    let { toggleElement, menuElement } = this.getProperties('toggleElement', 'menuElement');

    if (!this.get('isDestroyed')
      && (toggleElement && !toggleElement.contains(target))
      && ((menuElement && !menuElement.contains(target)) || this.get('closeOnMenuClick'))) {
      this.send('closeDropdown');
    }
  },

  /**
   * @property buttonComponent
   * @type {String}
   * @private
   */
  buttonComponent: 'bs-dropdown/button',

  /**
   * @property toggleComponent
   * @type {String}
   * @private
   */
  toggleComponent: 'bs-dropdown/toggle',

  /**
   * @property menuComponent
   * @type {String}
   * @private
   */
  menuComponent: 'bs-dropdown/menu'
});
