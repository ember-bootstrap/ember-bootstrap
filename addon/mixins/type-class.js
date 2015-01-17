import Ember from 'ember';

/**
 * @class Bootstrap.TypeClass
 */
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
     * For the available types see the [Bootstrap docs](http://getbootstrap.com/css/#buttons-options) (use without "btn-" prefix)
     *
     * @property type
     * @type String
     * @default 'default'
     */
    type: 'default'
});
