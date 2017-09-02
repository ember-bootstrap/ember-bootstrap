import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-tooltip/element';
import { computed } from '@ember/object';

/**
 Internal component for tooltip's markup. Should not be used directly.

 @class TooltipElement
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

  renderInPlace: true,

  target: null,

  popperClassNames: [],

  popperClass: computed('popperClassNames.[]', 'class', function() {
    let classes = this.get('popperClassNames');
    let classProperty = this.get('class');
    if (typeof classProperty === 'string') {
      classes = classes.concat(classProperty.split(' '));
    }
    return classes.join(' ');
  })
});
