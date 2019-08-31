import classic from 'ember-classic-decorator';
import { classNames, layout as templateLayout } from '@ember-decorators/component';
import layout from 'ember-bootstrap/templates/components/bs-navbar/content';
import BsCollapseComponent from 'ember-bootstrap/components/bs-collapse';

/**
 * Component to wrap the collapsible content of a [Components.Navbar](Components.Navbar.html) component.
 * Have a look there for examples.
 *
 * @class NavbarContent
 * @namespace Components
 * @extends Components.Collapse
 * @public
 */
@classic
@templateLayout(layout)
@classNames('navbar-collapse')
export default class Content extends BsCollapseComponent {}
