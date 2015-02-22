import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'ul',
    classNameBindings: ['list-group'],

    selected: null,

    selectable: false,

    applyDefaultStyle: true,

    'list-group': Ember.computed.alias('applyDefaultStyle'),

    actions: {
        selected: function(currentValue, previousValue) {
            this.sendAction('action', currentValue, previousValue);
        }
    }

});
