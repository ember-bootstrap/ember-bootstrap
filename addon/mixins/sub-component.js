import Ember from 'ember';

/**
 * @class SubComponent
 * @namespace Mixins
 * @public
 */
export default Ember.Mixin.create({
  targetObject: Ember.computed.alias('parentView')
});