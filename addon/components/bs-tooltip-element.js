import Ember from 'ember';
import layout from '../templates/components/bs-tooltip-element';
const { computed } = Ember;

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
  classNameBindings: ['placement', 'in'],
  ariaRole: 'tooltip',

  placement: 'top',
  
  fade: true,

  in: false
});
