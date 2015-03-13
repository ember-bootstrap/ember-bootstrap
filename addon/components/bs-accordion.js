import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['panel-group'],
    ariaRole: 'tablist',
    selected: null,

    actions: {
        selected: function(currentValue, previousValue) {
            this.sendAction('action', currentValue, previousValue);
        }
    }

});
