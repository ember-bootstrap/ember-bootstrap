import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from 'ember-bootstrap/templates/components/bs-popover/element';

/**
 Internal component for popover's markup. Should not be used directly.

 @class PopoverElement
 @namespace Components
 @extends Ember.Component
 @private
 */
export default Component.extend({
  layout,

  classNames: ['popover'],
  classNameBindings: ['fade'],
  ariaRole: 'tooltip',

  /**
   * @property placement
   * @type string
   * @default 'top'
   * @public
   */
  placement: 'top',

  /**
   * @property fade
   * @type boolean
   * @default true
   * @public
   */
  fade: true,

  /**
   * @property showHelp
   * @type boolean
   * @default false
   * @public
   */
  showHelp: false,

  /**
   * @property title
   * @type string
   * @public
   */
  title: undefined,

  /**
   * @property hasTitle
   * @type boolean
   * @private
   */
  hasTitle: computed.notEmpty('title')
});
