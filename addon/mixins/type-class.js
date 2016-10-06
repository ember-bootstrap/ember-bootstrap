import Ember from 'ember';

/**
 * Mixin to set the appropriate class for components with differently styled types ("success", "danger" etc.)
 *
 * @class TypeClass
 * @namespace Mixins
 * @private
 */
export default Ember.Mixin.create({
  /**
   * Prefix for the type class, e.g. "btn" for button type classes ("btn-primary2 etc.)
   *
   * @property classTypePrefix
   * @type string
   * @required
   * @protected
   */
  classTypePrefix: null,

  classNameBindings: ['typeClass'],

  typeClass: Ember.computed('type', function() {
    let prefix = this.get('classTypePrefix');
    let type = this.get('type') || 'default';
    return `${prefix}-${type}`;
  }),

  /**
   * Property for type styling
   *
   * For the available types see the [Bootstrap docs](http://getbootstrap.com/css/#buttons-options) (use without "btn-" prefix)
   *
   * @property type
   * @type String
   * @default 'default'
   * @public
   */
  type: 'default'
});
