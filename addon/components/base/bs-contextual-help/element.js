import { layout as templateLayout, tagName } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-tooltip/element';
import { assert } from '@ember/debug';
import { scheduleOnce } from '@ember/runloop';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

/**
 Internal (abstract) component for contextual help markup. Should not be used directly.

 @class ContextualHelpElement
 @namespace Components
 @extends Ember.Component
 @private
 */
@templateLayout(layout)
@tagName('')
export default class ContextualHelpElement extends Component {
  ariaRole = 'tooltip';

  /**
   * @property placement
   * @type string
   * @default 'top'
   * @public
   */
  @defaultValue
  placement = 'top';

  @reads('placement')
  actualPlacement;

  /**
   * @property fade
   * @type boolean
   * @default true
   * @public
   */
  @defaultValue
  fade = true;

  /**
   * @property showHelp
   * @type boolean
   * @default false
   * @public
   */
  @defaultValue
  showHelp = false;

  /**
   * If true component will render in place, rather than be wormholed.
   *
   * @property renderInPlace
   * @type boolean
   * @default true
   * @public
   */
  @defaultValue
  renderInPlace = true;

  /**
   * Which element to align to
   *
   * @property popperTarget
   * @type {string|HTMLElement}
   * @public
   */
  @defaultValue
  popperTarget = null;

  /**
   * @property autoPlacement
   * @type boolean
   * @default true
   * @public
   */
  @defaultValue
  autoPlacement = true;

  /**
   * The DOM element of the viewport element.
   *
   * @property viewportElement
   * @type object
   * @public
   */
  @defaultValue
  viewportElement = null;

  /**
   * Take a padding into account for keeping the tooltip/popover within the bounds of the element given by `viewportElement`.
   *
   * @property viewportPadding
   * @type number
   * @default 0
   * @public
   */
  @defaultValue
  viewportPadding = 0;

  /**
   * @property arrowClass
   * @private
   */
  @defaultValue
  arrowClass = 'arrow';

  /**
   * @property popperClassNames
   * @type {array}
   * @private
   */

  /**
   * @property popperClass
   * @type {string}
   * @private
   */
  @computed('popperClassNames.[]', 'class')
  get popperClass() {
    let classes = this.get('popperClassNames');
    let classProperty = this.get('class');
    if (typeof classProperty === 'string') {
      classes = classes.concat(classProperty.split(' '));
    }
    return classes.join(' ');
  }

  /**
   * popper.js modifier config
   *
   * @property popperModifiers
   * @type {object}
   * @private
   */
  @computed('arrowClass', 'autoPlacement', 'viewportElement', 'viewportPadding')
  get popperModifiers() {
    let self = this;
    return {
      arrow: {
        element: `.${this.get('arrowClass')}`
      },
      offset: {
        fn(data) {
          let tip = document.getElementById(self.get('id'));
          assert('Contextual help element needs existing popper element', tip);

          // manually read margins because getBoundingClientRect includes difference
          let marginTop = parseInt(window.getComputedStyle(tip).marginTop, 10);
          let marginLeft = parseInt(window.getComputedStyle(tip).marginLeft, 10);

          // we must check for NaN for ie 8/9
          if (isNaN(marginTop) || marginTop > 0) {
            marginTop = 0;
          }
          if (isNaN(marginLeft) || marginLeft > 0) {
            marginLeft = 0;
          }

          data.offsets.popper.top += marginTop;
          data.offsets.popper.left += marginLeft;

          return window.Popper.Defaults.modifiers.offset.fn.apply(this, arguments);
        }
      },
      preventOverflow: {
        enabled: this.get('autoPlacement'),
        boundariesElement: this.get('viewportElement'),
        padding: this.get('viewportPadding')
      },
      hide: {
        enabled: this.get('autoPlacement')
      },
      flip: {
        enabled: this.get('autoPlacement')
      }
    };
  }

  didReceiveAttrs() {
    assert('Contextual help element needs id for popper element', this.get('id'));
  }

  @action
  updatePlacement(popperDataObject) {
    if (this.get('actualPlacement') === popperDataObject.placement) {
      return;
    }
    this.set('actualPlacement', popperDataObject.placement);
    scheduleOnce('afterRender', popperDataObject.instance, popperDataObject.instance.scheduleUpdate);
  }
}
