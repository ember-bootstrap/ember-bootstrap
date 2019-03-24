import LinkComponent from '@ember/routing/link-component';
import ComponentChild from 'ember-bootstrap/mixins/component-child';
import { deprecate } from '@ember/application/deprecations';

/**

 Extended `{{link-to}}` component for use within Navs.

 @class NavLinkTo
 @namespace Components
 @extends Ember.LinkComponent
 @uses Mixins.ComponentChild
 @public
 */
export default LinkComponent.extend(ComponentChild, {
  init() {
    this._super(...arguments);
    deprecate('The link-to component yielded by bs-nav is deprecated. Use the linkTo property of the yielded item component instead!\n' +
      'Before: {{#nav.item}}{{#nav.link-to "index"}}foo{{/nav.link-to}}{{/nav.item}}\n' +
      'After: {{#nav.item linkTo="index"}}foo{{/nav.item}}',
      false,
      {
        id: 'ember-bootstrap.nav.link-to',
        until: '3.0'
      });
  }
});
