import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-tooltip/element';

/**
 Internal component for tooltip's markup. Should not be used directly.

 @class TooltipElement
 @namespace Components
 @extends Ember.Component
 @private
 */
export default Ember.Component.extend({
  layout,

  classNames: ['tooltip'],
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
  showHelp: false
});
