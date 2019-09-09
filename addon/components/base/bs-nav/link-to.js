import LinkComponent from '@ember/routing/link-component';
import ComponentChild from 'ember-bootstrap/mixins/component-child';

/**

 Extended `{{link-to}}` component for use within Navs.

 @class NavLinkTo
 @namespace Components
 @extends Ember.LinkComponent
 @uses Mixins.ComponentChild
 @public
 */
export default class NavLinkTo extends LinkComponent.extend(ComponentChild) {}
