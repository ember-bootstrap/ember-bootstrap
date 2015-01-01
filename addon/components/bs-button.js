import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';

export default Ember.Component.extend(TypeClass, {
    tagName: 'button',
    classNames: ['btn'],
    classTypePrefix: 'btn',
    attributeBindings: ['id', 'disabled', 'buttonType:type'],
    buttonType: 'button'
});
