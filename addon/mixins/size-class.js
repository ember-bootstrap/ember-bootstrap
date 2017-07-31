import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';

/**
 * Mixin to set the appropriate class for components with different sizes.
 *
 *
 * @class SizeClass
 * @namespace Mixins
 * @private
 */
export default Mixin.create({
  /**
   * Prefix for the size class, e.g. "btn" for button size classes ("btn-lg", "btn-sm" etc.)
   *
   * @property classTypePrefix
   * @type string
   * @required
   * @protected
   */
  classTypePrefix: null,

  classNameBindings: ['sizeClass'],

  sizeClass: computed('size', function() {
    let prefix = this.get('classTypePrefix');
    let size = this.get('size');
    return isBlank(size) ? null : `${prefix}-${size}`;
  }),

  /**
   * Property for size styling, set to 'lg', 'sm' or 'xs'
   *
   * Also see the [Bootstrap docs](http://getbootstrap.com/css/#buttons-sizes)
   *
   * @property size
   * @type String
   * @public
   */
  size: null
});
