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

    /**
     * If button is active and this is set, the icon property will match this property
     *
     * @property iconActive
     */
    iconActive: null,

    /**
     * If button is inactive and this is set, the icon property will match this property
     *
     * @property iconInctive
     */
    iconInactive: null,

    /**
     * Class(es) (e.g. glyphicons or font awesome) to use as a button icon
     * This will render a <i class="{{icon}}"></i> element in front of the button's label
     *
     * @property icon
     */
    icon: (function() {
        if (this.get('active')) {
            return this.get('iconActive');
        } else {
            return this.get('iconInactive');
        }
    }).property('active'),


    /**
     * Supply a value that will be associated with this button. This will be send
     * as a parameter of the default action triggered when clicking the button
     *
     * @property value
     */
    value: null,

    click: function(evt) {
        if (this.get('toggle')) {
            this.toggleProperty('active');
        }
        this.sendAction('action', this.get('value'), evt);
    }


});
