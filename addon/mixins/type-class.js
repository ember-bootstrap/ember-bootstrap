import Ember from 'ember';

export default Ember.Mixin.create({
    classTypePrefix: Ember.required(String),
    classNameBindings: ['typeClass'],
    type: 'default',
    typeClass: (function() {
        var prefix = this.get('classTypePrefix'),
            type = this.get('type') || 'default';
        return prefix + '-' + type;
    }).property('type')
});
