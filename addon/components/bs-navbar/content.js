import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**
 * Component to wrap the collapsible content of a [Components.Navbar](Components.Navbar.html) component.
 * Have a look there for examples.
 *
 * @class NavbarContent
 * @namespace Components
 * @extends Components.Collapse
 * @public
 */
@tagName('')
@deprecateSubclassing
export default class NavbarContent extends Component {}
