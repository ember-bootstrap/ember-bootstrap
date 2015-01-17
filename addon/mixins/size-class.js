import Ember from 'ember';

/**
 * @class Bootstrap.SizeClass
 */
export default Ember.Mixin.create({
    classTypePrefix: Ember.required(String),
    classNameBindings: ['sizeClass'],
    sizeClass: (function() {
        var prefix = this.get('classTypePrefix'),
            size = this.get('size');
        return Ember.isBlank(size) ? null : prefix + '-' + size;
    }).property('size'),


    /**
     * Property for size styling, set to 'lg', 'sm' or 'xs'
     *
     * Also see the [Bootstrap docs](http://getbootstrap.com/css/#buttons-sizes)
     *
     * @property size
     * @type String
     */
    size: null
});
