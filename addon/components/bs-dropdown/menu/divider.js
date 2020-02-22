import Component from '@ember/component';
import { layout as templateLayout } from '@ember-decorators/component';
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
export default class DropdownMenuDivider extends Component {}
