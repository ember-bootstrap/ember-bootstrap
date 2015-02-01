import Ember from 'ember';
import SizeClass from 'ember-bootstrap/mixins/size-class';


/**
 @class Button-Group
 @namespace Bootstrap
 @extends Ember.Component
 @uses Bootstrap.SizeClass
 */
export default Ember.Component.extend(SizeClass, {

    /**
     * @type string
     * @property ariaRole
     * @default 'group'
     * @protected
     */
    ariaRole: 'group',

    /**
     * @property classNames
     * @type array
     * @default ['btn-group']
     * @protected
     */
    classNames: ['btn-group'],

    /**
     * @property classNameBindings
     * @type array
     * @protected
     */
    classNameBindings: ['vertical:btn-group-vertical','justified:btn-group-justified'],

    /**
     * @property classTypePrefix
     * @type String
     * @default 'btn-group'
     * @protected
     */
    classTypePrefix: 'btn-group',

    /**
     * Set to true for a vertically stacked button group, see http://getbootstrap.com/components/#btn-groups-vertical
     *
     * @property vertical
     * @type boolean
     * @default false
     * @public
     */
    vertical: false,

    /**
     * Set to true for the buttons to stretch at equal sizes to span the entire width of its parent.
     *
     * *Important*: You have to wrap every button component in a `div class="btn-group">`:
     *
     * ```handlebars
     * <div class="btn-group" role="group">
     * \{{#bs-button}}My Button{{/bs-button}}
     * </div>
     * ```
     *
     * See http://getbootstrap.com/components/#btn-groups-justified
     *
     * @property justified
     * @type boolean
     * @default false
     * @public
     */
    justified: false

});
