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
import {modifier} from "ember-modifier";

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

  // `actualPlacement` is initialized with `@placement` and updated by Popper
  // through the `updatePlacement` method which is bound to Popper's
  // `onFirstUpdate` hook.
  //
  // The options passed to Popper are autotracked. And Ember Popper Modifier
  // updates Popper with the new options whenever they change.
  //
  // `actualPlacement` is not updated when `@placement` changes and Popper's
  // `onFirstUpdate` hook does not run. It is unclear if that situation can
  // ever happen. But in case we get a bug report related to layout issues
  // when `@placement` argument changed after initial rendering, it may be
  // related.
  //
  // eslint-disable-next-line ember/no-tracked-properties-from-args
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

  declare popperElement: HTMLElement;

  getPopperElement = modifier((element: HTMLElement) => {
    this.popperElement = element;
  })

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
      // Popper's `onFirstUpdate` hook only runs when Popper positioned the element
      // the first time. But not when it updates that position later. This may lead
      // to `actualPlacement` property getting out of sync. It is unclear if this
      // leads to any actual bugs. But we should investigate it as a potential root
      // cause when we get a bug report related to placement of popovers or tooltips.
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
