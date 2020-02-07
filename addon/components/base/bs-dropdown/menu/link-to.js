import LinkComponent from '@ember/routing/link-component';
import { classNames } from '@ember-decorators/component';
import { hasBootstrapVersion } from 'ember-bootstrap/compatibility-helpers';

/**

 Extended `{{link-to}}` component for use within Dropdowns.

 @class DropdownMenuLinkTo
 @namespace Components
 @extends Ember.LinkComponent
 @public
 */
@classNames(hasBootstrapVersion(4) ? 'dropdown-item' : '')
export default class DropdownMenuLinkTo extends LinkComponent {}
