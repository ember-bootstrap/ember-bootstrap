import LinkComponent from '@ember/routing/link-component';
import { classNames } from '@ember-decorators/component';
import { macroCondition, getOwnConfig } from '@embroider/macros';

/**

 Extended `{{link-to}}` component for use within Dropdowns.

 @class DropdownMenuLinkTo
 @namespace Components
 @extends Ember.LinkComponent
 @public
 */
@classNames(macroCondition(getOwnConfig().isBS4) ? 'dropdown-item' : '')
export default class DropdownMenuLinkTo extends LinkComponent {}
