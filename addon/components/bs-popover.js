import Ember from 'ember';
import ContextualHelp from './bs-contextual-help';
import layout from '../templates/components/bs-popover';

const {
  computed
} = Ember;

/**

 @class Popover
 @namespace Components
 @extends Components.ContextualHelp
 @public
 */
export default ContextualHelp.extend({
  layout,

  /**
   * @property placement
   * @type string
   * @default 'right'
   * @public
   */
  placement: 'right',

  /**
   * @property triggerEvents
   * @type array|string
   * @default 'click'
   * @public
   */
  triggerEvents: 'click',

  /**
   * The jQuery object of the arrow element.
   *
   * @property arrowElement
   * @type object
   * @readonly
   * @private
   */
  arrowElement: computed('overlayElement', function() {
    return this.get('overlayElement').find('.arrow');
  })
});
