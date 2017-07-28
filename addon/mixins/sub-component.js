import { alias } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';

/**
 * @class SubComponent
 * @namespace Mixins
 * @deprecated
 * @private
 */
export default Mixin.create({
  targetObject: alias('parentView')
});