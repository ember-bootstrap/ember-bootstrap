import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-tooltip/element';
import { computed } from '@ember/object';

/**
 Internal (abstract) component for contextual help markup. Should not be used directly.

 @class ContextualHelpElement
 @namespace Components
 @extends Ember.Component
 @private
 */
export default Component.extend({
  layout,
  tagName: '',

  // ariaRole: 'tooltip', // @todo

  /**
   * @property placement
   * @type string
   * @default 'top'
   * @public
   */
  placement: 'top',

  /**
   * @property fade
   * @type boolean
   * @default true
   * @public
   */
  fade: true,

  /**
   * @property showHelp
   * @type boolean
   * @default false
   * @public
   */
  showHelp: false,

  /**
   * If true component will render in place, rather than be wormholed.
   *
   * @property renderInPlace
   * @type boolean
   * @default true
   * @public
   */
  renderInPlace: true,

  /**
   * Which element to align to
   *
   * @property target
   * @type {string|HTMLElement}
   * @public
   */
  target: null,

  /**
   * @property popperClassNames
   * @type {array}
   * @private
   */
  popperClassNames: [],

  /**
   * @property popperClass
   * @type {string}
   * @private
   */
  popperClass: computed('popperClassNames.[]', 'class', function() {
    let classes = this.get('popperClassNames');
    let classProperty = this.get('class');
    if (typeof classProperty === 'string') {
      classes = classes.concat(classProperty.split(' '));
    }
    return classes.join(' ');
  }),

  popperModifiers: {
    arrow: {
      element: '.arrow'
    }
  }
});
