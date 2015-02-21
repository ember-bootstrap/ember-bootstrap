import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';


export default Ember.Component.extend(TypeClass, {
    tagName: 'li',
    classNames: ['list-group-item'],
    classNameBindings: ['active','disabled'],

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
    click: function() {
        if (this.get('selectable') && !this.get('disabled')) {
            this.set('selected', this.get('value'));
        }
    }


});
