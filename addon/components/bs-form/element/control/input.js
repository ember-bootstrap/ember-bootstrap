import { tagName } from '@ember-decorators/component';
import { computed, action } from '@ember/object';
import Control from '../control';
import { isEmpty } from '@ember/utils';
import sizeClass from 'ember-bootstrap/utils/cp/size-class';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

const allowedTypes = new Map();
function canUseType(type) {
  if (typeof document !== 'object' || typeof document.createElement !== 'function') {
    // consider all types as supported if running in an
    // environment that doesn't support DOM
    return true;
  }

  if (!allowedTypes.has(type)) {
    try {
      let inputElement = document.createElement('input');
      inputElement.type = type;
      allowedTypes.set(type, true);
    } catch (error) {
      allowedTypes.set(type, false);
    }
  }

  return allowedTypes.get(type);
}

/**

 @class FormElementControlInput
 @namespace Components
 @extends Components.FormElementControl
 @private
 */
@tagName('')
@deprecateSubclassing
export default class FormElementControlInput extends Control {
  /**
   * @property type
   * @type {String}
   * @public
   */
  @computed
  get type() {
    return 'text';
  }
  set type(value) {
    // fallback to 'text' if value is empty
    if (isEmpty(value)) {
      return 'text';
    }

    // IE 11 throws if setting an unsupported type via DOM.
    // We guard against that behaviour by testing if user
    // agent throws on setting the provided type.
    // This is inspired by input helper shipped with Ember.js:
    // https://github.com/emberjs/ember.js/blob/30137796af42c63b28ead127cba0e43e45a773c1/packages/%40ember/-internals/glimmer/lib/components/text_field.ts#L93-L115
    if (!canUseType(value)) {
      return 'text';
    }

    return value;
  }

  @action
  handleChange(event) {
    this.onChange(event.target.value);
  }

  @action
  handleInput(event) {
    this.onChange(event.target.value);
  }

  /**
   * [BS4 only] Property for size styling, set to 'lg', 'sm' or 'xs'
   *
   * Also see the [Bootstrap docs](https://getbootstrap.com/docs/4.3/components/forms/#sizing)
   *
   * @property size
   * @type String
   * @public
   */
  @defaultValue
  size = null;

  @sizeClass('form-control', 'size')
  sizeClass;
}
