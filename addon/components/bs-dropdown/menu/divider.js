import Component from '@ember/component';
import { layout as templateLayout, tagName } from '@ember-decorators/component';
import layout from 'ember-bootstrap/templates/components/bs-dropdown/menu/divider';

/**
 Component for a dropdown menu divider.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownMenuDivider
 @namespace Components
 @extends Ember.Component
 @public
 */
@templateLayout(layout)
@tagName('')
export default class DropdownMenuDivider extends Component {}
