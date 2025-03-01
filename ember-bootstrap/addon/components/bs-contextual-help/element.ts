import { action } from '@ember/object';
import Component from '@glimmer/component';
import arg from 'ember-bootstrap/utils/decorators/arg';
import { tracked } from '@glimmer/tracking';
import { getOwnConfig, macroCondition } from '@embroider/macros';
import { trackedRef } from 'ember-ref-bucket';
import type { EmberBootstrapMacrosConfig } from '../../macros-config';
import type {
  Placement,
  Options as PopperOptions,
  Boundary,
  Padding,
  ModifierArguments,
  State,
} from '@popperjs/core';
import type { ArrowModifier } from '@popperjs/core/lib/modifiers/arrow';
import type { PreventOverflowModifier } from '@popperjs/core/lib/modifiers/preventOverflow';
import type { FlipModifier } from '@popperjs/core/lib/modifiers/flip';

export interface ContextualHelpElementSignature {
  Args: {
    autoPlacement?: boolean;
    placement?: Placement;
    viewportElement?: Boundary;
    viewportPadding?: Padding;
  };
}

/**
 Internal (abstract) component for contextual help markup. Should not be used directly.

 @class ContextualHelpElement
 @namespace Components
 @extends Glimmer.Component
 @private
 */
export default class ContextualHelpElement<
  Signature extends ContextualHelpElementSignature,
> extends Component<Signature> {
  /**
   * @property placement
   * @type string
   * @default 'top'
   * @public
   */
  @arg
  placement: Placement = 'top';

  @tracked
  actualPlacement?: Placement = this.args.placement;

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

  @trackedRef('popperElement') declare popperElement: HTMLElement;

  /**
   * popper.js modifier config
   *
   * @property popperModifiers
   * @type {object}
   * @private
   */
  get popperOptions() {
    const options: PopperOptions = {
      placement: this.placement,
      onFirstUpdate: this.updatePlacement,
      modifiers: [],
      strategy: 'absolute',
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
      } as ArrowModifier,
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
      } as PreventOverflowModifier,
      {
        name: 'flip',
        enabled: this.args.autoPlacement,
      } as FlipModifier,
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
    let ending: string | undefined = this.actualPlacement;

    if (macroCondition(getOwnConfig<EmberBootstrapMacrosConfig>().isBS5)) {
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
  updatePlacement(state: Partial<State> | ModifierArguments<object>) {
    // normalize argument
    const normalizedState: Partial<State> | ModifierArguments<object> =
      'state' in state ? state.state : state;

    if (this.actualPlacement === normalizedState.placement) {
      return;
    }
    this.actualPlacement = normalizedState.placement;
  }
}
