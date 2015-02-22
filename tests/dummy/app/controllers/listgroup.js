import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        selected: function(currentValue, previousValue) {
            console.log('New value: ' + currentValue + '! Previous value was: ' + previousValue);
        }
    }
});