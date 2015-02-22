import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';
import SubComponent from 'ember-bootstrap/mixins/sub-component';


export default Ember.Component.extend(TypeClass, SubComponent, {
    tagName: 'li',
    classNameBindings: ['active','disabled','list-group-item'],

    'list-group-item': Ember.computed.alias('applyDefaultStyle'),


    /**
     * @property classTypePrefix
     * @type String
     * @default 'list-group-item'
     * @protected
     */
    classTypePrefix: 'list-group-item',

    active: Ember.computed('selected','value', function(){
        return this.get('selected') === this.get('value');
    }),

    disabled: false,

    value: null,

    selected: Ember.computed.alias('parentView.selected'),
    selectable: Ember.computed.alias('parentView.selectable'),
    applyDefaultStyle: Ember.computed.alias('parentView.applyDefaultStyle'),

    action: 'selected',

    click: function() {
        var value,
            previous;
        if (this.get('selectable') && !this.get('disabled')) {
            value = this.get('value');
            previous = this.get('selected');
            this.set('selected', value);
            this.sendAction('action', value, previous);
        }
    }


});
