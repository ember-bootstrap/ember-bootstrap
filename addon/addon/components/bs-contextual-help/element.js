import { action } from '@ember/object';
import Component from '@glimmer/component';
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
  get popperOptions() {
    let options = {
      placement: this.placement,
      onFirstUpdate: this.updatePlacement,
    };

    // We need popperElement, so we wait for this getter to recompute once it's available
    if (!this.popperElement) {
      return options;
    }

    options.modifiers = [
      {
        name: 'arrow',
        options: {
          element: this.popperElement.querySelector(`.${this.arrowClass}`),
          padding: 4,
        },
      },
      {
        name: 'offset',
        options: {
          offset: this.offset,
        },
      },
      {
        name: 'preventOverflow',
        enabled: this.args.autoPlacement,
        options: {
          boundary: this.args.viewportElement,
          padding: this.args.viewportPadding,
        },
      },
      {
        name: 'flip',
        enabled: this.args.autoPlacement,
      },
      {
        name: 'onChange',
        enabled: true,
        phase: 'afterWrite',
        fn: this.updatePlacement,
      },
    ];

    return options;
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
  updatePlacement(state) {
    // normalize argument
    state = state.state ?? state;

    if (this.actualPlacement === state.placement) {
      return;
    }
    this.actualPlacement = state.placement;
  }
}
