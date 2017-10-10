import { reads } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import transitionSupport from 'ember-bootstrap/utils/transition-support';

/**
 * Mixin for components that support transitions
 *
 * @class TransitionSupport
 * @namespace Mixins
 * @private
 */
export default Mixin.create({

  /**
   * @property transitionsEnabled
   * @type boolean
   * @private
   */
  transitionsEnabled: reads('fade'),

  /**
   * Access to the fastboot service if available
   *
   * @property fastboot
   * @type {Ember.Service}
   * @private
   */
  fastboot: computed(function() {
    let owner = getOwner(this);
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
    return !this.get('fastboot.isFastBoot') && !!transitionSupport && this.get('transitionsEnabled');
  })
});
