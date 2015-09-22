import Ember from 'ember';

/**
 * @class Bootstrap.SubComponent
 */
export default Ember.Mixin.create({
    targetObject: Ember.computed.alias('parentView')
});