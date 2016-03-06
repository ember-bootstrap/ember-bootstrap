import Ember from 'ember';

/**
 * Mixin to set the appropriate class for components with different sizes.
 *
 *
 * @class SizeClass
 * @namespace Mixins
 * @public
 */
export default Ember.Mixin.create({
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

  sizeClass: Ember.computed('size', function() {
    let prefix = this.get('classTypePrefix');
    let size = this.get('size');
    return Ember.isBlank(size) ? null : `${prefix}-${size}`;
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
