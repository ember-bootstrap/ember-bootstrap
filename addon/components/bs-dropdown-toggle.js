import Ember from 'ember';
import DropdownToggle from 'ember-bootstrap/mixins/dropdown-toggle';


export default Ember.Component.extend(DropdownToggle, {
    tagName: 'a',
    attributeBindings: ['href'],
    href: Ember.computed('tagName', function(){
        if (this.get('tagName').toUpperCase() === 'A') {
            return '#';
        }
    }),

    click: function (e) {
        e.preventDefault();
        this.sendAction();
    }


});
