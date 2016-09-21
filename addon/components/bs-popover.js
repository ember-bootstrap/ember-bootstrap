import Ember from 'ember';
import ContextualHelp from './bs-contextual-help';
import layout from '../templates/components/bs-popover';

const {
  computed
} = Ember;

export default ContextualHelp.extend({
  layout,

  placement: 'right',

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
