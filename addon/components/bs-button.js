import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';
import SizeClass from 'ember-bootstrap/mixins/size-class';

export default Ember.Component.extend(TypeClass, SizeClass, {
    tagName: 'button',
    classNames: ['btn'],
    classNameBindings: ['active', 'block:btn-block'],
    classTypePrefix: 'btn',
    attributeBindings: ['id', 'disabled', 'buttonType:type'],

    /**
     * Label of the button. Not need if used as a block component
     */
    label: null,

    /**
     * Property to disable the button
     *
     * @property disabled
     */
    disabled: false,

    /**
     * Set the type of the button, either 'button' or 'submit'
     *
     * @property buttonType
     */
    buttonType: 'button',

    /**
     * Set the 'active' class to apply active/pressed CSS styling
     *
     * @property active
     */
    active: false,

    /**
     * Property for block level buttons
     *
     * @see http://getbootstrap.com/css/#buttons-sizes
     * @property block
     */
    block: false,

    /**
     * If toggle property is true, clicking the button will toggle the active state
     *
     * @property toggle
     */
    toggle: false,


    click: function() {
        if (this.get('toggle')) {
            this.toggleProperty('active');
        }
    }


});
