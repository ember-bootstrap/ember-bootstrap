import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';
import SizeClass from 'ember-bootstrap/mixins/size-class';

export default Ember.Component.extend(TypeClass, SizeClass, {
    tagName: 'button',
    classNames: ['btn'],
    classTypePrefix: 'btn',
    attributeBindings: ['id', 'disabled', 'buttonType:type'],
    buttonType: 'button'
});
