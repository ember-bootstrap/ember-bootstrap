import Ember from 'ember';

export default Ember.Mixin.create({
    classTypePrefix: Ember.required(String),
    classNameBindings: ['typeClass'],
    typeClass: (function() {
        var prefix = this.get('classTypePrefix'),
            type = this.get('type') || 'default';
        return prefix + '-' + type;
    }).property('type'),


    /**
     * Property for type styling
     *
     * @see http://getbootstrap.com/css/#buttons-options
     * @property type
     */
    type: 'default'
});
