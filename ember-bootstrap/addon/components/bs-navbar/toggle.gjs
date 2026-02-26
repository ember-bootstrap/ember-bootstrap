import Component from '@glimmer/component';
import { on } from '@ember/modifier';

/**
 * Component to implement the responsive menu toggle behavior in a [Components.Navbar](Components.Navbar.html)
 * component. Have a look there for examples.
 *
 * ### Bootstrap 3/4 Notes
 *
 * The inline version of the component uses the triple `icon-bar` styling for Bootstrap 3 and the
 * `navbar-toggler-icon` styling for Bootstrap 4.
 *
 * @class NavbarToggle
 * @namespace Components
 * @extends Ember.Component
 * @public
 */
import bsDefault from 'ember-bootstrap/helpers/bs-default';
export default class NavbarToggle extends Component {
  on = on;
  <template>
    {{! @glint-nocheck }}
    <button
      type='button'
      class='navbar-toggler {{if (bsDefault @collapsed true) "collapsed"}}'
      ...attributes
      {{(if @onClick (modifier this.on 'click' @onClick))}}
    >
      {{#if (has-block)}}
        {{yield}}
      {{else}}
        <span class='navbar-toggler-icon'></span>
      {{/if}}
    </button>
  </template>
}
