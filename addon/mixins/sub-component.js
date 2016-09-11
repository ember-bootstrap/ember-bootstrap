import Ember from 'ember';

/**
 * @class SubComponent
 * @namespace Mixins
 * @deprecated
 * @private
 */
export default Ember.Mixin.create({
  targetObject: Ember.computed.alias('parentView')
});