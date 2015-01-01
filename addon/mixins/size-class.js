import Ember from 'ember';

export default Ember.Mixin.create({
    classTypePrefix: Ember.required(String),
    classNameBindings: ['sizeClass'],
    size: null,
    sizeClass: (function() {
        var prefix = this.get('classTypePrefix'),
            size = this.get('size');
        return Ember.isBlank(size) ? null : prefix + '-' + size;
    }).property('size')
});
