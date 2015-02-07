import Ember from 'ember';
import FormElement from 'ember-bootstrap/components/bs-form-element';


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

    hasValidator: Ember.computed.notEmpty('model.validate'),

    childFormElements: Ember.computed.filter('childViews', function(view) {
        return view instanceof FormElement;
    }),

    submit: function(e) {
        var that = this;
        if (e) {
            e.preventDefault();
        }
        if (!this.get('hasValidator')) {
            return this.sendAction();
        } else {
            return this
                .get('model')
                .validate()
                .then(function() {
                    if (that.get('model.isValid')) {
                        return that.sendAction();
                    }
                })
                .catch(function(){
                    that.get('childFormElements').setEach('showValidation', true);
                    return that.sendAction('invalid');
                });
        }
    }
});