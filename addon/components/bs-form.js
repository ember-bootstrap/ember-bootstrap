import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'form',
    classNameBindings: ['layoutClass'],
    ariaRole: 'form',
    layoutClass: Ember.computed('formLayout', function() {
        var layout = this.get('formLayout');
        return layout === 'vertical' ? 'form' : 'form-' + layout;
    }),
    model: null,
    formLayout: 'vertical',

    submit: function(e) {
        var that = this;
        if (e) {
            e.preventDefault();
        }
        if (Ember.isNone(this.get('model.validate'))) {
            return this.sendAction('action');
        } else {
            promise = this.get('model').validate();
            return this.get('model')
                .validate()
                .then(function() {
                    if (that.get('model.isValid')) {
                        return that.sendAction('action')
                    }
                }
            );
        }
    }
});