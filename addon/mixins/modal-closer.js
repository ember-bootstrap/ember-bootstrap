import Ember from 'ember';

/**
 * @class ModalCloser
 * @namespace Mixins
 */
export default Ember.Mixin.create({
    targetObject: Ember.computed.alias('parentView.parentView.parentView'),
    action: 'close',
    actions: {
        close: function() {
            this.sendAction();
        }
    }
});
