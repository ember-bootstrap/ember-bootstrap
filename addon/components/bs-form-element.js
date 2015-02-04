import Ember from 'ember';
import FormGroup from 'ember-bootstrap/components/bs-form-group';
import Form from 'ember-bootstrap/components/bs-form';

export default FormGroup.extend({
    label: null,

    inputType: 'text',

    value: null,

    placeholder: null,

    hasLabel: Ember.computed.notEmpty('label'),

    formLayout: Ember.computed.alias('form.formLayout'),
    isVertical: Ember.computed.equal('formLayout','vertical'),
    isHorizontal: Ember.computed.equal('formLayout','horizontal'),
    isInline: Ember.computed.equal('formLayout','inline'),

    horizontalLabelGridClass: 'col-sm-2',

    horizontalInputGridClass: Ember.computed('horizontalLabelGridClass', function() {
        var parts = this.get('horizontalLabelGridClass').split('-'),
            columns;
        Ember.assert('horizontalInputGridClass must match format bootstrap grid column class', parts.length===3);
        parts[2] = 12 - parts[2];
        return parts.join('-');
    }),

    horizontalInputOffsetGridClass: Ember.computed('horizontalLabelGridClass', function() {
        var parts = this.get('horizontalLabelGridClass').split('-');
        parts.splice(2,0,'offset');
        return parts.join('-');
    }),

    form: Ember.computed(function(){
        return this.nearestOfType(Form);
    }),

    layoutName: Ember.computed('formLayout','inputType',function() {
        var formLayout = this.get('formLayout'),
            inputLayout,
            inputType = this.get('inputType');

        switch (inputType) {
            case 'checkbox':
                inputLayout = inputType;
                break;
            default:
                inputLayout = 'default';
        }

        return 'components/form-element/' + formLayout + '/' + inputLayout;
    }),

    _rerender: Ember.observer('layoutName', function() {
        this.rerender();
    })

//    defaultLayout: Ember.computed('formLayout', function() {
//        var formLayout = this.get('formLayout');
//        return this.container.lookup('template:components/form-element/' + formLayout + '/default');
//    })
});