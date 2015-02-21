import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'ul',
    classNames: ['list-group'],

    selected: null,

    selectable: false

});
