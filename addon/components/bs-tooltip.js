import Ember from 'ember';
import ContextualHelp from './bs-contextual-help';
import layout from '../templates/components/bs-tooltip';

const {
  computed
} = Ember;

/**

 @class Tooltip
 @namespace Components
 @extends Components.ContextualHelp
 @public
 */
export default ContextualHelp.extend({
  layout,

  /**
   * The jQuery object of the arrow element.
   *
   * @property arrowElement
   * @type object
   * @readonly
   * @private
   */
  arrowElement: computed('overlayElement', function() {
    return this.get('overlayElement').find('.tooltip-arrow');
  })
});
