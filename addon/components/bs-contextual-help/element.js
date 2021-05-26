import { action } from '@ember/object';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { scheduleOnce } from '@ember/runloop';
import arg from 'ember-bootstrap/utils/decorators/arg';
import { tracked } from '@glimmer/tracking';
import { getOwnConfig, macroCondition } from '@embroider/macros';
import { trackedRef } from 'ember-ref-bucket';

/**
 Internal (abstract) component for contextual help markup. Should not be used directly.

 @class ContextualHelpElement
 @namespace Components
 @extends Glimmer.Component
 @private
 */
export default class ContextualHelpElement extends Component {
  /**
   * @property placement
   * @type string
   * @default 'top'
   * @public
   */
  @arg
  placement = 'top';

  @tracked
  actualPlacement = this.args.placement;

  /**
   * @property fade
   * @type boolean
   * @default true
   * @public
   */
  @arg
  fade = true;

  /**
   * @property showHelp
   * @type boolean
   * @default false
   * @public
   */
  @arg
  showHelp = false;

  /**
   * If true component will render in place, rather than be wormholed.
   *
   * @property renderInPlace
   * @type boolean
   * @default true
   * @public
   */

  /**
   * Which element to align to
   *
   * @property popperTarget
   * @type {string|HTMLElement}
   * @public
   */

  /**
   * @property autoPlacement
   * @type boolean
   * @default true
   * @public
   */

  /**
   * The DOM element of the viewport element.
   *
   * @property viewportElement
   * @type object
   * @public
   */

  /**
   * Take a padding into account for keeping the tooltip/popover within the bounds of the element given by `viewportElement`.
   *
   * @property viewportPadding
   * @type number
   * @default 0
   * @public
   */

  /**
   * @property arrowClass
   * @private
   */
  arrowClass = 'arrow';

  placementClassPrefix = '';

  offset = [0, 0];

  @trackedRef('popperElement') popperElement;

  /**
   * popper.js modifier config
   *
   * @property popperModifiers
   * @type {object}
   * @private
   */
  get popperModifiers() {
    const context = this;

    // We need popeerElement, so we wait for this getter to recompute once it's available
    if (!this.popperElement) return {};

    return {
      arrow: {
        element: this.popperElement.querySelector(`.${this.arrowClass}`),
      },
      offset: {
        offset: this.offset.join(','),
        fn(data) {
          let tip = context.popperElement;
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
        },
      },
      preventOverflow: {
        enabled: this.args.autoPlacement,
        boundariesElement: this.args.viewportElement,
        padding: this.args.viewportPadding,
      },
      hide: {
        enabled: this.args.autoPlacement,
      },
      flip: {
        enabled: this.args.autoPlacement,
      },
    };
  }

  get actualPlacementClass() {
    let ending = this.actualPlacement;

    if (macroCondition(getOwnConfig().isBS5)) {
      if (ending === 'right') {
        ending = 'end';
      }

      if (ending === 'left') {
        ending = 'start';
      }
    }

    return this.placementClassPrefix + ending;
  }

  @action
  updatePlacement(popperDataObject) {
    if (this.actualPlacement === popperDataObject.placement) {
      return;
    }
    this.actualPlacement = popperDataObject.placement;
    scheduleOnce('afterRender', popperDataObject.instance, popperDataObject.instance.scheduleUpdate);
  }
}
