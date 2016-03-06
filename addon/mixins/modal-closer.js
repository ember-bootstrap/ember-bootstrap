import Ember from 'ember';
import ModalComponent from '../components/bs-modal';

/**
 * @class ModalCloser
 * @namespace Mixins
 */
export default Ember.Mixin.create({
    targetObject: Ember.computed(function() {
      return this.nearestOfType(ModalComponent);
    }).volatile(),
    action: 'close',
    actions: {
        close: function() {
            this.sendAction();
        }
    }
});
