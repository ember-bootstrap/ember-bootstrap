import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'ul',
    classNames: ['dropdown-menu'],
    classNameBindings: ['alignClass'],
    ariaRole: 'menu',

    align: 'left',

    alignClass: Ember.computed('align', function() {
        if (this.get('align') !== 'left') {
            return 'dropdown-menu-' + this.get('align');
        }
    })


});
