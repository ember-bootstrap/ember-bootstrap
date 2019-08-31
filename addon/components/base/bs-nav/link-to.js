import classic from 'ember-classic-decorator';
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
@classic
export default class LinkTo extends LinkComponent.extend(ComponentChild) {}
