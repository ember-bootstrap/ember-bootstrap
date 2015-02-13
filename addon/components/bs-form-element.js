import Ember from 'ember';
import FormGroup from 'ember-bootstrap/components/bs-form-group';
import Form from 'ember-bootstrap/components/bs-form';

export default FormGroup.extend({
    /**
     * Text to display within a `<label>` tag.
     *
     * @property label
     * @type string
     * @public
     */
    label: null,

    /**
     * The type of the control widget.
     * Supported types:
     *
     * * 'text'
     * * 'checkbox'
     *
     * @property controlType
     * @type string
     * @public
     */
    controlType: 'text',

    value: null,
    property: null,

    placeholder: null,

    model: Ember.computed.alias('form.model'),

    errors: null,
    hasErrors: Ember.computed.gt('errors.length',0),
    hasValidator: Ember.computed.notEmpty('model.validate'),
    showValidation: false,
    showErrors: Ember.computed.and('showValidation','hasErrors'),
    validation: Ember.computed('hasErrors','hasValidator','showValidation',function(){
        if (!this.get('showValidation') || !this.get('hasValidator')) {
            return null;
        }
        return this.get('hasErrors') ? 'error' : 'success';
    }),

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

    layoutName: Ember.computed('formLayout','controlType',function() {
        var formLayout = this.getWithDefault('formLayout','vertical'),
            inputLayout,
            controlType = this.get('controlType');

        switch (controlType) {
            case 'checkbox':
                inputLayout = controlType;
                break;
            default:
                inputLayout = 'default';
        }

        return 'components/form-element/' + formLayout + '/' + inputLayout;
    }),

    _rerender: Ember.observer('layoutName', function() {
        this.rerender();
    }),

    focusOut: function() {
        this.set('showValidation', true);
    },

    init: function() {
        this._super();
        if (!Ember.isBlank(this.get('property'))) {
            Ember.Binding.from("model." + this.get('property')).to('value').connect(this);
            Ember.Binding.from("model.errors." + this.get('property')).to('errors').connect(this);
        }
    }
});