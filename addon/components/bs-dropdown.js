import Ember from 'ember';
import toggleButton from 'ember-bootstrap/components/bs-dropdown-button';
import ComponentParent from 'ember-bootstrap/mixins/component-parent';

const { computed, observer } = Ember;

/**
 Bootstrap style dropdown menus, consisting of a toggle element, and the dropdown menu itself.
 See http://getbootstrap.com/components/#dropdowns

 Use this component together with two sub components, a dropdown toggle (`Components.DropdownToggle` or
 `Components.DropdownButton` component) and a dropdown menu (`Components.DropdownMenu`) component:

 ```hbs
 <nav class="navbar navbar-default navbar-static">
   <div class="container-fluid">
     <ul class="nav navbar-nav">
       {{#bs-dropdown tagName="li"}}
         {{#bs-dropdown-toggle}}Dropdown <span class="caret"></span>{{/bs-dropdown-toggle}}
         {{#bs-dropdown-menu}}
           <li>{{#link-to "index"}}Something{{/link-to}}</li>
           <li>{{#link-to "index"}}Something different{{/link-to}}</li>
         {{/bs-dropdown-menu}}
       {{/bs-dropdown}}
     </ul>
   </div>
 </nav>
 ```

 ### Button dropdowns

 To use a button as the dropdown toggle element (see http://getbootstrap.com/components/#btn-dropdowns), use the
 `Components.DropdownButton` component as the toggle:

 ```hbs
 {{#bs-dropdown}}
   {{#bs-dropdown-button}}Dropdown <span class="caret"></span>{{/bs-dropdown-button}}
   {{#bs-dropdown-menu}}
     <li>{{#link-to "index"}}Something{{/link-to}}</li>
     <li>{{#link-to "index"}}Something different{{/link-to}}</li>
   {{/bs-dropdown-menu}}
 {{/bs-dropdown}}
 ```

 It has all the functionality of a `Components.Button` with additional dropdown support.

 ### Split button dropdowns

 To have a regular button with a dropdown button as in http://getbootstrap.com/components/#btn-dropdowns-split, use a
 `Components.Button` component and a `Components.DropdownButton`:

 ```hbs
 {{#bs-dropdown}}
   {{#bs-button}}Dropdown{{/bs-button}}
   {{#bs-dropdown-button}}Dropdown <span class="caret"></span>{{/bs-dropdown-button}}
   {{#bs-dropdown-menu}}
     <li>{{#link-to "index"}}Something{{/link-to}}</li>
     <li>{{#link-to "index"}}Something different{{/link-to}}</li>
   {{/bs-dropdown-menu}}
 {{/bs-dropdown}}
 ```

 ### Dropup style

 Set the `direction` property to "up" to switch to a "dropup" style:

 ```hbs
 {{#bs-dropdown direction="up"}}
   ...
 {{/bs-dropdown}}
 ```

 @class Dropdown
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Ember.Component.extend(ComponentParent, {
  classNameBindings: ['open', 'containerClass'],

  /**
   * This property reflects the state of the dropdown, whether it is open or closed.
   *
   * @property open
   * @default false
   * @type boolean
   * @public
   */
  open: false,

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
   * A computed property to generate the suiting class for the dropdown container, either "dropdown", "dropup" or "btn-group".
   *
   * @property containerClass
   * @type string
   * @readonly
   * @private
   */
  containerClass: computed('toggleType', 'direction', function() {
    if (this.get('toggleType') === 'button') {
      return this.get('direction') === 'up' ? 'btn-group dropup' : 'btn-group';
    } else {
      return this.get('direction') === 'up' ? 'dropup' : 'dropdown';
    }
  }),

  /**
   * This property is "button" if the toggle element is an instance of [Components.DropdownButton](Components.DropdownButton.html), otherwise "toggle".
   *
   * @property toggleType
   * @type string
   * @readonly
   * @protected
   */
  toggleType: computed('children.[]', function() {
    if (this.get('children').any(function(view) {
        return view instanceof toggleButton;
      })) {
      return 'button';
    }
    return 'toggle';
  }),

  actions: {
    toggleDropdown() {
      this.toggleProperty('open');
    },

    openDropdown() {
      this.set('open', true);
    },

    closeDropdown() {
      this.set('open', false);
    }
  },

  handleClickEvents: observer('open', function() {
    if (this.get('open')) {
      Ember.$(document).on(this.clickEventName, Ember.run.bind(this, this.closeOnClickHandler));
    } else {
      Ember.$(document).off(this.clickEventName);
    }
  }),

  willDestroyElement() {
    this._super();
    Ember.$(document).off(this.clickEventName);
  },

  init() {
    this._super();
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
    let $target = Ember.$(e.target);
    if (!this.get('isDestroyed') &&
      $target.closest(this.$().find('.dropdown-toggle')).length === 0 &&
      ($target.closest(this.$().find('.dropdown-menu')).length === 0 || this.get('closeOnMenuClick'))) {
      this.set('open', false);
    }
  }
});
