import Ember from 'ember';

/**
 * @class SubComponent
 * @namespace Mixins
 */
export default Ember.Mixin.create({
    targetObject: Ember.computed.alias('parentView')
});