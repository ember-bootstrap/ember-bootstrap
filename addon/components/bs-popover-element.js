import Ember from 'ember';
import layout from '../templates/components/bs-popover-element';

const {
  computed
} = Ember;

/**
 Internal component for popover's markup. Should not be used directly.

 @class PopoverElement
 @namespace Components
 @extends Ember.Component
 @private
 */
export default Ember.Component.extend({
  layout,

  classNames: ['popover'],
  classNameBindings: ['placement', 'in', 'fade'],
  ariaRole: 'tooltip',

  placement: 'top',

  fade: true,

  in: false,

  title: undefined,

  hasTitle: computed.notEmpty('title')
});
