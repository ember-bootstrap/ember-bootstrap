import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';


export default Ember.Component.extend(TypeClass, {
    classNameBindings: ['alert','fade','in'],

    dismissible: true,
    dismissed: false,
    visible: true,
    fade: true,
    alert: Ember.computed.not('dismissed'),
    in: Ember.computed.and('visible','fade'),

    /**
     * @property classTypePrefix
     * @type String
     * @default 'alert'
     * @protected
     */
    classTypePrefix: 'alert',

    fadeDuration: 150,

    actions: {
        dismiss: function() {
            if (this.get('fade')) {
                this.set('visible', false);
                Ember.run.later(this,function() {
                    if (!this.get('isDestroyed')) {
                        this.set('dismissed', true);
                    }
                },this.get('fadeDuration'));
            }
            else {
                this.setProperties({
                    dismissed: true,
                    visible: false
                });
            }
        }
    }


});
