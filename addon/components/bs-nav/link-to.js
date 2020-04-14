import LinkComponent from '@ember/routing/link-component';
import ComponentChild from 'ember-bootstrap/mixins/component-child';
import { classNames } from '@ember-decorators/component';
import { macroCondition, getOwnConfig } from '@embroider/macros';

/**

 Extended `{{link-to}}` component for use within Navs.

 @class NavLinkTo
 @namespace Components
 @extends Ember.LinkComponent
 @uses Mixins.ComponentChild
 @public
 */
@classNames(macroCondition(getOwnConfig().isBS4) ? 'nav-link' : '')
export default class NavLinkTo extends LinkComponent.extend(ComponentChild) {}
