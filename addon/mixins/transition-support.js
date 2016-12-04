import Ember from 'ember';

const { computed } = Ember;

/**
 * Mixin for components that support transitions
 *
 * @class TransitionSupport
 * @namespace Mixins
 * @private
 */
export default Ember.Mixin.create({

  /**
   * @property transitionsEnabled
   * @type boolean
   * @private
   */
  transitionsEnabled: computed.reads('fade'),

  /**
   * Access to the fastboot service if available
   *
   * @property fastboot
   * @type {Ember.Service}
   * @private
   */
  fastboot: Ember.computed(function() {
    let owner = Ember.getOwner(this);
    return owner.lookup('service:fastboot');
  }),

  /**
   * Use CSS transitions?
   *
   * @property usesTransition
   * @type boolean
   * @readonly
   * @private
   */
  usesTransition: computed('fade', 'fastboot.isFastBoot', function() {
    return !this.get('fastboot.isFastBoot') && Ember.$.support.transition && this.get('transitionsEnabled');
  })
});
