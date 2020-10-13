import LinkComponent from 'ember-bootstrap/components/bs-link-to';
import ComponentChild from 'ember-bootstrap/mixins/component-child';

/**

 Extended `{{link-to}}` component for use within Navs.

 @class NavLinkTo
 @namespace Components
 @extends Ember.Component
 @uses Mixins.ComponentChild
 @public
 */
export default class NavLinkTo extends LinkComponent.extend(ComponentChild) {}
